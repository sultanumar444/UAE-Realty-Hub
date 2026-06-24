import { useState } from "react";
import { toast } from "sonner";
import {
  useListCommunities,
  useCreateCommunity,
  useUpdateCommunity,
  useDeleteCommunity,
  type Community,
  type CommunityInput,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { useCrmInvalidate, Field, inputClass, selectClass, formatAed } from "./shared";
import { storageUrl } from "../../lib/listingApi";

type FormState = {
  name: string;
  slug: string;
  emirate: string;
  description: string;
  imageUrl: string;
  priceFrom: string;
  rentFrom: string;
  propertyTypes: string;
  featured: boolean;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  emirate: "Dubai",
  description: "",
  imageUrl: "",
  priceFrom: "",
  rentFrom: "",
  propertyTypes: "",
  featured: false,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function communityToForm(c: Community): FormState {
  return {
    name: c.name,
    slug: c.slug,
    emirate: c.emirate || "Dubai",
    description: c.description ?? "",
    imageUrl: c.imageUrl ?? "",
    priceFrom: c.priceFrom != null ? String(c.priceFrom) : "",
    rentFrom: c.rentFrom != null ? String(c.rentFrom) : "",
    propertyTypes: c.propertyTypes ?? "",
    featured: c.featured ?? false,
  };
}

function formToInput(f: FormState): CommunityInput {
  const toInt = (v: string): number | undefined => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    name: f.name.trim(),
    slug: (f.slug.trim() || slugify(f.name)).trim(),
    emirate: f.emirate,
    description: f.description.trim() || undefined,
    imageUrl: f.imageUrl || undefined,
    priceFrom: toInt(f.priceFrom),
    rentFrom: toInt(f.rentFrom),
    propertyTypes: f.propertyTypes.trim() || undefined,
    featured: f.featured,
  };
}

export function CommunitiesPanel() {
  const invalidate = useCrmInvalidate();
  const communitiesQ = useListCommunities();
  const communities = communitiesQ.data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Community | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const createM = useCreateCommunity({
    mutation: {
      onSuccess: () => {
        invalidate("communities");
        toast.success("Community added");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to add community"),
    },
  });
  const updateM = useUpdateCommunity({
    mutation: {
      onSuccess: () => {
        invalidate("communities");
        toast.success("Community updated");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to update community"),
    },
  });
  const deleteM = useDeleteCommunity({
    mutation: {
      onSuccess: () => {
        invalidate("communities");
        invalidate("listings");
        toast.success("Community removed");
      },
      onError: (e) => toast.error(e.message || "Failed to remove community"),
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
  function openEdit(c: Community) {
    setEditing(c);
    setForm(communityToForm(c));
    setOpen(true);
  }

  async function handleImage(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res) setForm((f) => ({ ...f, imageUrl: res.objectPath }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
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
          <h2 className="text-xl font-semibold text-white">Communities</h2>
          <p className="text-sm text-white/50">
            {communities.length}{" "}
            {communities.length === 1 ? "community" : "communities"}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          <Plus className="h-4 w-4" /> Add community
        </button>
      </div>

      {communitiesQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : communities.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 py-16 text-center text-white/50">
          No communities yet. Add your first neighbourhood.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c) => (
            <div
              key={c.id}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-36">
                <img
                  src={storageUrl(c.imageUrl)}
                  alt={c.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 rounded-full bg-[#0A1628]/80 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
                  {c.emirate}
                </div>
                {c.featured && (
                  <div className="absolute right-3 top-3">
                    <Star className="h-4 w-4 fill-[#C9974C] text-[#C9974C]" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-medium text-white">{c.name}</div>
                {c.propertyTypes && (
                  <div className="mt-0.5 text-xs text-[#C9974C]">
                    {c.propertyTypes}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                  {c.priceFrom != null && (
                    <span>Buy from {formatAed(c.priceFrom)}</span>
                  )}
                  {c.rentFrom != null && (
                    <span>Rent from {formatAed(c.rentFrom)}/yr</span>
                  )}
                </div>
                <div className="mt-3 flex justify-end gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="rounded-md p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label="Edit community"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${c.name}?`))
                        deleteM.mutate({ id: c.id });
                    }}
                    className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                    aria-label="Remove community"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/15 bg-[#0A1628] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editing ? "Edit community" : "Add community"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={storageUrl(form.imageUrl)}
                alt=""
                className="h-16 w-24 rounded object-cover"
              />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9974C]">
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isUploading ? "Uploading..." : "Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    void handleImage(e.target.files);
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
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                      slug:
                        !editing && f.slug === slugify(f.name)
                          ? slugify(e.target.value)
                          : f.slug,
                    }))
                  }
                  placeholder="Dubai Marina"
                />
              </Field>
              <Field label="Slug">
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="dubai-marina"
                />
              </Field>
              <Field label="Emirate">
                <select
                  className={selectClass}
                  value={form.emirate}
                  onChange={(e) =>
                    setForm({ ...form, emirate: e.target.value })
                  }
                >
                  <option value="Dubai" className="bg-[#0A1628]">
                    Dubai
                  </option>
                  <option value="Abu Dhabi" className="bg-[#0A1628]">
                    Abu Dhabi
                  </option>
                </select>
              </Field>
              <Field label="Property types">
                <input
                  className={inputClass}
                  value={form.propertyTypes}
                  onChange={(e) =>
                    setForm({ ...form, propertyTypes: e.target.value })
                  }
                  placeholder="Apartments, Penthouses"
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[80px] resize-y`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Buy from (AED / sqft)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.priceFrom}
                  onChange={(e) =>
                    setForm({ ...form, priceFrom: e.target.value })
                  }
                />
              </Field>
              <Field label="Rent from (AED / yr)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.rentFrom}
                  onChange={(e) =>
                    setForm({ ...form, rentFrom: e.target.value })
                  }
                />
              </Field>
            </div>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="h-4 w-4 accent-[#C9974C]"
              />
              Featured community
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
                {editing ? "Save changes" : "Add community"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
