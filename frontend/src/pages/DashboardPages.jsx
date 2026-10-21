// src/pages/DashboardPages.jsx
import {
  StatCard,
  Badge,
  EmptyState,
  Icon,
  IC,
  Btn,
  CopyBtn,
} from "../components/UI";
import { useState , useEffect } from "react";

export const Overview = ({
  logs,
  active,
  setPage,
  sentCount,
  todayCount,
  failedCount,
  ll,
  setReadLog,
  apiKeys,
  webhooks,
  setModal,
  API = import.meta.env.VITE_API_URL || "http://localhost:3000",
}) => (
  <div className="space-y-6 w-full mx-auto relative">
    {/* Clean, compact workspace header bar */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-zinc-800/80">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
            {active?.name || "Workspace Overview"}
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            live
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          Workspace activity, deliverability, and form endpoint metrics.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage("integration")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all shadow-sm"
        >
          <Icon d={IC.code} cls="w-3.5 h-3.5 text-zinc-400" />
          Endpoint URL
        </button>
        <button
          onClick={() => setModal("newkey")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-white transition-all shadow-sm"
        >
          <Icon d={IC.plus} cls="w-3.5 h-3.5 text-zinc-900" />
          New Key
        </button>
      </div>
    </div>

    {/* Compact 1-Row Bento Grid (Production Ready) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        label="Total Submissions"
        value={logs.length || 0}
        sub="All-time captured"
        icon={IC.inbox}
        statusDot="bg-indigo-400"
      />
      <StatCard
        label="Delivery Rate"
        value={`${logs.length ? Math.round((sentCount / logs.length) * 100) : 0}%`}
        sub={`${sentCount} delivered`}
        icon={IC.check}
        trend="Resend SES"
        statusDot="bg-emerald-400"
      />
      <StatCard
        label="Received Today"
        value={todayCount || 0}
        sub="Past 24 hours"
        icon={IC.sparkles}
        statusDot="bg-sky-400"
      />
      <StatCard
        label="Failed / Blocked"
        value={failedCount || 0}
        sub={failedCount > 0 ? "Blocked spam" : "Zero errors"}
        icon={IC.warn}
        trend={failedCount > 0 ? "Review" : "Optimal"}
        statusDot={failedCount > 0 ? "bg-rose-400" : "bg-zinc-600"}
      />
    </div>

    {/* Main Content Split: High density, clean borders */}
    <div className="grid lg:grid-cols-[1fr_320px] gap-4 relative z-10 items-start">
      {/* LEFT: Recent Submissions Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/30">
          <div className="flex items-center gap-2">
            <Icon d={IC.inbox} cls="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-semibold text-zinc-200">
              Recent Submissions
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono px-1.5 py-0.5 rounded bg-zinc-800/60">
              {logs.length}
            </span>
          </div>
          <button
            onClick={() => setPage("submissions")}
            className="text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1 hover:underline"
          >
            Inbox <Icon d={IC.chevron} cls="w-3 h-3" />
          </button>
        </div>

        <div className="divide-y divide-zinc-800/60 min-h-[220px] flex flex-col">
          {ll && (
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="w-5 h-5 border-2 border-zinc-500/30 border-t-zinc-200 rounded-full animate-spin mb-2" />
              <p className="text-xs text-zinc-500">Loading submissions...</p>
            </div>
          )}

          {!ll && logs.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-2 text-zinc-500">
                <Icon d={IC.inbox} cls="w-4 h-4" />
              </div>
              <h4 className="text-xs font-medium text-zinc-300">No submissions yet</h4>
              <p className="text-[11px] text-zinc-500 max-w-xs mt-0.5">
                Submissions to your HTML or React forms will appear here in real-time.
              </p>
            </div>
          )}

          {!ll &&
            logs.slice(0, 5).map((log) => {
              const email = log.payload?.email || log.payload?.Email || "—";
              const name = log.payload?.name || log.payload?.Name || "";
              return (
                <div
                  key={log.id}
                  onClick={() => setReadLog(log)}
                  className="group flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-zinc-800/30 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-medium text-zinc-300 shrink-0">
                      {(name || email)[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                          {log.subject || "New Form Submission"}
                        </p>
                        {!log.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5 font-mono">
                        {name ? `${name} • ` : ""}{email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium font-mono ${
                        log.status === "sent" || log.status === "delivered"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : log.status === "failed"
                            ? "bg-rose-500/10 text-rose-400"
                            : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {log.status === "sent" ? "delivered" : log.status}
                    </span>
                    <span className="text-[10px] text-zinc-500 tabular-nums font-mono">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* RIGHT: Stacked Setup & Resource Cards */}
      <div className="flex flex-col gap-3">
        {/* Workspace Health Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-zinc-200">
              Workspace Checklist
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">System</span>
          </div>

          <div className="p-3.5 space-y-2.5">
            {[
              {
                label: "Workspace Active",
                ok: !!active,
                fix: () => setModal("newproject"),
                fixLabel: "Select",
              },
              {
                label: "Access Key Generated",
                ok: apiKeys.length > 0,
                fix: () => setModal("newkey"),
                fixLabel: "Generate",
              },
              {
                label: "Email / Webhook Delivery",
                ok: webhooks.length > 0 || (active?.target_emails?.length > 0),
                fix: () => setPage("webhooks"),
                fixLabel: "Connect",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-xs py-1"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.ok ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                  <span className="text-zinc-300 font-medium">{item.label}</span>
                </div>
                {!item.ok ? (
                  <button
                    onClick={item.fix}
                    className="text-[10px] font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded transition-all"
                  >
                    {item.fixLabel}
                  </button>
                ) : (
                  <span className="text-[10px] text-zinc-500 font-mono">ok</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Endpoint Snippet Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-200">Submit Endpoint</span>
            <span className="text-[10px] font-mono text-zinc-500">POST</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 flex items-center justify-between gap-2">
            <code className="text-[11px] font-mono text-zinc-400 truncate">
              {API || 'http://localhost:3000'}/submit
            </code>
            <CopyBtn text={`${API || 'http://localhost:3000'}/submit`} small />
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">
            Point your HTML <code className="text-zinc-400">&lt;form action="..."&gt;</code> to this endpoint with your access key.
          </p>
        </div>

        {/* Developer Resources Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/30">
            <h3 className="text-xs font-semibold text-zinc-200">
              Developer Resources
            </h3>
          </div>

          <div className="p-1.5 space-y-0.5">
            {[
              { label: "Quick Start Guide", icon: IC.docs },
              { label: "API Reference", icon: IC.code },
              { label: "Webhook Setup Guide", icon: IC.webhook },
              { label: "Example Templates", icon: IC.globe },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setPage("integration")}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 transition-all text-left group"
              >
                <Icon
                  d={item.icon}
                  cls="w-3.5 h-3.5 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors"
                />
                <span className="flex-1">{item.label}</span>
                <Icon
                  d={IC.chevron}
                  cls="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-all"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Add this inside src/pages/DashboardPages.jsx

export const Inbox = ({
  logs,
  active,
  search,
  setSearch,
  filter,
  setFilter,
  ll,
  setReadLog,
}) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="relative flex-1 max-w-xs">
        <Icon
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          cls="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search submissions..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all shadow-sm"
        />
      </div>
      
      <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 shadow-sm overflow-x-auto">
        {["all", "unread", "read", "sent", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all whitespace-nowrap ${
              filter === f 
                ? "bg-zinc-800 text-white font-semibold" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
      <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-zinc-800/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-900/30">
        <div className="col-span-5">Subject & Sender</div>
        <div className="col-span-3">Contact</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Date</div>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {ll && (
          <div className="py-20 text-center text-sm font-medium text-zinc-500">
            <Icon
              d={IC.refresh}
              cls="w-5 h-5 animate-spin inline mr-2 text-zinc-400"
            />
            Loading inbox...
          </div>
        )}
        {!ll && !active && (
          <EmptyState
            icon={IC.inbox}
            title="No workspace selected"
            desc="Select or create a workspace to view submissions."
          />
        )}
        {!ll && active && logs.length === 0 && (
          <EmptyState
            icon={IC.inbox}
            title="No submissions found"
            desc={
              search || filter !== "all"
                ? "Try adjusting your filters."
                : "Submissions to your HTML forms will appear here."
            }
            action={
              search || filter !== "all" ? (
                <Btn
                  variant="ghost"
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                  cls="mt-2 text-xs"
                >
                  Clear filters
                </Btn>
              ) : null
            }
          />
        )}
        {!ll &&
          logs.map((log) => {
            const email = log.payload?.email || log.payload?.Email || "—";
            const name = log.payload?.name || log.payload?.Name || "";
            // Assuming log object has a boolean `read` status
            const isUnread = !log.read; 

            return (
              <div
                key={log.id}
                onClick={() => setReadLog(log)}
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 px-4 py-2.5 cursor-pointer transition-colors items-center group ${
                  isUnread ? "bg-white/[0.02] hover:bg-white/[0.04]" : "hover:bg-zinc-800/30"
                }`}
              >
                <div className="col-span-5 flex items-center gap-2.5">
                  <div className="w-1.5 flex justify-center">
                    {isUnread && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    )}
                  </div>

                  <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-[11px] font-medium text-zinc-300 shrink-0">
                    {(name || email || "?")[0]?.toUpperCase()}
                  </div>
                  <p className={`text-xs truncate transition-colors ${
                    isUnread ? "font-semibold text-white" : "font-normal text-zinc-300 group-hover:text-zinc-100"
                  }`}>
                    {log.subject || "No subject"}
                  </p>
                </div>
                
                <div className="col-span-3 md:block flex flex-col pl-4 md:pl-0">
                  {name && (
                    <p className="text-xs text-zinc-300 truncate font-medium">
                      {name}
                    </p>
                  )}
                  <p className="text-[11px] text-zinc-500 truncate font-mono">
                    {email}
                  </p>
                </div>

                <div className="col-span-2 pl-4 md:pl-0">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium font-mono ${
                      log.status === "sent" || log.status === "delivered"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : log.status === "failed"
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {log.status === "sent" ? "delivered" : log.status}
                  </span>
                </div>

                <div className="col-span-2 text-left md:text-right text-[11px] text-zinc-500 font-mono tabular-nums pl-4 md:pl-0">
                  {new Date(log.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  </div>
);

export const ApiKeys = ({ apiKeys, active, setModal, deleteKey }) => (
  <div className="space-y-8 max-w-5xl relative z-10 w-full">
    {/* Page Header Area */}
    <div className="flex flex-col gap-2 relative shadow-2xl p-6 px-10 rounded-2xl bg-[#0c0c0e] shadow-white/[0.05] z-10 w-full overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%] w-64 h-64 bg-indigo-500/10 rounded-[100%] blur-[80px] -translate-y-[45%] group-hover:bg-cyan-500/20 group-hover:scale-110 ease-in-out transition-all delay-50 duration-700 pointer-events-none z-[-1]" />

      <div className="flex items-center justify-between z-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Access Keys
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mt-1">
            Embed these in your HTML form's hidden input fields. Keys are
            securely scoped to{" "}
            <strong className="text-zinc-200">
              {active?.name || "this workspace"}
            </strong>
            .
          </p>
        </div>
        <button
          onClick={() => setModal("newkey")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Icon d={IC.plus} cls="w-4 h-4" /> Generate New Key
        </button>
      </div>
    </div>

    {/* Main Keys List Card */}
    <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10">
      {apiKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[20px] rounded-full" />
            <Icon d={IC.key} cls="w-8 h-8 text-indigo-400 relative z-10" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No access keys yet
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            Generate an access key and embed it in your HTML form to start
            receiving and processing submissions securely.
          </p>
          <button
            onClick={() => setModal("newkey")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all"
          >
            <Icon d={IC.plus} cls="w-4 h-4" /> Generate your first key
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05] flex flex-col">
          {apiKeys.map((k) => (
            <div
              key={k.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors group gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.1] flex items-center justify-center shadow-inner shrink-0 group-hover:border-indigo-500/30 transition-colors">
                  <Icon
                    d={IC.key}
                    cls="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-base font-semibold text-white">
                      {k.name}
                    </p>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-zinc-300 font-mono bg-[#050505] px-2 py-1 rounded border border-white/[0.05]">
                      of_live_••••••••••••••••
                    </code>
                    <button
                      className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                      title="Copy Key ID (Hidden visually)"
                    >
                      {/* You might want a real copy function here, visually it's just a hint */}
                      <Icon d={IC.docs} cls="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:pl-0 pl-[4.25rem]">
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                    Created
                  </span>
                  <span className="text-sm font-medium text-zinc-300 tabular-nums">
                    {new Date(k.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <button
                  onClick={() => deleteKey(k.id)}
                  className="p-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Revoke Key"
                >
                  <Icon d={IC.trash} cls="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Implementation Guide Card */}
    <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10 overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Icon d={IC.code} cls="w-5 h-5 text-cyan-400" />
          <p className="text-base font-semibold text-white">
            How to use your key
          </p>
        </div>
        <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
          Drop this exact snippet inside your HTML{" "}
          <code className="text-xs bg-white/10 px-1 py-0.5 rounded text-zinc-300 font-mono">
            &lt;form&gt;
          </code>{" "}
          element. Don't forget to replace the placeholder value with your
          actual generated key from above.
        </p>
      </div>

      <div className="relative z-10 w-full md:w-auto overflow-hidden rounded-xl border border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.5)] group/code">
        <div className="flex items-center justify-between px-4 py-2 bg-[#121214] border-b border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-500">
            HTML Snippet
          </span>
          <button className="text-[10px] font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">
            Copy
          </button>
        </div>
        <code className="block text-[13px] text-zinc-300 font-mono bg-[#050505] p-4 whitespace-nowrap overflow-x-auto selection:bg-cyan-500/30">
          <span className="text-zinc-500">&lt;</span>
          <span className="text-blue-400">input</span>{" "}
          <span className="text-purple-300">type</span>
          <span className="text-zinc-400">=</span>
          <span className="text-yellow-200">"hidden"</span>{" "}
          <span className="text-purple-300">name</span>
          <span className="text-zinc-400">=</span>
          <span className="text-yellow-200">"access_key"</span>{" "}
          <span className="text-purple-300">value</span>
          <span className="text-zinc-400">=</span>
          <span className="text-yellow-200">"YOUR_KEY_HERE"</span>
          <span className="text-zinc-500">&gt;</span>
        </code>
      </div>
    </div>
  </div>
);

export const Webhooks = ({ webhooks, active, setModal, deleteWebhook }) => (
  <div className="space-y-8 max-w-5xl relative z-10 w-full">
    {/* Page Header Area */}
    <div className="flex flex-col gap-2 relative shadow-2xl p-6 px-10 rounded-2xl bg-[#0c0c0e] shadow-white/[0.05] z-10 w-full overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%] w-64 h-64 bg-emerald-500/10 rounded-[100%] blur-[80px] -translate-y-[45%] group-hover:bg-teal-500/20 group-hover:scale-110 ease-in-out transition-all delay-50 duration-700 pointer-events-none z-[-1]" />

      <div className="flex items-center justify-between z-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Event Webhooks
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mt-1">
            Fire real-time POST requests to any URL instantly on every form
            submission for{" "}
            <strong className="text-zinc-200">
              {active?.name || "this workspace"}
            </strong>
            .
          </p>
        </div>
        <button
          onClick={() => setModal("newwebhook")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <Icon d={IC.plus} cls="w-4 h-4" /> Add Webhook
        </button>
      </div>
    </div>

    {/* Main Webhooks List Card */}
    <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10">
      {webhooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[20px] rounded-full" />
            <Icon d={IC.webhook} cls="w-8 h-8 text-emerald-400 relative z-10" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No webhooks configured
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            Connect Zapier, Discord, Slack, or your own backend to receive form
            data in real-time.
          </p>
          <button
            onClick={() => setModal("newwebhook")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
          >
            <Icon d={IC.plus} cls="w-4 h-4" /> Add your first webhook
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05] flex flex-col">
          {webhooks.map((w) => (
            <div
              key={w.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors group gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.1] flex items-center justify-center shadow-inner shrink-0 group-hover:border-emerald-500/30 transition-colors">
                  <Icon
                    d={IC.webhook}
                    cls="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-200 truncate font-mono mb-1 pr-4">
                    {w.url}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs font-medium text-zinc-500">
                      Active · Ready to receive events
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 sm:pl-4">
                <button
                  onClick={() => deleteWebhook(w.id)}
                  className="p-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                  title="Delete Webhook"
                >
                  <Icon d={IC.trash} cls="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Payload Reference Card */}
    <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl relative z-10 mt-8">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          {/* Muted the icon color to match the minimal theme */}
          <Icon d={IC.code} cls="w-4 h-4 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-300 tracking-wide">
            Webhook Payload Format
          </span>
        </div>
        <button className="text-[10px] font-medium text-zinc-500 hover:text-zinc-200 transition-colors">
          Copy JSON
        </button>
      </div>

      {/* CODE BLOCK */}
      <div className="p-6 md:p-8 overflow-x-auto bg-[#050505]">
        <pre className="text-[13px] font-mono leading-loose selection:bg-zinc-800">
          <span className="text-zinc-600">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">project</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">My Portfolio</span>
          <span className="text-zinc-600">",</span>
          {"\n"}
          {"  "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">subject</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">New contact form submission</span>
          <span className="text-zinc-600">",</span>
          {"\n"}
          {"  "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">timestamp</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">2026-03-03T16:29:00.000Z</span>
          <span className="text-zinc-600">",</span>
          {"\n"}
          {"  "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">data</span>
          <span className="text-zinc-600">": {"{"}</span>
          {"\n"}
          {"    "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">name</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">Jane Smith</span>
          <span className="text-zinc-600">",</span>
          {"\n"}
          {"    "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">email</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">jane@example.com</span>
          <span className="text-zinc-600">",</span>
          {"\n"}
          {"    "}
          <span className="text-zinc-600">"</span>
          <span className="text-zinc-200">message</span>
          <span className="text-zinc-600">": "</span>
          <span className="text-zinc-400">Hello...</span>
          <span className="text-zinc-600">"</span>
          {"\n"}
          {"  "}
          <span className="text-zinc-600">{"}"}</span>
          {"\n"}
          <span className="text-zinc-600">{"}"}</span>
        </pre>
      </div>
    </div>
  </div>
);


export const Integration = ({ API = "https://api.yourdomain.com", setPage }) => {
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
    basic: `<form action="${API}/submit" method="POST">\n  \n  <input type="hidden" name="access_key" value="YOUR_KEY" />\n\n  \n  <input type="text" name="name" required />\n  <input type="email" name="email" required />\n  <textarea name="message" required></textarea>\n\n  <button type="submit">Submit</button>\n</form>`,
    
    files: `<form action="${API}/submit" method="POST" enctype="multipart/form-data">\n  <input type="hidden" name="access_key" value="YOUR_KEY" />\n\n  <input type="email" name="email" required />\n  \n  \n  \n  <input type="file" name="attachment" accept="image/*, .pdf" />\n\n  <button type="submit">Submit</button>\n</form>`,
    
    security: `<form action="${API}/submit" method="POST">\n  <input type="hidden" name="access_key" value="YOUR_KEY" />\n\n  \n  \n  <input type="checkbox" name="botcheck" style="display: none;" />\n\n  <input type="email" name="email" required />\n  <button type="submit">Submit</button>\n</form>`,
    
    react: `// Example using React / Next.js\nconst handleSubmit = async (e) => {\n  e.preventDefault();\n  const formData = new FormData(e.target);\n  \n  const response = await fetch("${API}/submit", {\n    method: "POST",\n    body: formData,\n    // NOTE: Do not set 'Content-Type' manually when using FormData!\n    // The browser will automatically set 'multipart/form-data' with the correct boundary.\n  });\n\n  const result = await response.json();\n  if(result.success) alert("Sent!");\n};`
  };

  return (
    // 1. Give the wrapper a fixed height calculation based on the viewport minus header/padding
    <div className="max-w-5xl mx-auto font-sans text-zinc-100 selection:bg-indigo-500/30 w-full relative z-10 flex flex-col md:h-[calc(100vh-130px)]">
      
      {/* HEADER SECTION (Frozen - shrink-0 prevents it from collapsing) */}
      <div className="shrink-0 mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Integration Guide</h2>
        <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
          OrbitForm is completely framework-agnostic. Whether you're using plain HTML, React, Vue, or Webflow, just point your form to our API.
        </p>
      </div>

      {/* MAIN BODY AREA (flex-1 takes remaining height, min-h-0 allows internal scrolling) */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-1 min-h-0">
        
        {/* LEFT: Navigation Sidebar (Frozen) */}
        {/* We hide the scrollbar here for a cleaner look just in case it overflows on small screens */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1.5 md:h-full md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

        {/* RIGHT: Content Area (This is the ONLY part that scrolls!) */}
        {/* Added a beautiful custom thin scrollbar for a premium feel */}
        <div className="flex-1 min-w-0 w-full md:h-full md:overflow-y-auto md:pr-4 pb-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
          
          {/* BASIC SETUP */}
          {activeTab === "basic" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Basic HTML Form</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  To start receiving submissions, add the <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">action</code> attribute to your form pointing to our API, and include your Access Key as a hidden input.
                </p>
              </div>
              <CodeBlock snippet={snippets.basic} copiedId={copiedId} handleCopy={handleCopy} id="basic" />
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 mt-6">
                <Icon d={IC.check} cls="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  <strong className="text-emerald-300 block mb-1">Redirection</strong>
                  By default, OrbitForm returns JSON. To redirect users to a "Thank You" page instead, add another hidden input:<br/>
                  <code className="text-emerald-300 mt-2 block bg-emerald-500/20 p-1.5 rounded text-xs">&lt;input type="hidden" name="redirect" value="https://yoursite.com/thanks" /&gt;</code>
                </p>
              </div>
            </div>
          )}

          {/* FILE UPLOADS */}
          {activeTab === "files" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Accepting File Attachments</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  OrbitForm natively supports file uploads up to 5MB. Files are temporarily stored securely and forwarded directly as attachments to your email inbox.
                </p>
              </div>
              
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3">
                <Icon d={IC.warn} cls="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-100/80">
                  <strong className="text-rose-300 block mb-1">Crucial Step:</strong> You MUST add <code className="bg-rose-500/20 px-1 rounded text-rose-300">enctype="multipart/form-data"</code> to your <code className="bg-rose-500/20 px-1 rounded text-rose-300">&lt;form&gt;</code> tag, otherwise the files will not be sent!
                </p>
              </div>

              <CodeBlock snippet={snippets.files} copiedId={copiedId} handleCopy={handleCopy} id="files" />
              
              <h4 className="text-sm font-bold text-zinc-300 mt-8 mb-3 border-t border-zinc-800/50 pt-6">Using React / Fetch API</h4>
              <CodeBlock snippet={snippets.react} copiedId={copiedId} handleCopy={handleCopy} id="react" />
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Spam Prevention & Security</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Keep your inbox clean. We offer two layers of protection to ensure you only get real messages.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">1</span> 
                  The Honeypot (Bot Trapping)
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed ml-8">
                  Add a hidden checkbox named <code>botcheck</code>. Real users won't see it, but automated spam bots scrape the HTML and check every box. If our API sees this box is checked, we silently reject the submission without notifying the bot.
                </p>
                <div className="ml-8">
                  <CodeBlock snippet={snippets.security} copiedId={copiedId} handleCopy={handleCopy} id="security" />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-800/50">
                <h4 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">2</span> 
                  Domain Restriction (CORS)
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed ml-8">
                  Prevent malicious actors from stealing your Access Key and submitting forms from other websites. 
                  Go to <button onClick={() => setPage('apikeys')} className="text-indigo-400 hover:underline">Access Keys</button> and generate a new key. In the "Allowed Domains" field, enter your website URL (e.g., <code>https://myportfolio.com</code>). Submissions from any other origin will be blocked automatically.
                </p>
              </div>
            </div>
          )}

          {/* WEBHOOKS */}
          {activeTab === "webhooks" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Webhooks & Integrations</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Want to send form data to Slack, Discord, Google Sheets, or your own database? Set up a Webhook in the <button onClick={() => setPage('webhooks')} className="text-indigo-400 hover:underline">Webhooks tab</button>.
                </p>
              </div>
              
              <div className="bg-[#050505] p-5 rounded-xl border border-zinc-800/80">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">JSON Payload Sent to your URL</p>
                <pre className="text-[13px] font-mono text-zinc-300 overflow-x-auto">
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

          {/* AUTO RESPONDER */}
          {activeTab === "autoresponder" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Auto-Responders</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Provide a better experience for your users by instantly sending them a confirmation email when they submit your form.
                </p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                <ol className="list-decimal list-inside space-y-3 text-sm text-zinc-300 ml-2">
                  <li>Ensure your HTML form has an input field with the exact attribute <code className="text-indigo-300 bg-indigo-500/10 px-1 rounded">name="email"</code>.</li>
                  <li>Go to the <button onClick={() => setPage('settings')} className="text-indigo-400 hover:underline font-bold">Settings tab</button> in your dashboard.</li>
                  <li>Toggle the <strong>Auto-Responder</strong> switch to On.</li>
                  <li>Write your custom response message and hit Save.</li>
                </ol>
              </div>
              <p className="text-xs text-zinc-500 italic">Note: If the user leaves the email field blank, or provides an invalid email, the auto-responder will quietly fail without interrupting your submission.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Sub-component for code blocks to keep code clean and handle syntax highlighting natively
const CodeBlock = ({ snippet, copiedId, handleCopy, id }) => (
  <div className="bg-[#050505] border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
      </div>
      <button
        onClick={() => handleCopy(snippet, id)}
        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        {copiedId === id ? <span className="text-emerald-400">Copied!</span> : "Copy Code"}
      </button>
    </div>
    <div className="p-5 overflow-x-auto">
      <pre className="text-[13px] font-mono leading-relaxed text-zinc-300">
        {snippet.split('\n').map((line, i) => {
          // Extremely basic regex syntax highlighting just for visual flair (no heavy libraries needed)
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


export const Settings = ({ user, active, updateProject, setModal }) => {
  // Define API URL here as a fallback
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Routing States
  const [emailInput, setEmailInput] = useState("");
  const [targetEmails, setTargetEmails] = useState([]);
  const [globalRedirect, setGlobalRedirect] = useState("");
  
  // OTP Verification States
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Toggle States
  const [autoResponder, setAutoResponder] = useState(false);
  const [msgStr, setMsgStr] = useState("");
  const [blockDisposable, setBlockDisposable] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);

  // Sync state when the active project changes
  useEffect(() => {
    let loadedEmails = [user?.email || "founder@orbitform.space"];
    if (active?.target_emails) {
      if (Array.isArray(active.target_emails)) {
        loadedEmails = active.target_emails;
      } else if (typeof active.target_emails === 'string') {
        loadedEmails = active.target_emails.split(',').map(e => e.trim()).filter(Boolean);
      }
    }
    setTargetEmails(loadedEmails.length ? loadedEmails : [user?.email || "founder@orbitform.space"]);
    
    setGlobalRedirect(active?.custom_redirect || "");
    setAutoResponder(active?.auto_responder || false);
    setMsgStr(active?.auto_responder_msg || "Thank you for reaching out! We have received your message and will get back to you shortly.");
    setBlockDisposable(active?.block_disposable || false);
    setPrivacyMode(active?.privacy_mode || false);
    
    // Reset OTP states if workspace changes
    setOtpMode(false);
    setEmailInput("");
    setOtpCode("");
  }, [active, user?.email]);

  // --- ADD RECIPIENT WORKFLOW ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    const emailToVerify = emailInput.trim();
    if (!emailToVerify || !emailToVerify.includes('@')) return;
    if (targetEmails.includes(emailToVerify)) {
      setEmailInput("");
      return alert("Email is already added.");
    }

    // If in dev bypass / local demo mode, immediately add without requiring mail delivery
    if (user?.id === 'demo-user-dev') {
      setTargetEmails(prev => [...prev, emailToVerify]);
      setEmailInput("");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`${API}/v1/settings/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify, project_id: active?.id })
      });
      
      if (res.ok) {
        setPendingEmail(emailToVerify);
        setOtpMode(true);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to send verification email. Adding directly for now.");
        // Fallback for custom domains without verified Resend sender
        setTargetEmails(prev => [...prev, emailToVerify]);
        setEmailInput("");
      }
    } catch (err) {
      // Fallback
      setTargetEmails(prev => [...prev, emailToVerify]);
      setEmailInput("");
    }
    setIsProcessing(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch(`${API}/v1/settings/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, project_id: active?.id, otp: otpCode.trim() })
      });
      
      if (res.ok) {
        setTargetEmails([...targetEmails, pendingEmail]);
        setOtpMode(false);
        setPendingEmail("");
        setOtpCode("");
        setEmailInput("");
      } else {
        const err = await res.json();
        alert(err.error || "Invalid verification code.");
      }
    } catch (err) {
      alert("Network Error.");
    }
    setIsProcessing(false);
  };
  // ----------------------

  const removeEmail = (emailToRemove) => {
    if (targetEmails.length === 1) return alert("You must have at least one recipient email.");
    setTargetEmails(targetEmails.filter(e => e !== emailToRemove));
  };

  const handleSave = () => {
    updateProject({ 
      target_emails: targetEmails.join(','),
      custom_redirect: globalRedirect,
      auto_responder: autoResponder, 
      auto_responder_msg: msgStr,
      block_disposable: blockDisposable,
      privacy_mode: privacyMode
    });
  };

  return (
    <div className="max-w-5xl space-y-6 pb-12">
      {/* Account Profile Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-100 shrink-0">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-zinc-100">{user?.user_metadata?.full_name || user?.user_metadata?.name || "Workspace Admin"}</p>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">PRO PLAN</span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{user?.email}</p>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono">
          Workspace ID: <span className="text-zinc-300">{active?.id?.slice(0, 12)}...</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* COLUMN 1: ROUTING & DELIVERY */}
        <div className="space-y-5">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/30 flex justify-between items-center">
              <span className="text-xs font-semibold text-zinc-200">Delivery & Recipients</span>
              <span className="text-[10px] font-mono text-emerald-400">Active</span>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Target Recipients</label>
                <p className="text-[11px] text-zinc-500 mb-2.5">Submissions will be dispatched to these email addresses.</p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {targetEmails.map((email, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/80 text-zinc-200 px-2 py-1 rounded text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {email}
                      <button onClick={() => removeEmail(email)} className="hover:text-rose-400 ml-1 text-zinc-500 transition-colors">
                        <Icon d={IC.x} cls="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleRequestOtp} className="flex gap-2">
                  <input 
                    type="email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Add team member email..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                  <button type="submit" disabled={isProcessing} className="bg-zinc-100 hover:bg-white text-zinc-950 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">
                    Add
                  </button>
                </form>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Custom Redirect URL</label>
                <p className="text-[11px] text-zinc-500 mb-2">Users will be redirected here after submitting your form.</p>
                <input 
                  type="url" 
                  value={globalRedirect}
                  onChange={(e) => setGlobalRedirect(e.target.value)}
                  placeholder="https://yoursite.com/thank-you"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: SECURITY & AUTO-RESPONDER */}
        <div className="space-y-5">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/30">
              <span className="text-xs font-semibold text-zinc-200">Security & Privacy Filter</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-200">Block Disposable Emails</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Filter temporary/disposable inboxes automatically.</p>
                </div>
                <button 
                  onClick={() => setBlockDisposable(!blockDisposable)}
                  className={`w-9 h-5 rounded-full relative transition-colors shadow-inner flex shrink-0 ${blockDisposable ? 'bg-indigo-600' : 'bg-zinc-800'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${blockDisposable ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-200">Strict Privacy Mode (GDPR)</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Email data will NOT be retained in the database.</p>
                </div>
                <button 
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-9 h-5 rounded-full relative transition-colors shadow-inner flex shrink-0 ${privacyMode ? 'bg-indigo-600' : 'bg-zinc-800'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${privacyMode ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                    <Icon d={IC.sparkles} cls="w-3.5 h-3.5 text-indigo-400" />
                    Auto-Responder
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Send instant branded receipt email to the submitter.</p>
                </div>
                <button 
                  onClick={() => setAutoResponder(!autoResponder)}
                  className={`w-9 h-5 rounded-full relative transition-colors shadow-inner flex shrink-0 ${autoResponder ? 'bg-indigo-600' : 'bg-zinc-800'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${autoResponder ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className={`${autoResponder ? 'opacity-100' : 'opacity-40 pointer-events-none'} transition-opacity`}>
                <textarea 
                  value={msgStr}
                  onChange={(e) => setMsgStr(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-700 resize-none h-18"
                  placeholder="Custom email confirmation message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
        <p className="text-xs text-zinc-400">Save workspace changes to apply updated routing & security policies.</p>
        <button 
          onClick={handleSave} 
          className="bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold py-2 px-5 rounded-lg transition-all shadow-sm"
        >
          Save Changes
        </button>
      </div>

      {/* Danger Zone */}
      <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-rose-400">Delete Workspace</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Permanently delete {active?.name || "this workspace"} and all associated form submissions.</p>
        </div>
        <button 
          onClick={() => setModal("confirmdelete")} 
          className="text-xs font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 px-3 py-1.5 rounded-lg transition-all shrink-0"
        >
          Delete Workspace
        </button>
      </div>
    </div>
  );
};