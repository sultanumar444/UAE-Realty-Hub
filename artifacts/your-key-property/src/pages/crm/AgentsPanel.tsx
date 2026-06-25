import { useState } from "react";
import { toast } from "sonner";
import {
  useListAgents,
  useCreateAgent,
  useUpdateAgent,
  useDeleteAgent,
  type Agent,
  type AgentInput,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useCrmInvalidate, Field, inputClass } from "./shared";
import { storageUrl } from "../../lib/listingApi";

type FormState = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  title: string;
  bio: string;
  photoUrl: string;
  active: boolean;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  title: "",
  bio: "",
  photoUrl: "",
  active: true,
};

function agentToForm(a: Agent): FormState {
  return {
    name: a.name,
    email: a.email,
    phone: a.phone ?? "",
    whatsapp: a.whatsapp ?? "",
    title: a.title ?? "",
    bio: a.bio ?? "",
    photoUrl: a.photoUrl ?? "",
    active: a.active ?? true,
  };
}

function formToInput(f: FormState): AgentInput {
  return {
    name: f.name.trim(),
    email: f.email.trim(),
    phone: f.phone.trim() || undefined,
    whatsapp: f.whatsapp.trim() || undefined,
    title: f.title.trim() || undefined,
    bio: f.bio.trim() || undefined,
    photoUrl: f.photoUrl || undefined,
    active: f.active,
  };
}

export function AgentsPanel() {
  const invalidate = useCrmInvalidate();
  const agentsQ = useListAgents();
  const agents = agentsQ.data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const createM = useCreateAgent({
    mutation: {
      onSuccess: () => {
        invalidate("agents");
        toast.success("Agent added");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to add agent"),
    },
  });
  const updateM = useUpdateAgent({
    mutation: {
      onSuccess: () => {
        invalidate("agents");
        toast.success("Agent updated");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to update agent"),
    },
  });
  const deleteM = useDeleteAgent({
    mutation: {
      onSuccess: () => {
        invalidate("agents");
        toast.success("Agent removed");
      },
      onError: (e) => toast.error(e.message || "Failed to remove agent"),
    },
  });

  const { uploadFile, isUploading } = useUpload({
    onError: (e) => toast.error(e.message || "Upload failed"),
  });

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }
  function openEdit(a: Agent) {
    setEditing(a);
    setForm(agentToForm(a));
    setOpen(true);
  }

  async function handlePhoto(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res) setForm((f) => ({ ...f, photoUrl: res.objectPath }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    const input = formToInput(form);
    if (editing) updateM.mutate({ id: editing.id, data: input });
    else createM.mutate({ data: input });
  }

  const saving = createM.isPending || updateM.isPending;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Team</h2>
          <p className="text-sm text-white/50">
            {agents.length} {agents.length === 1 ? "agent" : "agents"}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          <Plus className="h-4 w-4" /> Add agent
        </button>
      </div>

      {agentsQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : agents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 py-16 text-center text-white/50">
          No team members yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <div
              key={a.id}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={storageUrl(a.photoUrl)}
                  alt={a.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{a.name}</span>
                    {!a.active && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase text-white/50">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-[#C9974C]">{a.title}</div>
                  <div className="truncate text-xs text-white/50">{a.email}</div>
                  {a.phone && (
                    <div className="text-xs text-white/50">{a.phone}</div>
                  )}
                  {a.whatsapp && (
                    <div className="text-xs text-white/50">WhatsApp: {a.whatsapp}</div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-1">
                <button
                  onClick={() => openEdit(a)}
                  className="rounded-md p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Edit agent"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${a.name}?`))
                      deleteM.mutate({ id: a.id });
                  }}
                  className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Remove agent"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/15 bg-[#0A1628] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editing ? "Edit agent" : "Add agent"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={storageUrl(form.photoUrl)}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9974C]">
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isUploading ? "Uploading..." : "Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    void handlePhoto(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Senior Sales Consultant"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+971 50 000 0000"
                />
              </Field>
              <Field label="WhatsApp">
                <input
                  className={inputClass}
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="+971 50 000 0000"
                />
              </Field>
            </div>

            <Field label="Bio">
              <textarea
                className={`${inputClass} min-h-[80px] resize-y`}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Field>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4 accent-[#C9974C]"
              />
              Active
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b] disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save changes" : "Add agent"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
