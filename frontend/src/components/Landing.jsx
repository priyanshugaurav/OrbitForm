// src/components/Landing.jsx
import { useState } from "react";
import { supabase } from "../supabase";
import { Noise, Logo, Btn, Icon, IC } from "./UI";

export default function Landing({ API }) {
  const [view, setView] = useState("home"); // "home" | "docs"

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  // ── ROUTING LOGIC ────────────────────────────────────────────────────────
  if (view === "docs") {
    return <PublicDocs API={API} goBack={() => setView("home")} onLogin={handleLogin} />;
  }

  // ── MAIN LANDING PAGE ────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-black text-zinc-300 font-sans overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      <Noise />
      {/* Subtler, more refined background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />

      {/* MODERN GLASS NAVBAR */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-12 bg-indigo-500/15 blur-[40px] rounded-full pointer-events-none" />

        <nav className="pointer-events-auto relative w-full max-w-5xl bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full px-6 h-14 flex items-center justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <Logo />
          <div className="flex items-center gap-5 md:gap-7 relative z-10">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block">
              Pricing
            </a>
            <button onClick={() => setView("docs")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block">
              Documentation
            </button>

            <div className="w-px h-4 bg-white/10 hidden md:block" />

            <button onClick={handleLogin} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Log in
            </button>
            <button
              onClick={handleLogin}
              className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6 text-center relative z-10 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-purple-500/20 rounded-full blur-[60px] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-40 right-[15%] w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-20 left-[20%] w-40 h-40 bg-pink-500/15 rounded-full blur-[70px] animate-[pulse_5s_ease-in-out_infinite_2s]" />

          {/* SOCIAL PROOF PILL */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=18181b`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-medium text-zinc-400">
              Joined by <span className="text-white">150+ developers</span> this week
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1] max-w-4xl mx-auto relative z-10">
            HTML forms that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              actually deliver.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            Drop a single URL into your form's action attribute. We handle email delivery, spam protection, webhooks, and analytics — zero backend required. <span className="text-white font-semibold">Unlimited emails, even on the free tier.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 relative z-10">
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-all text-sm group"
            >
              Start building free <Icon d={IC.arrow} cls="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView("docs")}
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 transition-all text-sm font-medium"
            >
              <Icon d={IC.code} cls="w-4 h-4 text-zinc-500" /> View documentation
            </button>
          </div>

          {/* Minimal Social Proof */}
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <p className="text-xs font-medium text-zinc-600 tracking-widest uppercase mb-8">
              Loved by developers and indie builders
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-70">
              <span className="text-sm font-bold tracking-tight text-white">160+ Active Users</span>
              <span className="text-sm font-bold tracking-tight text-white">Unlimited Emails</span>
              <span className="text-sm font-bold tracking-tight text-white">Zero Backend Required</span>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="relative py-32 px-6 border-t border-white/[0.05] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.2),transparent_50%)]" />
          </div>

          <div className="relative max-w-5xl mx-auto z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-medium mb-6">
                <Icon d={IC.sparkles} cls="w-3.5 h-3.5" /> Powerful Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Everything you need.<br />Nothing you don't.
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                We've abstracted away the backend so you can focus on building your frontend with zero friction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: IC.mail, title: "Instant Delivery", desc: "Submissions land in your inbox seconds after they happen.", glow: "from-blue-500/20 to-cyan-500/20", iconColor: "text-cyan-400" },
                { icon: IC.shield, title: "Spam Protection", desc: "Invisible honeypots and smart filtering stop bots instantly.", glow: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400" },
                { icon: IC.webhook, title: "Webhooks", desc: "Connect Zapier, Make, Slack, or any custom endpoint.", glow: "from-indigo-500/20 to-purple-500/20", iconColor: "text-indigo-400" },
                { icon: IC.chart, title: "Analytics", desc: "Track submission volume and failure trends seamlessly.", glow: "from-orange-500/20 to-red-500/20", iconColor: "text-orange-400" },
                { icon: IC.download, title: "CSV Export", desc: "Download submissions as a spreadsheet for easy import.", glow: "from-pink-500/20 to-rose-500/20", iconColor: "text-pink-400" },
                { icon: IC.code, title: "Zero Backend", desc: "Works with any static site. No server-side code required.", glow: "from-zinc-500/20 to-zinc-400/20", iconColor: "text-zinc-300" },
              ].map((f) => (
                <div key={f.title} className="group relative p-8 rounded-2xl bg-[#0c0c0e]/80 backdrop-blur-sm border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-black">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.glow} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500">
                      <Icon d={f.icon} cls={`w-5 h-5 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="relative py-32 px-6 border-t border-white/[0.05] overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.01]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Simple, transparent pricing</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">Start for free, upgrade when you need more scale and power.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {[
                { name: "Hobby", price: "$0", sub: "Forever", features: ["Unlimited submissions", "Unlimited workspaces & forms", "Standard Email delivery", "Honeypot Spam Protection", "CSV export"], cta: "Get started", primary: false },
                { name: "Pro", price: "$9", sub: "Per month", features: ["Everything in Hobby, plus:", "File Uploads (Attachments)", "Webhook Integrations", "Auto-Responder Emails", "Domain Restriction (CORS)", "Multiple Recipients (CC)"], cta: "Start free trial", primary: true },
                { name: "Business", price: "$29", sub: "Per month", features: ["Everything in Pro, plus:", "GDPR Strict Privacy Mode", "Block Disposable Emails", "Global Custom Redirects", "Team Members", "Priority Support"], cta: "Contact sales", primary: false },
              ].map((plan) => (
                <div key={plan.name} className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 ${plan.primary ? "bg-gradient-to-b from-indigo-500/10 to-[#0c0c0e] border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)] md:-translate-y-4" : "bg-[#0c0c0e]/50 border border-white/[0.05] hover:border-white/[0.1]"}`}>
                  {plan.primary && <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />}
                  {plan.primary && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}

                  <p className={`text-sm font-medium mb-4 ${plan.primary ? "text-indigo-300" : "text-zinc-400"}`}>{plan.name}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                  </div>
                  <span className="text-sm text-zinc-500 mb-8 block">{plan.sub}</span>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${f.includes("Everything in") ? "text-indigo-300 font-medium mb-2" : "text-zinc-300"}`}>
                        {!f.includes("Everything in") && (
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${plan.primary ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-zinc-500"}`}>
                            <Icon d={IC.check} cls="w-3 h-3" />
                          </div>
                        )}
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button onClick={handleLogin} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${plan.primary ? "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-white/[0.03] text-white hover:bg-white/[0.08] border border-white/[0.05]"}`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & FOOTER */}
        <section id="faq" className="relative py-32 px-6 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-zinc-500">Everything you need to know about the product and billing.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "Do I need a backend server?", a: "No. OrbitForm acts as your backend. Just point your standard HTML form action to our URL and we handle the rest." },
                { q: "How does spam protection work?", a: "We use a combination of hidden honeypot fields, IP reputation checks, and proprietary filtering to ensure only real humans reach your inbox." },
                { q: "Can I connect this to my own database?", a: "Yes. On our Pro and Business plans, you can use Webhooks to pipe submission data directly into Supabase, Firebase, or your custom endpoints." },
              ].map((faq, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-[#0c0c0e]/50 border border-white/[0.05] hover:bg-[#121214] hover:border-white/[0.1] transition-all duration-300 cursor-default">
                  <h3 className="text-lg font-medium text-zinc-200 mb-3 group-hover:text-indigo-300 transition-colors flex justify-between items-center">
                    {faq.q}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed pr-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative border-t border-white/[0.05] bg-[#050505] pt-20 pb-10 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
              <div className="col-span-2">
                <Logo />
                <p className="text-zinc-500 text-sm mt-6 max-w-xs leading-relaxed">
                  The absolute easiest way to handle HTML forms for static sites. Built for modern development teams.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm">Product</h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                  <li><button onClick={() => setView("docs")} className="hover:text-indigo-400 transition-colors">Documentation</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm">Company</h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-10">
              <div className="flex items-center gap-2 text-zinc-600 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </div>
              <p className="text-sm text-zinc-600">© 2026 OrbitForm. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ── PUBLIC DOCUMENTATION PAGE ─────────────────────────────────────────────

const PublicDocs = ({ API, goBack, onLogin }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tabs = [
    { id: "basic", label: "Basic Setup", icon: IC.code },
    { id: "files", label: "File Uploads", icon: IC.docs },
    { id: "security", label: "Spam & Security", icon: IC.warn },
    { id: "webhooks", label: "Webhooks", icon: IC.webhook },
    { id: "autoresponder", label: "Auto-Responder", icon: IC.sparkles },
  ];

  const snippets = {
    basic: `<form action="${API}/submit" method="POST">\n  \n  <input type="hidden" name="access_key" value="YOUR_KEY_HERE" />\n\n  \n  <input type="text" name="name" required />\n  <input type="email" name="email" required />\n  <textarea name="message" required></textarea>\n\n  <button type="submit">Submit</button>\n</form>`,
    files: `<form action="${API}/submit" method="POST" enctype="multipart/form-data">\n  <input type="hidden" name="access_key" value="YOUR_KEY_HERE" />\n\n  <input type="email" name="email" required />\n  \n  \n  <input type="file" name="attachment" accept="image/*, .pdf" />\n\n  <button type="submit">Submit</button>\n</form>`,
    security: `<form action="${API}/submit" method="POST">\n  <input type="hidden" name="access_key" value="YOUR_KEY_HERE" />\n\n  \n  \n  <input type="checkbox" name="botcheck" style="display: none;" />\n\n  <input type="email" name="email" required />\n  <button type="submit">Submit</button>\n</form>`,
    react: `// Example using React / Next.js\nconst handleSubmit = async (e) => {\n  e.preventDefault();\n  const formData = new FormData(e.target);\n  \n  const response = await fetch("${API}/submit", {\n    method: "POST",\n    body: formData,\n    // NOTE: Do not set 'Content-Type' manually when using FormData!\n    // The browser will automatically set 'multipart/form-data' with the correct boundary.\n  });\n\n  const result = await response.json();\n  if(result.success) alert("Sent!");\n};`
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Docs Navbar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <button onClick={goBack} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            ← Back to Home
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <div className="font-bold tracking-tight text-white hidden sm:block">OrbitForm Docs</div>
        </div>
        <button onClick={onLogin} className="text-xs font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-zinc-200 transition-all">
          Get your API Key
        </button>
      </div>

      {/* Docs Content wrapper */}
      <div className="max-w-6xl mx-auto pt-28 pb-20 px-6 flex flex-col md:flex-row gap-10">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1.5 md:sticky md:top-28 self-start">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-4">Integration Guide</h3>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === t.id 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <Icon d={t.icon} cls="w-4 h-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {activeTab === "basic" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Basic HTML Form</h2>
                <p className="text-base text-zinc-400 leading-relaxed">
                  To start receiving submissions, add the <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">action</code> attribute to your form pointing to our API, and include your Access Key as a hidden input.
                </p>
              </div>
              <CodeBlock snippet={snippets.basic} copiedId={copiedId} handleCopy={handleCopy} id="basic" />
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex gap-4 mt-8">
                <Icon d={IC.check} cls="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  <strong className="text-emerald-300 block mb-1">Redirection</strong>
                  By default, OrbitForm returns JSON. To redirect users to a "Thank You" page instead, add another hidden input inside your form:<br/>
                  <code className="text-emerald-300 mt-2 block bg-emerald-500/20 p-2 rounded text-xs">&lt;input type="hidden" name="redirect" value="https://yoursite.com/thanks" /&gt;</code>
                </p>
              </div>
            </div>
          )}

          {activeTab === "files" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">File Attachments</h2>
                <p className="text-base text-zinc-400 leading-relaxed">
                  OrbitForm natively supports file uploads up to 5MB. Files are temporarily stored securely and forwarded directly as attachments to your email inbox.
                </p>
              </div>
              
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-5 flex gap-4">
                <Icon d={IC.warn} cls="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-100/80">
                  <strong className="text-rose-300 block mb-1">Crucial Step:</strong> You MUST add <code className="bg-rose-500/20 px-1.5 rounded text-rose-300">enctype="multipart/form-data"</code> to your <code className="bg-rose-500/20 px-1 rounded text-rose-300">&lt;form&gt;</code> tag, otherwise the browser will refuse to send the files!
                </p>
              </div>

              <CodeBlock snippet={snippets.files} copiedId={copiedId} handleCopy={handleCopy} id="files" />
              
              <h4 className="text-lg font-bold text-zinc-200 mt-10 mb-4 border-t border-zinc-800/50 pt-8">Using React / Fetch API</h4>
              <CodeBlock snippet={snippets.react} copiedId={copiedId} handleCopy={handleCopy} id="react" />
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-fade-in space-y-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Spam & Security</h2>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Keep your inbox clean. We offer two layers of protection to ensure you only get real messages from real websites.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-zinc-200 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400">1</span> 
                  The Honeypot (Bot Trapping)
                </h4>
                <p className="text-base text-zinc-400 leading-relaxed ml-11">
                  Add a hidden checkbox named <code>botcheck</code>. Real users won't see it, but automated spam bots scrape the HTML and check every box. If our API sees this box is checked, we silently reject the submission without notifying the bot.
                </p>
                <div className="ml-11 mt-4">
                  <CodeBlock snippet={snippets.security} copiedId={copiedId} handleCopy={handleCopy} id="security" />
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-zinc-800/50">
                <h4 className="text-xl font-semibold text-zinc-200 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400">2</span> 
                  Domain Restriction (CORS)
                </h4>
                <p className="text-base text-zinc-400 leading-relaxed ml-11">
                  Prevent malicious actors from stealing your Access Key and submitting forms from other websites. 
                  When you generate an Access Key in your dashboard, fill out the "Allowed Domains" field (e.g., <code>https://myportfolio.com</code>). Submissions from any other origin will be blocked automatically at the server level.
                </p>
              </div>
            </div>
          )}

          {activeTab === "webhooks" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Webhooks</h2>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Want to send form data to Slack, Discord, Google Sheets, or your own database? Set up a Webhook in your dashboard and we will instantly POST your data there on every submission.
                </p>
              </div>
              
              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-zinc-800/80 mt-8">
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Example JSON Payload</p>
                <pre className="text-[14px] font-mono text-zinc-300 overflow-x-auto leading-loose">
{`{
  "project": "My Portfolio",
  "subject": "New Form Submission",
  "timestamp": "2026-03-04T12:00:00.000Z",
  "has_attachments": false,
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello world!"
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "autoresponder" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Auto-Responders</h2>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Provide a better experience for your users by instantly sending them a confirmation email the second they submit your form.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mt-6">
                <ol className="list-decimal list-inside space-y-4 text-base text-zinc-300 ml-2">
                  <li>Ensure your HTML form has an input field with the exact attribute <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">name="email"</code>.</li>
                  <li>Log in and navigate to the <strong>Settings tab</strong> in your dashboard.</li>
                  <li>Toggle the <strong>Auto-Responder</strong> switch to On.</li>
                  <li>Write your custom branded response message and hit Save.</li>
                </ol>
              </div>
              <p className="text-sm text-zinc-500 italic mt-4">Note: If the user leaves the email field blank, or provides an invalid email format, the auto-responder will quietly fail without interrupting your main email delivery.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Internal Sub-component for syntax highlighting in the PublicDocs
const CodeBlock = ({ snippet, copiedId, handleCopy, id }) => (
  <div className="bg-[#050505] border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl mt-6">
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-[#0a0a0a]">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
      </div>
      <button
        onClick={() => handleCopy(snippet, id)}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        {copiedId === id ? <span className="text-emerald-400">Copied!</span> : "Copy Code"}
      </button>
    </div>
    <div className="p-6 overflow-x-auto">
      <pre className="text-[14px] font-mono leading-relaxed text-zinc-300">
        {snippet.split('\n').map((line, i) => {
          let highlighted = line
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/("[^"]*")/g, '<span class="text-emerald-300">$1</span>')
            .replace(/\b(form|input|button|textarea)\b/g, '<span class="text-pink-400">$1</span>')
            .replace(/\b(action|method|type|name|value|required|accept|style|enctype)\b/g, '<span class="text-indigo-300">$1</span>')
            .replace(/&lt;!--(.*?)--&gt;/g, '<span class="text-zinc-500 italic">&lt;!--$1--&gt;</span>')
            .replace(/\b(const|let|var|await|async|function)\b/g, '<span class="text-purple-400">$1</span>')
            .replace(/\b(fetch|alert|console)\b/g, '<span class="text-blue-400">$1</span>');
          return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
        })}
      </pre>
    </div>
  </div>
);