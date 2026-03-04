// src/components/Landing.jsx
import { supabase } from "../supabase";
import { Noise, Logo, Btn, Icon, IC } from "./UI";

export default function Landing({ API }) {
  return (
    <div className="relative min-h-screen bg-black text-zinc-300 font-sans overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      <Noise />
      {/* Subtler, more refined background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />

      {/* MODERN GLASS NAVBAR */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        {/* Ambient glow behind the nav to make the glass blur visible */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-12 bg-indigo-500/15 blur-[40px] rounded-full pointer-events-none" />

        <nav className="pointer-events-auto relative w-full max-w-5xl bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full px-6 h-14 flex items-center justify-between overflow-hidden">
          {/* Subtle inner top highlight to give 3D depth */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <Logo />
          <div className="flex items-center gap-5 md:gap-7 relative z-10">
            <a
              href="#features"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden md:block"
            >
              FAQ
            </a>

            <div className="w-px h-4 bg-white/10 hidden md:block" />

            <button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: window.location.origin },
                })
              }
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: window.location.origin },
                })
              }
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
          {/* FLOATING COLORED ELEMENTS ADDED HERE */}
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-purple-500/20 rounded-full blur-[60px] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-40 right-[15%] w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-20 left-[20%] w-40 h-40 bg-pink-500/15 rounded-full blur-[70px] animate-[pulse_5s_ease-in-out_infinite_2s]" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300 font-medium mb-8 hover:bg-white/10 transition-colors cursor-pointer relative z-10">
            <Icon d={IC.sparkles} cls="w-3.5 h-3.5 text-zinc-400" /> Webhook
            support is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1] max-w-4xl mx-auto relative z-10">
            HTML forms that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              actually deliver.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            Drop a single URL into your form's action attribute. We handle email
            delivery, spam protection, webhooks, and analytics — zero backend
            required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 relative z-10">
            <button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: window.location.origin },
                })
              }
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-all text-sm group"
            >
              Start building free{" "}
              <Icon
                d={IC.arrow}
                cls="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </button>
            <a
              href="#demo"
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 transition-all text-sm font-medium"
            >
              <Icon d={IC.code} cls="w-4 h-4 text-zinc-500" /> View
              documentation
            </a>
          </div>

          {/* Minimal Social Proof */}
          <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
            <p className="text-xs font-medium text-zinc-600 tracking-widest uppercase mb-8">
              Trusted by modern teams
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-500">
              <span className="text-lg font-bold tracking-tight text-white">
                Acme Corp
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Globex
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Soylent
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Initech
              </span>
            </div>
          </div>

          {/* INTERACTIVE SHOWCASE DEMO */}
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="relative py-32 px-6 border-t border-white/[0.05] overflow-hidden"
        >
          {/* Background Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.2),transparent_50%)]" />
          </div>

          <div className="relative max-w-5xl mx-auto z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-medium mb-6">
                <Icon d={IC.sparkles} cls="w-3.5 h-3.5" /> Powerful Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Everything you need.
                <br />
                Nothing you don't.
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                We've abstracted away the backend so you can focus on building
                your frontend with zero friction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: IC.mail,
                  title: "Instant Delivery",
                  desc: "Submissions land in your inbox seconds after they happen.",
                  glow: "from-blue-500/20 to-cyan-500/20",
                  iconColor: "text-cyan-400",
                },
                {
                  icon: IC.shield,
                  title: "Spam Protection",
                  desc: "Invisible honeypots and smart filtering stop bots instantly.",
                  glow: "from-emerald-500/20 to-teal-500/20",
                  iconColor: "text-emerald-400",
                },
                {
                  icon: IC.webhook,
                  title: "Webhooks",
                  desc: "Connect Zapier, Make, Slack, or any custom endpoint.",
                  glow: "from-indigo-500/20 to-purple-500/20",
                  iconColor: "text-indigo-400",
                },
                {
                  icon: IC.chart,
                  title: "Analytics",
                  desc: "Track submission volume and failure trends seamlessly.",
                  glow: "from-orange-500/20 to-red-500/20",
                  iconColor: "text-orange-400",
                },
                {
                  icon: IC.download,
                  title: "CSV Export",
                  desc: "Download submissions as a spreadsheet for easy import.",
                  glow: "from-pink-500/20 to-rose-500/20",
                  iconColor: "text-pink-400",
                },
                {
                  icon: IC.code,
                  title: "Zero Backend",
                  desc: "Works with any static site. No server-side code required.",
                  glow: "from-zinc-500/20 to-zinc-400/20",
                  iconColor: "text-zinc-300",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group relative p-8 rounded-2xl bg-[#0c0c0e]/80 backdrop-blur-sm border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-black"
                >
                  {/* Hover Spotlight Element */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.glow} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2`}
                  />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500">
                      <Icon d={f.icon} cls={`w-5 h-5 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section
          id="pricing"
          className="relative py-32 px-6 border-t border-white/[0.05] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/[0.01]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Simple, transparent pricing
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                Start for free, upgrade when you need more scale and power.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {[
                {
                  name: "Hobby",
                  price: "$0",
                  sub: "Forever",
                  features: [
                    "100 submissions/mo",
                    "1 workspace",
                    "Email delivery",
                    "CSV export",
                  ],
                  cta: "Get started",
                  primary: false,
                },
                {
                  name: "Pro",
                  price: "$9",
                  sub: "Per month",
                  features: [
                    "2,000 submissions/mo",
                    "5 workspaces",
                    "Webhook integrations",
                    "Priority delivery",
                    "Custom templates",
                  ],
                  cta: "Start free trial",
                  primary: true,
                },
                {
                  name: "Business",
                  price: "$29",
                  sub: "Per month",
                  features: [
                    "Unlimited submissions",
                    "Unlimited workspaces",
                    "API access",
                    "Team members",
                    "Priority support",
                  ],
                  cta: "Contact sales",
                  primary: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 ${plan.primary ? "bg-gradient-to-b from-indigo-500/10 to-[#0c0c0e] border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)] md:-translate-y-4" : "bg-[#0c0c0e]/50 border border-white/[0.05] hover:border-white/[0.1]"}`}
                >
                  {/* Pro Plan Top Highlight Line */}
                  {plan.primary && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
                  )}
                  {plan.primary && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}

                  <p
                    className={`text-sm font-medium mb-4 ${plan.primary ? "text-indigo-300" : "text-zinc-400"}`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 mb-8 block">
                    {plan.sub}
                  </span>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-zinc-300"
                      >
                        <div
                          className={`mt-0.5 rounded-full p-0.5 ${plan.primary ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-zinc-500"}`}
                        >
                          <Icon d={IC.check} cls="w-3 h-3" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: { redirectTo: window.location.origin },
                      })
                    }
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${plan.primary ? "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-white/[0.03] text-white hover:bg-white/[0.08] border border-white/[0.05]"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section
          id="faq"
          className="relative py-32 px-6 border-t border-white/[0.05]"
        >
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-zinc-500">
                Everything you need to know about the product and billing.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need a backend server?",
                  a: "No. FormFlow acts as your backend. Just point your standard HTML form action to our URL and we handle the rest.",
                },
                {
                  q: "How does spam protection work?",
                  a: "We use a combination of hidden honeypot fields, IP reputation checks, and proprietary filtering to ensure only real humans reach your inbox.",
                },
                {
                  q: "Can I connect this to my own database?",
                  a: "Yes. On our Pro and Business plans, you can use Webhooks to pipe submission data directly into Supabase, Firebase, or your custom endpoints.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-[#0c0c0e]/50 border border-white/[0.05] hover:bg-[#121214] hover:border-white/[0.1] transition-all duration-300 cursor-default"
                >
                  <h3 className="text-lg font-medium text-zinc-200 mb-3 group-hover:text-indigo-300 transition-colors flex justify-between items-center">
                    {faq.q}
                    <Icon
                      d={IC.arrow}
                      cls="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all rotate-45"
                    />
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative border-t border-white/[0.05] bg-[#050505] pt-20 pb-10 px-6 overflow-hidden">
          {/* Subtle Top Edge Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
              <div className="col-span-2">
                <Logo />
                <p className="text-zinc-500 text-sm mt-6 max-w-xs leading-relaxed">
                  The absolute easiest way to handle HTML forms for static
                  sites. Built for modern development teams.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm">
                  Product
                </h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm">
                  Company
                </h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm">Legal</h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-10">
              {/* "All systems operational" status indicator */}
              <div className="flex items-center gap-2 text-zinc-600 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All systems operational
              </div>

              <p className="text-sm text-zinc-600">
                © 2026 FormFlow. All rights reserved.
              </p>

              <div className="flex gap-4">
                {/* Modern Pill Social Buttons */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
