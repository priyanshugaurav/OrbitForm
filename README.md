# OrbitForm 🪐

**OrbitForm** is a powerful, seamless backend for your HTML forms. Inspired by Web3Forms, it allows developers to receive form submissions directly in their inbox **without writing any backend code**, while offering advanced security, routing, and automation features.

🌐 **Live Demo:** https://orbitform.space

---

# ✨ Features

OrbitForm includes everything you love about form backends, plus advanced tools for privacy and automation.

### 🚀 No Backend Required
Simply add your unique **access key** to any HTML `<form>` and start receiving submissions instantly.

### 🗂 Workspaces & Projects
Organize multiple forms and projects from a single dashboard.

### 📩 Advanced Routing & Delivery
Route submissions to specific verified email addresses.

### 🔒 Security & Privacy Controls

**Block Disposable Emails**  
Automatically reject submissions from temporary email providers (e.g., 10minutemail) to reduce spam.

**Strict Privacy Mode (GDPR)**  
Forward emails without storing user data in the OrbitForm dashboard.

### 🔁 Global Redirect URLs
Redirect users to a custom **Thank You** or success page after submission.

### 🤖 Auto Responder
Send automatic branded confirmation emails instantly after a user submits a form.

### 🔗 Webhooks & Integrations
Connect your forms with:

- Zapier
- Discord
- Slack
- Custom APIs

Receive real-time structured JSON payloads.

---

# 🚀 Quick Start

Getting started takes less than **1 minute**.

No libraries. No server setup.

---

## 1️⃣ Generate an Access Key

1. Sign up at **https://orbitform.space**
2. Create a **Workspace**
3. Go to the **Access Keys** tab
4. Generate your unique key

---

## 2️⃣ Add to Your HTML Form

Add your key to a hidden input field.

```html
<form action="https://api.orbitform.space/submit" method="POST">

  <input type="hidden" name="access_key" value="YOUR_KEY_HERE">

  <label for="name">Name</label>
  <input type="text" name="name" required>

  <label for="email">Email</label>
  <input type="email" name="email" required>

  <label for="message">Message</label>
  <textarea name="message" required></textarea>

  <button type="submit">Submit Form</button>

</form>
```

---

## 3️⃣ Start Receiving Submissions

That's it 🎉

Submissions will now be delivered to:

- Your **Email Inbox**
- **OrbitForm Dashboard**
- **Webhooks / Integrations**

depending on your project settings.

---

# ⚙️ Webhook Payload Format

OrbitForm sends structured JSON data to your webhook endpoints.

```json
{
  "project": "My Portfolio",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'd like to work with you!"
  },
  "timestamp": "2026-03-09T10:00:00Z"
}
```

---

# 🛠 Built For

### 🌐 Portfolio Websites
Add a contact form to static websites without backend code.

### 📈 Landing Pages
Collect leads and automate responses.

### ⚡ Jamstack Apps
Works perfectly with:

- React
- Next.js
- Vue
- Static HTML

---

# 🔐 Security First

OrbitForm includes built-in protections:

- Disposable email blocking
- Access key authentication
- Secure API routing
- Privacy-first data handling

---

# 📌 Example Use Cases

• Developer portfolios  
• SaaS landing pages  
• Startup waitlists  
• Newsletter signups  
• Customer feedback forms  

---

# 💡 Why OrbitForm?

OrbitForm simplifies form handling so developers can focus on building great products.

No backend. No hassle.

Just forms that work.

---

# 📬 Support

If you need help or want to suggest a feature:

- Visit: https://orbitform.space
- Open an Issue on GitHub

---

# ⭐ Show Your Support

If you like **OrbitForm**, consider giving the repository a ⭐ on GitHub!
