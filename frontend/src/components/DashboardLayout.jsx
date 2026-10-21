// src/components/DashboardLayout.jsx
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabase';
import { Logo, Icon, IC, Btn } from './UI';

export const NAV = [
  { id: 'overview',    label: 'Overview',    icon: IC.chart },
  { id: 'submissions', label: 'Inbox',       icon: IC.inbox },
  { id: 'apikeys',     label: 'Access Keys', icon: IC.key },
  { id: 'webhooks',    label: 'Webhooks',    icon: IC.webhook },
  { id: 'integration', label: 'Integration', icon: IC.code },
  { id: 'settings',    label: 'Settings',    icon: IC.cog },
];

export default function DashboardLayout({ 
  children, user, sidebarOpen, setSidebarOpen, page, setPage, 
  active, setActive, projects, setModal, logs, downloadCSV, loadLogs, ll,
  setReadLog // <--- ADDED THIS PROP
}) {
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  const unreadLogs = logs?.filter(log => !log.read) || [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <aside className={`${sidebarOpen ? 'w-60' : 'w-18'} shrink-0 flex flex-col bg-zinc-950 border-r border-zinc-800/80 transition-all duration-200 relative z-20`}>
        <div className="h-13 flex items-center px-4.5 border-b border-zinc-800/80 justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="w-5.5 h-5.5 rounded bg-zinc-100 flex items-center justify-center">
                <Icon d={IC.zap} cls="w-3.5 h-3.5 text-zinc-950" fill="currentColor" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-zinc-100">OrbitForm</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
              <Icon d={IC.zap} cls="w-4 h-4 text-zinc-200" fill="currentColor" />
            </div>
          )}
        </div>

        {sidebarOpen && (
          <div className="px-3.5 pt-3.5 pb-2.5 relative z-10 border-b border-zinc-900">
            <div className="relative group">
              <select 
                value={active?.id || ''} 
                onChange={e => setActive(projects.find(x => x.id === e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-200 appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-600 cursor-pointer pr-8 transition-all"
              >
                {!projects.length && <option disabled value="">No projects yet</option>}
                {projects.map(p => <option key={p.id} value={p.id} className="bg-zinc-900">{p.name}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <Icon d={IC.chevron} cls="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
            
            <button 
              onClick={() => setModal('newproject')} 
              className="mt-2 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-all"
            >
              <Icon d={IC.plus} cls="w-3.5 h-3.5" /> New workspace
            </button>
          </div>
        )}

        <nav className="flex-1 px-2.5 py-3.5 space-y-1.5 overflow-y-auto relative z-10">
          {NAV.map(n => (
            <button 
              key={n.id} 
              onClick={() => setPage(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                page === n.id 
                  ? 'bg-zinc-800/80 text-white font-semibold' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <div className={`flex items-center justify-center w-4 h-4 shrink-0 ${
                page === n.id ? 'text-zinc-100' : 'text-zinc-500'
              }`}>
                <Icon d={n.icon} cls="w-4 h-4" />
              </div>
              
              {sidebarOpen && <span className="text-[13px]">{n.label}</span>}
              
              {n.id === 'submissions' && sidebarOpen && unreadLogs.length > 0 && (
                 <span className="ml-auto bg-zinc-800 text-zinc-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
                   {unreadLogs.length}
                 </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2.5 border-t border-zinc-800/80 bg-zinc-950 relative z-10">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors group cursor-pointer">
              <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 shrink-0">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 truncate">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); supabase.auth.signOut(); }} 
                className="p-1 text-zinc-500 hover:text-white rounded transition-colors"
                title="Sign out"
              >
                <Icon d={IC.logout} cls="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => supabase.auth.signOut()} 
              className="w-full flex justify-center p-2 text-zinc-500 hover:text-white transition-colors rounded hover:bg-zinc-900"
              title="Sign out"
            >
              <Icon d={IC.logout} cls="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative z-10">
        <header className="h-13 border-b border-zinc-800/80 flex items-center justify-between px-5 shrink-0 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(o => !o)} 
              className="p-1.5 -ml-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sidebarOpen ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h10M4 18h16"} />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-semibold text-zinc-200 tracking-tight">
                {NAV.find(n => n.id === page)?.label}
              </h1>
              {active && (
                <>
                  <span className="text-zinc-600 text-xs">/</span>
                  <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {active.name}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {page === 'submissions' && (
              <>
                <button 
                  onClick={downloadCSV} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-colors"
                >
                  <Icon d={IC.download} cls="w-3.5 h-3.5" /> Export
                </button>
                <button 
                  onClick={loadLogs} 
                  className="p-2 rounded-lg text-zinc-400 bg-white/[0.03] border border-white/[0.05] hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <Icon d={IC.refresh} cls={`w-4.5 h-4.5 ${ll ? 'animate-spin text-white' : ''}`} />
                </button>
              </>
            )}
            {page === 'apikeys' && (
              <button 
                onClick={() => { if (!active) return alert('Create a project first'); setModal('newkey'); }} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <Icon d={IC.plus} cls="w-3.5 h-3.5" /> New Key
              </button>
            )}
            {page === 'webhooks' && (
              <button 
                onClick={() => { if (!active) return alert('Create a project first'); setModal('newwebhook'); }} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <Icon d={IC.plus} cls="w-3.5 h-3.5" /> Add Webhook
              </button>
            )}
            
            <div className="w-px h-5 bg-white/[0.08] mx-1" />
            
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className={`relative p-2 rounded-lg transition-colors group ${showNotifs ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'}`}
              >
                <Icon d={IC.bell} cls="w-5 h-5 group-hover:scale-110 transition-transform" />
                {unreadLogs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] border-2 border-[#050505]" />
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-3 w-80 bg-[#121214] border border-white/[0.08] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[5000] overflow-hidden transform origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/[0.05] flex justify-between items-center bg-[#18181b]">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <span className="text-[10px] font-medium bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full ring-1 ring-indigo-500/30">
                      {unreadLogs.length} new
                    </span>
                  </div>
                  
                  <div className="max-h-[320px] overflow-y-auto">
                    {unreadLogs.length === 0 ? (
                      <div className="p-8 flex flex-col items-center justify-center text-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center mb-1 text-zinc-600">
                          <Icon d={IC.bell} cls="w-4 h-4" />
                        </div>
                        <p className="text-sm font-medium text-zinc-300">All caught up</p>
                        <p className="text-xs text-zinc-500">No unread notifications</p>
                      </div>
                    ) : (
                      unreadLogs.slice(0, 5).map((log, i) => (
                        <div 
                          key={log.id || i} 
                          // --- UPDATED CLICK HANDLER: Changes page AND opens specific log ---
                          onClick={() => { 
                            setPage('submissions'); 
                            if(setReadLog) setReadLog(log); 
                            setShowNotifs(false); 
                          }}
                          className="p-4 border-b border-white/[0.03] hover:bg-white/[0.04] transition-colors cursor-pointer group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                            <Icon d={IC.inbox} cls="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-zinc-200 group-hover:text-white transition-colors">
                              {log.subject || "New Submission"}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5 truncate">
                              {log.payload?.email || log.payload?.Email || 'A new entry was received.'}
                            </p>
                            <p className="text-[10px] text-indigo-400 mt-1.5 font-medium tracking-wide">
                              {log.created_at ? new Date(log.created_at).toLocaleString() : 'Just now'}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {unreadLogs.length > 5 && (
                    <div 
                      className="p-3 text-center text-xs font-medium text-zinc-400 hover:text-white bg-[#18181b] hover:bg-white/[0.03] cursor-pointer border-t border-white/[0.05] transition-colors"
                      onClick={() => { setPage('submissions'); setShowNotifs(false); }}
                    >
                      View all unread
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-6 relative z-10">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}