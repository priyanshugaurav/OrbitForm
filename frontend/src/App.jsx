// src/App.jsx
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

import { Noise, Logo } from './components/UI';
import Landing from './components/Landing';
import DashboardLayout from './components/DashboardLayout';
import { GlobalModals, SubmissionDetail, ToastNotification } from './components/Modals';
import { Overview, Inbox, ApiKeys, Webhooks, Integration, Settings } from './pages/DashboardPages';

export default function App() {
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState('overview');
  const [logs, setLogs]         = useState([]);
  const [projects, setProjects] = useState([]);
  const [apiKeys, setApiKeys]   = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [active, setActive]     = useState(null);
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState({});
  const [toast, setToast]       = useState(null);
  const [busy, setBusy]         = useState(false);
  const [ll, setLl]             = useState(false);
  const [readLog, setReadLog]   = useState(null);
  const [filter, setFilter]     = useState('all');
  const [search, setSearch]     = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const fv  = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const msg = (m, t = 'ok') => { setToast({ m, t }); setTimeout(() => setToast(null), 4000); };
  const close = () => { setModal(null); setForm({}); setBusy(false); };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (user) loadProjects(); }, [user]);
  useEffect(() => { if (active) { loadLogs(); loadKeys(); loadWebhooks(); } }, [active?.id]);

  const loadProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (!error) { setProjects(data || []); if (data?.length && !active) setActive(data[0]); }
  };
  const loadLogs = async () => {
    setLl(true);
    try { const r = await fetch(`${API}/v1/logs/${active.id}`); if (r.ok) setLogs(await r.json()); } catch { setLogs([]); }
    setLl(false);
  };
  const loadKeys = async () => {
    const { data } = await supabase.from('api_keys').select('id, name, created_at').eq('project_id', active.id).order('created_at', { ascending: false });
    setApiKeys(data || []);
  };
  const loadWebhooks = async () => {
    try { const r = await fetch(`${API}/v1/webhooks/${active.id}`); if (r.ok) setWebhooks(await r.json()); } catch { setWebhooks([]); }
  };
  const createProject = async () => {
    if (!form.pn?.trim()) return msg('Enter a project name', 'err');
    setBusy(true);
    const { data, error } = await supabase.from('projects').insert([{ name: form.pn.trim(), user_id: user.id }]).select().single();
    setBusy(false);
    if (!error) { setProjects(p => [data, ...p]); setActive(data); close(); msg('Workspace created!'); }
  };
  const createKey = async () => {
    if (!form.kn?.trim() || !active?.id) return msg('Enter a key name', 'err');
    
    const domains = form.kd ? form.kd.split(',').map(d => d.trim().replace(/\/$/, '')).filter(Boolean) : [];
    
    const bytes = new Uint8Array(24); crypto.getRandomValues(bytes);
    const raw = 'of_live_' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    
    setBusy(true);
    const { data: inserted, error } = await supabase
      .from('api_keys')
      .insert([{ name: form.kn.trim(), key_hash: raw, project_id: active.id, allowed_domains: domains }])
      .select('id, name, created_at, allowed_domains')
      .single();
    setBusy(false);
    
    if (!error) { 
      setApiKeys(k => [inserted, ...k]); 
      setForm({ gk: raw }); 
      setModal('viewkey'); 
    } else {
      msg('Error creating key', 'err');
    }
  };
  const createWebhook = async () => {
    if (!form.wh?.trim() || !active?.id) return msg('Enter a valid URL', 'err');
    setBusy(true);
    try {
      const r = await fetch(`${API}/v1/webhooks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project_id: active.id, url: form.wh.trim() }) });
      const data = await r.json();
      if (r.ok) { setWebhooks(w => [data, ...w]); close(); msg('Webhook activated!'); }
    } catch { msg('Error adding webhook', 'err'); }
    setBusy(false);
  };

  const updateProject = async (updates) => {
    setBusy(true);
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', active.id)
      .select()
      .single();
    
    setBusy(false);
    if (!error) {
      setProjects(p => p.map(x => x.id === active.id ? data : x));
      setActive(data);
      msg('Workspace settings updated!');
    } else {
      msg('Failed to update settings', 'err');
    }
  };

  const deleteKey = async (id) => { await supabase.from('api_keys').delete().eq('id', id); setApiKeys(k => k.filter(x => x.id !== id)); msg('Key deleted'); };
  const deleteWebhook = async (id) => {
    await fetch(`${API}/v1/webhooks/${id}`, { method: 'DELETE' }); setWebhooks(w => w.filter(x => x.id !== id)); msg('Webhook removed');
  };
  const deleteProject = async () => {
    if (!active) return;
    await supabase.from('projects').delete().eq('id', active.id);
    const remaining = projects.filter(p => p.id !== active.id);
    setProjects(remaining); setActive(remaining[0] || null); setLogs([]); setApiKeys([]); setWebhooks([]); close();
    msg('Workspace deleted');
  };
  const downloadCSV = () => {
    if (!logs.length) return msg("No logs to download", "err");
    const allKeys = new Set(["Date", "Subject", "Status"]);
    logs.forEach(log => { if (log.payload) Object.keys(log.payload).forEach(k => allKeys.add(k)); });
    const headers = Array.from(allKeys);
    let csv = headers.join(",") + "\n";
    logs.forEach(log => {
      csv += headers.map(h => {
        if (h === "Date") return `"${new Date(log.created_at).toLocaleString()}"`;
        if (h === "Subject") return `"${log.subject || ''}"`;
        if (h === "Status") return `"${log.status || ''}"`;
        const val = log.payload ? (log.payload[h] || '') : '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(",") + "\n";
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `${active.name.replace(/\s+/g, '_')}_submissions.csv`;
    a.click();
    msg('CSV exported!');
  };

  // --- STRICT HANDLE VIEW LOG ---
  const handleViewLog = async (log) => {
    if (!log) {
      setReadLog(null); 
      return;
    }
    
    setReadLog(log); 

    // If it's already read, do nothing
    if (log.read) return;

    // 1. Instantly update local UI
    setLogs(prev => prev.map(l => l.id === log.id ? { ...l, read: true } : l));
    
    // 2. Silently update database
    try {
      await fetch(`${API}/v1/logs/${log.id}/read`, { method: "PATCH" });
    } catch (err) {
      console.error("Failed to mark log as read", err);
    }
  };

  const sentCount   = logs.filter(l => l.status === 'sent').length;
  const failedCount = logs.filter(l => l.status === 'failed').length;
  const todayCount  = logs.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;

  const filteredLogs = logs.filter(log => {
    let matchFilter = true;
    if (filter !== 'all') {
      if (filter === 'unread') matchFilter = !log.read;
      else if (filter === 'read') matchFilter = log.read;
      else matchFilter = log.status === filter; 
    }
    const q = search.toLowerCase();
    const matchSearch = !q || log.subject?.toLowerCase().includes(q) || log.payload?.email?.toLowerCase().includes(q) || log.payload?.name?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (loading) return (
    <div className="relative h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
      <Noise />
      <div className="flex flex-col items-center gap-6 animate-fade-in relative z-10">
        <Logo />
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/80 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
        </div>
      </div>
    </div>
  );

  if (!user) return <Landing API={API} />;

  return (
    <div className="relative flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden selection:bg-violet-500/30">
      <Noise />
      
      <DashboardLayout 
        user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
        page={page} setPage={setPage} active={active} setActive={setActive} 
        projects={projects} setModal={setModal} logs={logs} loadLogs={loadLogs} 
        ll={ll} downloadCSV={downloadCSV} setReadLog={handleViewLog}
      >
        {page === 'overview' && <Overview logs={logs} active={active} setPage={setPage} sentCount={sentCount} todayCount={todayCount} failedCount={failedCount} ll={ll} setReadLog={handleViewLog} apiKeys={apiKeys} webhooks={webhooks} setModal={setModal} />}
        {page === 'submissions' && <Inbox logs={filteredLogs} active={active} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} ll={ll} setReadLog={handleViewLog} />}
        {page === 'apikeys' && <ApiKeys apiKeys={apiKeys} active={active} setModal={setModal} deleteKey={deleteKey} />}
        {page === 'webhooks' && <Webhooks webhooks={webhooks} active={active} setModal={setModal} deleteWebhook={deleteWebhook} />}
        {page === 'integration' && <Integration API={API} setPage={setPage} />}
        {page === 'settings' && <Settings user={user} active={active} updateProject={updateProject} setModal={setModal} />}
      </DashboardLayout>

      <SubmissionDetail readLog={readLog} setReadLog={handleViewLog} />
      
      <GlobalModals 
        modal={modal} close={close} busy={busy} form={form} fv={fv} 
        createProject={createProject} createKey={createKey} 
        createWebhook={createWebhook} deleteProject={deleteProject} active={active} 
      />
      
      <ToastNotification toast={toast} />
    </div>
  );
}