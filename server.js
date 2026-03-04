import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import rateLimit from "express-rate-limit";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/v1/", globalLimiter);
app.use("/submit", globalLimiter);

const DISPOSABLE_DOMAINS = ["10minutemail.com", "guerrillamail.com", "temp-mail.org", "mailinator.com", "yopmail.com", "throwawaymail.com", "burnermail.io", "protonmail.com", "tempmail.com", "getnada.com"];

// ── POST /submit (Core Form Submission Engine) ────────────────────────
app.post("/submit", upload.any(), async (req, res) => {
  const { access_key, redirect, subject: customSubject, botcheck, ...formData } = req.body;

  if (!access_key) return res.status(400).json({ error: "access_key is required" });
  if (botcheck) {
    if (redirect) return res.redirect(redirect);
    return res.status(200).json({ success: true, message: "Form submitted successfully" });
  }

  // 1. Fetch Key & Project
  const { data: keyData, error: keyError } = await supabase
    .from("api_keys")
    .select("project_id, allowed_domains, projects(user_id, name, auto_responder, auto_responder_msg, target_emails, block_disposable, privacy_mode, custom_redirect)")
    .eq("key_hash", access_key)
    .maybeSingle();

  if (keyError || !keyData) return res.status(403).json({ error: "Invalid access key" });
  const project = keyData.projects; 

  // 2. Domain & Disposable Email Checks
  const origin = req.headers.origin;
  if (keyData.allowed_domains && keyData.allowed_domains.length > 0 && origin && !keyData.allowed_domains.includes(origin)) {
      return res.status(403).json({ error: "Domain not authorized for this key." });
  }

  if (project.block_disposable && formData.email) {
    const emailDomain = formData.email.split("@")[1]?.toLowerCase();
    if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
      return res.status(400).json({ error: "Disposable emails are not permitted." });
    }
  }

  // 3. TARGET EMAIL ROUTING (Bulletproof Logic)
  console.log("--- NEW SUBMISSION ---");
  
  let targetEmails = [];
  if (project.target_emails && project.target_emails.trim().length > 0) {
    targetEmails = project.target_emails.split(',').map(e => e.trim()).filter(Boolean);
    console.log("Routing to Custom Targets:", targetEmails);
  } else {
    // Attempt to get owner email from Supabase Admin API
    const { data: authData, error: authError } = await supabase.auth.admin.getUserById(project.user_id);
    if (authError) console.error("Supabase Admin Error (Check your SERVICE_ROLE_KEY!):", authError.message);
    
    if (authData?.user?.email) {
      targetEmails = [authData.user.email];
      console.log("Routing to Owner Email:", targetEmails);
    }
  }

  if (targetEmails.length === 0) {
    console.error("FATAL: No target emails found. Aborting.");
    return res.status(500).json({ error: "No valid routing address found." });
  }

  const finalRedirect = redirect || project.custom_redirect;
  const finalSubject = String(customSubject || `New Submission - ${project.name}`);
  console.log("DEBUG: Sending email with subject:", finalSubject);
  const replyToAddress = formData.email || targetEmails[0];
  const fromAddress = process.env.DEFAULT_FROM_EMAIL || "onboarding@resend.dev"; 

  // 4. Handle Attachments
  const attachments = [];
  if (req.files && req.files.length > 0) {
    formData.Attached_Files = req.files.map(f => f.originalname).join(', '); 
    for (const file of req.files) {
      attachments.push({ filename: file.originalname, content: file.buffer });
    }
  }

  // 5. Build HTML
  let emailHtml = `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #eaeaea; border-radius: 10px;"><h2>New Submission via ${project.name}</h2><table width="100%" cellpadding="0" cellspacing="0">`;
  for (const [key, value] of Object.entries(formData)) {
    const cleanKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/[-_]/g, ' ');
    emailHtml += `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;"><strong style="font-size: 12px; color: #666; text-transform: uppercase;">${cleanKey}</strong><br/><span style="font-size: 15px; color: #000;">${value}</span></td></tr>`;
  }
  emailHtml += `</table></div>`;

  try {
    // 6. SEND MAIN EMAIL
    console.log(`Sending main email to ${targetEmails}...`);
    const mainEmail = await resend.emails.send({
      from: fromAddress,
      to: targetEmails, 
      replyTo: replyToAddress,
      subject: finalSubject,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    
    // Check if Resend rejected it silently
    if (mainEmail.error) {
      console.error("RESEND REJECTED MAIN EMAIL:", mainEmail.error);
      throw new Error(mainEmail.error.message);
    } else {
      console.log("Main Email Sent Successfully!", mainEmail.data?.id);
    }

    // 7. Save to DB
    if (!project.privacy_mode) {
      await supabase.from("email_logs").insert([{
        project_id: keyData.project_id, recipient: targetEmails.join(', '), subject: finalSubject, message_id: mainEmail.data?.id, status: "sent", payload: formData, read: false
      }]);
    }

    // 8. Auto-Responder
    if (project.auto_responder && formData.email) {
      console.log(`Triggering Auto-Responder to ${formData.email}...`);
      await resend.emails.send({
        from: fromAddress, 
        to: [formData.email],
        subject: `Re: ${finalSubject}`,
        text: project.auto_responder_msg,
      }).then(res => {
         if(res.error) console.error("Auto-Responder Resend Error:", res.error.message);
      }).catch(err => console.error("Auto-responder failed:", err.message));
    }

    // 9. Webhooks
    const { data: webhooks } = await supabase.from("webhooks").select("url").eq("project_id", keyData.project_id);
    if (webhooks && webhooks.length > 0) {
      const webhookPayload = { project: project.name, subject: finalSubject, data: formData, has_attachments: attachments.length > 0, timestamp: new Date().toISOString() };
      for (const wh of webhooks) {
        fetch(wh.url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(webhookPayload) }).catch(()=>{});
      }
    }

    if (finalRedirect) return res.redirect(finalRedirect);
    return res.status(200).json({ success: true, message: "Form submitted successfully" });

  } catch (err) {
    console.error("OVERALL SUBMISSION ERROR:", err);
    if (!project.privacy_mode) {
      await supabase.from("email_logs").insert([{ project_id: keyData.project_id, recipient: targetEmails.join(', '), subject: finalSubject, status: "failed", payload: formData, read: false }]);
    }
    if (finalRedirect) return res.redirect(`${finalRedirect}?error=true`);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /v1/logs ─────────────────────────────────────────────────────────────
app.get("/v1/logs/:projectId", async (req, res) => {
  const { data, error } = await supabase.from("email_logs").select("*").eq("project_id", req.params.projectId).order("created_at", { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── UPDATE LOG READ STATUS ───────────────────────────────────────────────────
app.patch("/v1/logs/:id/read", async (req, res) => {
  const { error } = await supabase.from("email_logs").update({ read: true }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ── WEBHOOKS API ─────────────────────────────────────────────────────────────
app.get("/v1/webhooks/:projectId", async (req, res) => {
  const { data, error } = await supabase.from("webhooks").select("*").eq("project_id", req.params.projectId).order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/v1/webhooks", async (req, res) => {
  const { project_id, url } = req.body;
  const { data, error } = await supabase.from("webhooks").insert([{ project_id, url }]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete("/v1/webhooks/:id", async (req, res) => {
  const { error } = await supabase.from("webhooks").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ── EMAIL OTP VERIFICATION ROUTES ───────────────────────────────────────────
app.post("/v1/settings/send-otp", async (req, res) => {
  const { email, project_id } = req.body;
  if (!email || !project_id) return res.status(400).json({ error: "Missing fields" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires_at = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const { error } = await supabase.from('email_verifications').insert([{ project_id, email, otp, expires_at }]);
  if (error) return res.status(500).json({ error: error.message });

  try {
    await resend.emails.send({
      from: process.env.DEFAULT_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "FormFlow - Verify your email",
      html: `<div style="font-family: sans-serif; padding: 20px;"><h2>Verify your email for FormFlow</h2><p>Someone requested to add this email as a form submission recipient.</p><h1 style="letter-spacing: 4px; color: #4f46e5;">${otp}</h1><p>This code expires in 15 minutes.</p></div>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/v1/settings/verify-otp", async (req, res) => {
  const { email, project_id, otp } = req.body;
  const { data, error } = await supabase.from('email_verifications').select('*').eq('project_id', project_id).eq('email', email).eq('otp', otp).gte('expires_at', new Date().toISOString()).maybeSingle();

  if (error || !data) return res.status(400).json({ error: "Invalid or expired code." });

  await supabase.from('email_verifications').delete().eq('id', data.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log("🚀 FormFlow API ready on :3000"));