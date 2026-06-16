import { useState } from "react";
import { Link } from "wouter";
import { UserButton } from "@clerk/react";
import { Building2, Inbox, Users, Newspaper, ArrowLeft } from "lucide-react";
import { ListingsPanel } from "./crm/ListingsPanel";
import { LeadsPanel } from "./crm/LeadsPanel";
import { AgentsPanel } from "./crm/AgentsPanel";
import { PostsPanel } from "./crm/PostsPanel";

type Tab = "listings" | "leads" | "agents" | "posts";

const TABS: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "listings", label: "Listings", icon: Building2 },
  { id: "leads", label: "Leads", icon: Inbox },
  { id: "agents", label: "Team", icon: Users },
  { id: "posts", label: "Insights", icon: Newspaper },
];

export function Crm() {
  const [tab, setTab] = useState<Tab>("listings");

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] pt-24">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C9974C]">
              Your Key
            </p>
            <h1 className="font-serif text-3xl text-white">Property CRM</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <UserButton />
          </div>
        </div>

        <div className="mb-8 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                tab === id
                  ? "bg-[#C9974C] text-[#0A1628]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "listings" && <ListingsPanel />}
        {tab === "leads" && <LeadsPanel />}
        {tab === "agents" && <AgentsPanel />}
        {tab === "posts" && <PostsPanel />}
      </div>
    </div>
  );
}
