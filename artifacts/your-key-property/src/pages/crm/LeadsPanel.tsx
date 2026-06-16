import { toast } from "sonner";
import {
  useListLeads,
  useListListings,
  useUpdateLead,
  useDeleteLead,
  type Lead,
} from "@workspace/api-client-react";
import { Trash2, Loader2, Mail, Phone } from "lucide-react";
import { useCrmInvalidate, selectClass } from "./shared";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

export function LeadsPanel() {
  const invalidate = useCrmInvalidate();
  const leadsQ = useListLeads();
  const listingsQ = useListListings();
  const listings = listingsQ.data ?? [];

  const updateM = useUpdateLead({
    mutation: {
      onSuccess: () => {
        invalidate("leads");
        toast.success("Lead updated");
      },
      onError: (e) => toast.error(e.message || "Failed to update lead"),
    },
  });
  const deleteM = useDeleteLead({
    mutation: {
      onSuccess: () => {
        invalidate("leads");
        toast.success("Lead deleted");
      },
      onError: (e) => toast.error(e.message || "Failed to delete lead"),
    },
  });

  const leads = leadsQ.data ?? [];

  function listingTitle(l: Lead) {
    if (l.listingId == null) return null;
    return listings.find((x) => x.id === l.listingId)?.title ?? `#${l.listingId}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Leads</h2>
        <p className="text-sm text-white/50">
          {leads.length} {leads.length === 1 ? "enquiry" : "enquiries"}
        </p>
      </div>

      {leadsQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 py-16 text-center text-white/50">
          No leads yet. Enquiries from the website appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => {
            const title = listingTitle(lead);
            return (
              <div
                key={lead.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{lead.name}</span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                        {lead.source}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/60">
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-[#C9974C]"
                        >
                          <Mail className="h-3.5 w-3.5" /> {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-[#C9974C]"
                        >
                          <Phone className="h-3.5 w-3.5" /> {lead.phone}
                        </a>
                      )}
                    </div>
                    {title && (
                      <div className="mt-1 text-xs text-white/40">
                        Re: {title}
                      </div>
                    )}
                    {lead.message && (
                      <p className="mt-2 max-w-2xl text-sm text-white/70">
                        {lead.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className={`${selectClass} w-auto py-1.5`}
                      value={lead.status}
                      onChange={(e) =>
                        updateM.mutate({
                          id: lead.id,
                          data: { status: e.target.value },
                        })
                      }
                    >
                      {STATUSES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-[#0A1628] capitalize"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (confirm("Delete this lead?"))
                          deleteM.mutate({ id: lead.id });
                      }}
                      className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                      aria-label="Delete lead"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
