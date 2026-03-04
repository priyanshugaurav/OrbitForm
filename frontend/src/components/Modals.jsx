// src/components/Modals.jsx
import { Icon, IC, Badge, Noise, Inp, Btn, CopyBtn } from './UI';

export const ToastNotification = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-[80] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold animate-toast-in ring-1 ring-inset ${toast.t === 'err' ? 'bg-zinc-900 ring-rose-500/30 text-rose-400' : 'bg-zinc-900 ring-emerald-500/30 text-emerald-400'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${toast.t === 'err' ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}>
        <Icon d={toast.t === 'err' ? IC.warn : IC.check} cls="w-3.5 h-3.5 shrink-0" />
      </div>
      {toast.m}
    </div>
  );
};

export const SubmissionDetail = ({ readLog, setReadLog }) => {
  if (!readLog) return null;
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-zinc-950/60 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setReadLog(null); }}>
      <div className="w-full max-w-[480px] bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-slide-in relative">
        <Noise />
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/30 relative z-10">
          <div>
            <p className="text-sm font-bold text-zinc-100">Submission Details</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">{new Date(readLog.created_at).toLocaleString()}</p>
          </div>
          <button onClick={() => setReadLog(null)} className="p-2 -mr-2 rounded-xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <Icon d={IC.x} cls="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          <div className="bg-zinc-900/50 ring-1 ring-inset ring-zinc-800 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Subject</p>
            <p className="text-base font-semibold text-zinc-100">{readLog.subject}</p>
          </div>
          <div className="flex items-center gap-4 px-2">
            <Badge status={readLog.status} />
            <p className="text-xs font-medium text-zinc-500">{new Date(readLog.created_at).toLocaleString()}</p>
          </div>
          {readLog.payload && Object.entries(readLog.payload).length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 pt-2">Form Data</p>
              {Object.entries(readLog.payload).map(([key, val]) => (
                <div key={key} className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl p-5 hover:bg-zinc-900/50 transition-colors">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{key.replace(/[-_]/g, ' ')}</p>
                  <p className="text-sm font-medium text-zinc-200 whitespace-pre-wrap break-words">{val || <span className="text-zinc-600 italic">Empty</span>}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const GlobalModals = ({ modal, close, busy, form, fv, createProject, createKey, createWebhook, deleteProject, active }) => {
  if (!modal) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in" onClick={e => { if (e.target === e.currentTarget && !busy) close(); }}>
      <div className="bg-zinc-950 ring-1 ring-inset ring-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden scale-in relative">
        <Noise />
        <div className="relative z-10">
          {modal === 'newproject' && (
            <div className="p-6 space-y-6">
              <div><p className="text-lg font-bold text-zinc-100">New Workspace</p><p className="text-sm font-medium text-zinc-500 mt-1">Organize your forms by project</p></div>
              <Inp label="Workspace Name" value={form.pn || ''} onChange={e => fv('pn', e.target.value)} placeholder="e.g. Portfolio Site" autoFocus />
              <div className="flex justify-end gap-3 pt-2">
                <Btn variant="ghost" onClick={close}>Cancel</Btn>
                <Btn variant="primary" onClick={createProject} disabled={busy}>{busy ? 'Creating...' : 'Create workspace'}</Btn>
              </div>
            </div>
          )}

          {/* --- UPDATED: 'newkey' modal now includes domain restrictions --- */}
          {modal === 'newkey' && (
            <div className="p-6 space-y-5">
              <div>
                <p className="text-lg font-bold text-zinc-100">Generate Access Key</p>
                <p className="text-sm font-medium text-zinc-500 mt-1">A new key tied to this workspace</p>
              </div>
              
              <Inp 
                label="Key Label" 
                value={form.kn || ''} 
                onChange={e => fv('kn', e.target.value)} 
                placeholder="e.g. Contact Form" 
                autoFocus 
              />
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Allowed Domains (Optional)
                </label>
                <input 
                  type="text" 
                  value={form.kd || ''}
                  onChange={(e) => fv('kd', e.target.value)}
                  placeholder="https://myportfolio.com"
                  className="w-full bg-zinc-900/50 ring-1 ring-inset ring-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
                />
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Comma separated. Leave blank to allow submissions from any domain (not recommended for production).
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50">
                <Btn variant="ghost" onClick={close} disabled={busy}>Cancel</Btn>
                <Btn variant="primary" onClick={createKey} disabled={busy}>{busy ? 'Generating...' : 'Generate key'}</Btn>
              </div>
            </div>
          )}

          {modal === 'newwebhook' && (
            <div className="p-6 space-y-6">
              <div><p className="text-lg font-bold text-zinc-100">Add Webhook</p><p className="text-sm font-medium text-zinc-500 mt-1">Receive real-time form data at any URL</p></div>
              <Inp label="Endpoint URL" value={form.wh || ''} onChange={e => fv('wh', e.target.value)} placeholder="https://hooks.zapier.com/..." autoFocus
                help="We'll send a POST request with the full form payload instantly on each submission." />
              <div className="flex justify-end gap-3 pt-2">
                <Btn variant="ghost" onClick={close} disabled={busy}>Cancel</Btn>
                <Btn variant="primary" onClick={createWebhook} disabled={busy}>{busy ? 'Saving...' : 'Save webhook'}</Btn>
              </div>
            </div>
          )}

          {modal === 'viewkey' && (
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon d={IC.check} cls="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-lg font-bold text-zinc-100">Key Generated</p>
                <p className="text-sm font-medium text-zinc-500 mt-1">Copy this key now — it won't be shown again.</p>
              </div>
              <div>
                <div className="flex items-center gap-3 bg-zinc-900 ring-1 ring-inset ring-zinc-800 rounded-xl px-4 py-3 shadow-inner">
                  <code className="flex-1 min-w-0 truncate text-sm font-mono text-emerald-400 font-medium">{form.gk}</code>
                  <CopyBtn text={form.gk} />
                </div>
              </div>
              <Btn variant="primary" cls="w-full justify-center py-2.5" onClick={close}>Done</Btn>
            </div>
          )}

          {modal === 'confirmdelete' && (
            <div className="p-6 space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 ring-1 ring-inset ring-rose-500/20 flex items-center justify-center mb-4">
                  <Icon d={IC.trash} cls="w-6 h-6 text-rose-500" />
                </div>
                <p className="text-lg font-bold text-zinc-100">Delete Workspace?</p>
                <p className="text-sm font-medium text-zinc-500 mt-2 leading-relaxed">This permanently deletes <span className="text-zinc-200 font-bold">{active?.name}</span> and all its submissions, keys, and webhooks. This cannot be undone.</p>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Btn variant="ghost" onClick={close}>Cancel</Btn>
                <Btn variant="danger" onClick={deleteProject} disabled={busy}>{busy ? 'Deleting...' : 'Delete permanently'}</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};