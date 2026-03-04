// src/components/UI.jsx
import { useState } from 'react';

export const Icon = ({ d, cls = "w-4 h-4", fill = "none" }) => (
  <svg className={cls} fill={fill} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
  </svg>
);

export const IC = {
  copy:     "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check:    "M5 13l4 4L19 7",
  inbox:    "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
  key:      "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
  plus:     "M12 4v16m8-8H4",
  trash:    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  cog:      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  warn:     "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  zap:      "M13 10V3L4 14h7v7l9-11h-7z",
  arrow:    "M14 5l7 7m0 0l-7 7m7-7H3",
  download: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  x:        "M6 18L18 6M6 6l12 12",
  mail:     "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  webhook:  "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  chart:    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  docs:     "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  refresh:  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  shield:   "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  eye:      "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  globe:    "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  code:     "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  filter:   "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  bell:     "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  logout:   "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  chevron:  "M9 5l7 7-7 7",
  sparkles: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
};

export const Noise = () => (
  <div 
    className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-screen"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

export const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 rounded-[10px]  flex items-center justify-center">
      <Icon d={IC.zap} cls="w-3.5 h-3.5 text-white" fill="currentColor" />
    </div>
    <span className="text-sm font-bold tracking-wide text-zinc-100">OrbitForm</span>
  </div>
);

export const Badge = ({ status }) => {
  const map = {
    sent:   'text-emerald-400 bg-emerald-400/10 ring-emerald-400/20',
    failed: 'text-rose-400 bg-rose-400/10 ring-rose-400/20',
    pending:'text-amber-400 bg-amber-400/10 ring-amber-400/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-widest ring-1 ring-inset ${map[status] || map.pending}`}>
      <span className="w-1 h-1 rounded-full bg-current shadow-[0_0_8px_currentColor]" />{status}
    </span>
  );
};

export const CopyBtn = ({ text, small }) => {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      className={`shrink-0 rounded-lg ring-1 ring-inset ring-zinc-700/50 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200 ${small ? 'p-1.5' : 'p-2'}`}>
      <Icon d={ok ? IC.check : IC.copy} cls={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
    </button>
  );
};

export const Inp = ({ label, help, textarea, ...p }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-semibold tracking-wide text-zinc-300">{label}</label>}
    {textarea
      ? <textarea className="w-full bg-zinc-900/50 ring-1 ring-inset ring-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-zinc-900 transition-all font-mono resize-none shadow-sm" {...p} />
      : <input className="w-full bg-zinc-900/50 ring-1 ring-inset ring-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-zinc-900 transition-all shadow-sm" {...p} />
    }
    {help && <p className="text-xs text-zinc-500">{help}</p>}
  </div>
);

export const Btn = ({ children, variant = 'primary', cls = '', ...p }) => {
  const v = {
    primary: 'bg-zinc-100 text-zinc-950 hover:bg-white shadow-sm ring-1 ring-inset ring-zinc-200/50',
    brand: 'bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)] ring-1 ring-inset ring-violet-500',
    secondary: 'bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 ring-1 ring-inset ring-zinc-800 shadow-sm',
    danger: 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 ring-1 ring-inset ring-rose-500/20',
    ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50',
  };
  return <button className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${v[variant]} ${cls}`} {...p}>{children}</button>;
};

// Helper component for the new StatCard (assuming it wasn't provided or needs update)
export const StatCard = ({ label, value, sub, icon, color }) => (
  <div className={`relative p-5 rounded-2xl bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.05] overflow-hidden group hover:border-white/[0.1] transition-colors`}>
    {/* Subtle background gradient based on color prop */}
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} blur-[50px] opacity-40 group-hover:opacity-80 transition-opacity`} />
    
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#121214] border ${color.split(' ').slice(-1)[0]}`}>
          <Icon d={icon} cls={`w-4 h-4 ${color.split(' ').slice(-2)[0]}`} />
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-white tracking-tight">{value}</h4>
        <p className="text-xs text-zinc-500 mt-1 font-medium">{sub}</p>
      </div>
    </div>
  </div>
);


export const EmptyState = ({ icon, title, desc, action }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
    <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 ring-1 ring-inset ring-zinc-700 flex items-center justify-center mb-4 shadow-sm">
      <Icon d={icon} cls="w-5 h-5 text-zinc-400" />
    </div>
    <p className="text-sm font-semibold text-zinc-200 mb-1">{title}</p>
    <p className="text-xs text-zinc-500 max-w-[260px] leading-relaxed mb-5">{desc}</p>
    {action}
  </div>
);