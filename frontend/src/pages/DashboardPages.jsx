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
}) => (
  <div className="space-y-10 w-[98%] mx-auto relative ">
    {/* Page Header Area */}
    <div className="flex flex-col gap-2 relative shadow-2xl p-6 px-10 rounded-2xl bg-zinc-950 shadow-white/[0.05] z-10 w-full mb-10 overflow-hidden relative group">
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%]  w-64 h-64 bg-emerald-500/10 rounded-[100%] blur-[80px] -translate-y-[45%] group-hover:bg-indigo-500/30 group-hover:scale-110 ease-in-out transition-all delay-50 duration-700 pointer-events-none z-[-1]" />

      <h2 className="text-3xl font-bold tracking-tight text-white z-10">
        Overview
      </h2>
      <p className="text-sm text-zinc-400 max-w-xl z-10">
        A quick look at your workspace health, recent activity, and integration
        status.
      </p>
    </div>

    {/* Metric Cards Grid */}
    <div className="grid grid-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:gap-6 relative z-10 ">
      <StatCard
        label="Total Submissions"
        value={logs.length || 0}
        sub="All time record"
        icon={IC.inbox}
        color="from-indigo-500/20 to-purple-500/5 text-indigo-400 border-indigo-500/20"
      />
      <StatCard
        label="Delivery Rate"
        value={`${logs.length ? Math.round((sentCount / logs.length) * 100) : 0}%`}
        sub={`${sentCount} delivered total`}
        icon={IC.check}
        color="from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20"
      />
      <StatCard
        label="Today"
        value={todayCount || 0}
        sub="New submissions today"
        icon={IC.sparkles}
        color="from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/20"
      />
      <StatCard
        label="Failed"
        value={failedCount || 0}
        sub={failedCount > 0 ? "Action required" : "All clear"}
        icon={IC.warn}
        color={
          failedCount > 0
            ? "from-red-500/20 to-rose-500/5 text-red-400 border-red-500/30"
            : "from-zinc-500/10 to-transparent text-zinc-400 border-white/[0.05]"
        }
      />
    </div>

    {/* Main Content Split */}
    <div className="grid lg:grid-cols-[1fr_350px] gap-6 md:gap-8 relative z-10 items-start">
      {/* LEFT: Recent Submissions Card */}
      <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05] bg-[#121214]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
              <Icon d={IC.inbox} cls="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white">
              Recent Submissions
            </h3>
          </div>
          <button
            onClick={() => setPage("submissions")}
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg border border-transparent hover:border-white/[0.05]"
          >
            View all <Icon d={IC.chevron} cls="w-3 h-3 rotate-180" />
          </button>
        </div>

        <div className="divide-y divide-white/[0.05] min-h-[300px] flex flex-col">
          {ll && (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-zinc-500">
                Loading records...
              </p>
            </div>
          )}

          {!ll && !active && (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-4">
                <Icon d={IC.inbox} cls="w-8 h-8 text-zinc-600" />
              </div>
              <h4 className="text-base font-medium text-zinc-200 mb-1">
                No workspace selected
              </h4>
              <p className="text-sm text-zinc-500 max-w-sm">
                Create or select a workspace from the sidebar to view
                submissions.
              </p>
            </div>
          )}

          {!ll && active && logs.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-4">
                <Icon d={IC.inbox} cls="w-8 h-8 text-zinc-600" />
              </div>
              <h4 className="text-base font-medium text-zinc-200 mb-1">
                No submissions yet
              </h4>
              <p className="text-sm text-zinc-500 max-w-sm">
                Submissions from your connected HTML forms will appear here.
              </p>
            </div>
          )}

          {!ll &&
            logs.slice(0, 6).map((log) => {
              const email = log.payload?.email || log.payload?.Email || "—";
              const name = log.payload?.name || log.payload?.Name || "";
              return (
                <div
                  key={log.id}
                  onClick={() => setReadLog(log)}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-6 py-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.1] flex items-center justify-center text-xs font-bold text-zinc-300 shrink-0 shadow-inner">
                      {(name || email)[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                        {log.subject || "New Form Submission"}
                      </p>
                      <p className="text-xs text-zinc-500 truncate flex items-center gap-1.5 mt-0.5">
                        {name && (
                          <span className="font-medium text-zinc-400">
                            {name}
                          </span>
                        )}
                        {name && <span className="text-zinc-700">•</span>}
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:ml-4 pl-13 sm:pl-0">
                    <div className="flex items-center gap-2">
                      {/* Status Badge inline replacement */}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          log.status === "delivered"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : log.status === "failed"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                        }`}
                      >
                        {log.status === "delivered"
                          ? "Delivered"
                          : log.status === "failed"
                            ? "Failed"
                            : "Processing"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 shrink-0 tabular-nums font-mono">
                      {new Date(log.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* RIGHT: Stacked Setup & Resource Cards */}
      <div className="flex flex-col gap-6">
        {/* Workspace Health Card */}
        <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="px-5 py-4 border-b border-white/[0.05] bg-[#121214]/50">
            <h3 className="text-sm font-semibold text-white">
              Workspace Health
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Setup checklist</p>
          </div>

          <div className="p-5 space-y-4">
            {[
              {
                label: "Workspace Selected",
                ok: !!active,
                fix: () => setModal("newproject"),
                fixLabel: "Select",
              },
              {
                label: "Access Keys Configured",
                ok: apiKeys.length > 0,
                fix: () => setPage("apikeys"),
                fixLabel: "Create Key",
              },
              {
                label: "Webhooks Active",
                ok: webhooks.length > 0,
                fix: () => setPage("webhooks"),
                fixLabel: "Add Webhook",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full border ${
                      item.ok
                        ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                        : "bg-zinc-800 border-zinc-700"
                    }`}
                  />
                  <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {item.label}
                  </p>
                </div>
                {!item.ok ? (
                  <button
                    onClick={item.fix}
                    className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md hover:bg-indigo-500/20"
                  >
                    {item.fixLabel}
                  </button>
                ) : (
                  <Icon d={IC.check} cls="w-4 h-4 text-emerald-500/70" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources Card */}
        <div className="bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="px-5 py-4 border-b border-white/[0.05] bg-[#121214]/50">
            <h3 className="text-sm font-semibold text-white">
              Developer Resources
            </h3>
          </div>

          <div className="p-2 space-y-0.5">
            {[
              { label: "Quick Start Guide", icon: IC.docs },
              { label: "API Reference", icon: IC.code },
              { label: "Webhook Setup Guide", icon: IC.webhook },
              { label: "Example Templates", icon: IC.globe },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setPage("integration")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] transition-all text-left group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.05] group-hover:border-white/[0.1] transition-colors">
                  <Icon
                    d={item.icon}
                    cls="w-3.5 h-3.5 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors"
                  />
                </div>
                {item.label}
                <Icon
                  d={IC.chevron}
                  cls="w-3.5 h-3.5 ml-auto text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div className="relative flex-1 max-w-sm">
        <Icon
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          cls="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search submissions..."
          className="w-full bg-zinc-900/50 backdrop-blur-sm ring-1 ring-inset ring-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-zinc-900 transition-all shadow-sm"
        />
      </div>
      
      {/* ADDED 'unread' and 'read' to the filter map */}
      <div className="flex items-center gap-1.5 bg-zinc-900/50 backdrop-blur-sm ring-1 ring-inset ring-zinc-800 rounded-xl p-1.5 shadow-sm overflow-x-auto">
        {["all", "unread", "read", "sent", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200 whitespace-nowrap ${
              filter === f 
                ? "bg-zinc-700 text-white shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>

    <div className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-900/50">
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
                // Dynamic styling for unread vs read
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 cursor-pointer transition-colors items-center group ${
                  isUnread ? "bg-white/[0.03] hover:bg-white/[0.05]" : "hover:bg-zinc-800/40"
                }`}
              >
                <div className="col-span-5 flex items-center gap-3 md:gap-4">
                  
                  {/* UNREAD BLUE DOT INDICATOR */}
                  <div className="w-2 flex justify-center">
                    {isUnread && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0" />
                    )}
                  </div>

                  <div className={`w-8 h-8 rounded-full ring-1 ring-inset flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isUnread ? "bg-indigo-500/10 text-indigo-400 ring-indigo-500/30" : "bg-zinc-800 text-zinc-400 ring-zinc-700"
                  }`}>
                    {(name || email || "?")[0]?.toUpperCase()}
                  </div>
                  <p className={`text-sm truncate transition-colors ${
                    isUnread ? "font-bold text-white" : "font-semibold text-zinc-300 group-hover:text-zinc-100"
                  }`}>
                    {log.subject || "No subject"}
                  </p>
                </div>
                
                <div className="col-span-3 md:block flex flex-col pl-6 md:pl-0">
                  {name && (
                    <p className={`text-xs truncate ${isUnread ? "font-bold text-zinc-200" : "font-semibold text-zinc-300"}`}>
                      {name}
                    </p>
                  )}
                  <p className={`text-xs truncate ${isUnread ? "font-medium text-zinc-400" : "font-medium text-zinc-500"}`}>
                    {email}
                  </p>
                </div>
                <div className="col-span-2 flex items-center pl-6 md:pl-0">
                  <Badge status={log.status} />
                </div>
                <div className={`col-span-2 md:text-right text-xs tabular-nums pl-6 md:pl-0 ${
                  isUnread ? "font-bold text-indigo-300" : "font-medium text-zinc-600"
                }`}>
                  {new Date(log.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
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
    const loadedEmails = active?.target_emails ? active.target_emails.split(',').map(e => e.trim()) : [user.email];
    setTargetEmails(loadedEmails);
    
    setGlobalRedirect(active?.custom_redirect || "");
    setAutoResponder(active?.auto_responder || false);
    setMsgStr(active?.auto_responder_msg || "Thank you for reaching out! We have received your message and will get back to you shortly.");
    setBlockDisposable(active?.block_disposable || false);
    setPrivacyMode(active?.privacy_mode || false);
    
    // Reset OTP states if workspace changes
    setOtpMode(false);
    setEmailInput("");
    setOtpCode("");
  }, [active, user.email]);

  // --- OTP WORKFLOW ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    const emailToVerify = emailInput.trim();
    if (!emailToVerify || !emailToVerify.includes('@')) return;
    if (targetEmails.includes(emailToVerify)) {
      setEmailInput("");
      return alert("Email is already added.");
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`${API}/v1/settings/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify, project_id: active.id })
      });
      
      if (res.ok) {
        setPendingEmail(emailToVerify);
        setOtpMode(true);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to send code.");
      }
    } catch (err) {
      alert("Network Error: Make sure your backend is running.");
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
        body: JSON.stringify({ email: pendingEmail, project_id: active.id, otp: otpCode.trim() })
      });
      
      if (res.ok) {
        setTargetEmails([...targetEmails, pendingEmail]);
        // Reset states
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
    <div className="max-w-4xl space-y-8 pb-12">
      
      {/* Account Profile Card */}
      <div className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-900/50">
          <p className="text-sm font-bold text-zinc-100">Account Profile</p>
        </div>
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg shadow-violet-900/30 ring-2 ring-zinc-950">
            {user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-base font-bold text-zinc-100">{user.user_metadata?.name || "Developer"}</p>
            <p className="text-sm font-medium text-zinc-500 mt-0.5">{user.email}</p>
            <span className="inline-flex items-center mt-3 text-[10px] font-bold uppercase tracking-widest text-violet-300 bg-violet-500/10 ring-1 ring-inset ring-violet-500/20 rounded-md px-2 py-1">
              Free Plan
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLUMN 1: ROUTING & DELIVERY */}
        <div className="space-y-8">
          <div className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm h-full">
            <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
              <p className="text-sm font-bold text-zinc-100">Routing & Delivery</p>
              <Badge status="pro" text="Premium" />
            </div>
            
            <div className="p-6 space-y-8">
              {/* Target Emails Array UI */}
              <div>
                <label className="text-sm font-bold text-zinc-200 block mb-1">Target Recipients</label>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">Where should we send submissions? Verified emails only.</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {targetEmails.map((email, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                      <Icon d={IC.check} cls="w-3.5 h-3.5 text-indigo-400" />
                      {email}
                      <button onClick={() => removeEmail(email)} className="hover:text-rose-400 ml-1 transition-colors">
                        <Icon d={IC.x} cls="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* OTP Verification Flow UI */}
                {!otpMode ? (
                  <form onSubmit={handleRequestOtp} className="flex gap-2">
                    <input 
                      type="email" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Add email to verify..."
                      className="flex-1 bg-[#050505] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                    />
                    <button type="submit" disabled={isProcessing} className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                      {isProcessing ? 'Sending...' : 'Add'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl space-y-3 animate-fade-in">
                    <p className="text-xs text-indigo-200 font-medium">Enter the 6-digit code sent to <br/><strong className="text-white">{pendingEmail}</strong></p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        maxLength="6"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="000000"
                        className="w-24 bg-[#050505] border border-indigo-500/30 text-center rounded-xl px-3 py-2 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                      />
                      <button type="submit" disabled={isProcessing} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                        {isProcessing ? 'Checking...' : 'Verify'}
                      </button>
                      <button type="button" onClick={() => { setOtpMode(false); setOtpCode(""); }} className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="w-full h-px bg-zinc-800/50"></div>

              {/* Global Redirect */}
              <div>
                <label className="text-sm font-bold text-zinc-200 block mb-1">Global Redirect URL</label>
                <p className="text-xs text-zinc-500 mb-3 leading-relaxed">Fallback URL to redirect users to if your form is missing the hidden redirect input.</p>
                <input 
                  type="url" 
                  value={globalRedirect}
                  onChange={(e) => setGlobalRedirect(e.target.value)}
                  placeholder="https://yoursite.com/thank-you"
                  className="w-full bg-[#050505] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: SECURITY & DX */}
        <div className="space-y-8">
          
          {/* Security & Privacy */}
          <div className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
            <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
              <p className="text-sm font-bold text-zinc-100">Security & Privacy</p>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Block Disposable Emails */}
              <div className="flex items-center justify-between gap-4">
                <div className="max-w-[200px]">
                  <p className="text-sm font-bold text-zinc-200">Block Disposable Emails</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Reject temporary emails (e.g. 10minutemail).</p>
                </div>
                <button 
                  onClick={() => setBlockDisposable(!blockDisposable)}
                  className={`w-11 h-6 rounded-full relative transition-colors shadow-inner flex shrink-0 ${blockDisposable ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${blockDisposable ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="w-full h-px bg-zinc-800/50"></div>

              {/* Privacy Mode */}
              <div className="flex items-center justify-between gap-4">
                <div className="max-w-[200px]">
                  <p className="text-sm font-bold text-zinc-200">Strict Privacy Mode (GDPR)</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Forward emails, but do <strong className="text-rose-400">not</strong> save data to dashboard.</p>
                </div>
                <button 
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-11 h-6 rounded-full relative transition-colors shadow-inner flex shrink-0 ${privacyMode ? 'bg-rose-500' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${privacyMode ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Auto Responder */}
          <div className="bg-zinc-900/30 ring-1 ring-inset ring-zinc-800/80 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="max-w-[200px]">
                  <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5">
                    <Icon d={IC.sparkles} cls="w-4 h-4 text-indigo-400" /> Auto-Responder
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Instantly email users a custom branded response.
                  </p>
                </div>
                <button 
                  onClick={() => setAutoResponder(!autoResponder)}
                  className={`w-11 h-6 rounded-full relative transition-colors shadow-inner flex shrink-0 ${autoResponder ? 'bg-indigo-500' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${autoResponder ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className={`bg-[#050505] p-4 rounded-xl border border-zinc-800/80 transition-all ${autoResponder ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Custom Message</label>
                <textarea 
                  value={msgStr}
                  onChange={(e) => setMsgStr(e.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-300 focus:outline-none resize-none h-20"
                  placeholder="Enter your custom reply message here..."
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Global Action Bar */}
      <div className="bg-zinc-900/50 ring-1 ring-inset ring-zinc-800 rounded-2xl px-6 py-4 flex items-center justify-between sticky bottom-6 z-20 backdrop-blur-xl shadow-2xl">
        <p className="text-xs text-zinc-400 hidden sm:block">Remember to save your changes to apply routing rules.</p>
        <Btn onClick={handleSave} variant="primary" cls="text-sm py-2.5 px-8 w-full sm:w-auto justify-center">
          Save All Settings
        </Btn>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-500/5 ring-1 ring-inset ring-rose-500/20 rounded-2xl overflow-hidden backdrop-blur-sm mt-12">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md">
            <p className="text-sm font-bold text-rose-400">Delete Workspace</p>
            <p className="text-xs font-medium text-zinc-500 mt-1 leading-relaxed">
              Permanently delete <span className="text-zinc-200 font-bold">{active?.name || "this workspace"}</span>. This cannot be undone.
            </p>
          </div>
          <Btn variant="danger" onClick={() => setModal("confirmdelete")} cls="text-sm py-2">
            <Icon d={IC.trash} cls="w-4 h-4" /> Delete Workspace
          </Btn>
        </div>
      </div>

    </div>
  );
};