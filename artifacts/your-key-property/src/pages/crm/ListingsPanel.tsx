import { useState } from "react";
import { toast } from "sonner";
import {
  useListListings,
  useListAgents,
  useListCommunities,
  useCreateListing,
  useUpdateListing,
  useDeleteListing,
  type Listing,
  type ListingInput,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, X, Star } from "lucide-react";
import { useCrmInvalidate, formatAed, Field, inputClass, selectClass } from "./shared";
import { storageUrl } from "../../lib/listingApi";

const PROPERTY_TYPES = [
  "apartment",
  "villa",
  "townhouse",
  "penthouse",
  "commercial",
  "studio",
];
const STATUSES = ["draft", "published", "sold", "rented", "archived"];

type FormState = {
  reference: string;
  title: string;
  description: string;
  propertyType: string;
  purpose: string;
  status: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  city: string;
  community: string;
  communityId: string;
  address: string;
  amenities: string;
  images: string[];
  featured: boolean;
  agentId: string;
};

const emptyForm: FormState = {
  reference: "",
  title: "",
  description: "",
  propertyType: "apartment",
  purpose: "sale",
  status: "published",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  city: "Dubai",
  community: "",
  communityId: "",
  address: "",
  amenities: "",
  images: [],
  featured: false,
  agentId: "",
};

function listingToForm(l: Listing): FormState {
  return {
    reference: l.reference ?? "",
    title: l.title,
    description: l.description ?? "",
    propertyType: l.propertyType ?? "apartment",
    purpose: l.purpose ?? "sale",
    status: l.status ?? "published",
    price: String(l.price ?? ""),
    bedrooms: l.bedrooms != null ? String(l.bedrooms) : "",
    bathrooms: l.bathrooms != null ? String(l.bathrooms) : "",
    area: l.area != null ? String(l.area) : "",
    city: l.city ?? "Dubai",
    community: l.community ?? "",
    communityId: l.communityId != null ? String(l.communityId) : "",
    address: l.address ?? "",
    amenities: (l.amenities ?? []).join(", "),
    images: l.images ?? [],
    featured: l.featured ?? false,
    agentId: l.agentId != null ? String(l.agentId) : "",
  };
}

function formToInput(f: FormState): ListingInput {
  const toInt = (v: string): number | undefined => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    reference: f.reference.trim() || undefined,
    title: f.title.trim(),
    description: f.description.trim() || undefined,
    propertyType: f.propertyType,
    purpose: f.purpose,
    status: f.status,
    price: toInt(f.price) ?? 0,
    bedrooms: toInt(f.bedrooms),
    bathrooms: toInt(f.bathrooms),
    area: toInt(f.area),
    city: f.city,
    community: f.community.trim() || undefined,
    communityId: f.communityId ? toInt(f.communityId) : undefined,
    address: f.address.trim() || undefined,
    amenities: f.amenities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    images: f.images,
    featured: f.featured,
    agentId: f.agentId ? toInt(f.agentId) : undefined,
  };
}

export function ListingsPanel() {
  const invalidate = useCrmInvalidate();
  const listingsQ = useListListings();
  const agentsQ = useListAgents();
  const agents = agentsQ.data ?? [];
  const communitiesQ = useListCommunities();
  const communities = communitiesQ.data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const createM = useCreateListing({
    mutation: {
      onSuccess: () => {
        invalidate("listings");
        toast.success("Listing created");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to create listing"),
    },
  });
  const updateM = useUpdateListing({
    mutation: {
      onSuccess: () => {
        invalidate("listings");
        toast.success("Listing updated");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to update listing"),
    },
  });
  const deleteM = useDeleteListing({
    mutation: {
      onSuccess: () => {
        invalidate("listings");
        toast.success("Listing deleted");
      },
      onError: (e) => toast.error(e.message || "Failed to delete listing"),
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
  function openEdit(l: Listing) {
    setEditing(l);
    setForm(listingToForm(l));
    setOpen(true);
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      const res = await uploadFile(file);
      if (res) {
        setForm((f) => ({ ...f, images: [...f.images, res.objectPath] }));
      }
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const input = formToInput(form);
    if (editing) {
      updateM.mutate({ id: editing.id, data: input });
    } else {
      createM.mutate({ data: input });
    }
  }

  const listings = listingsQ.data ?? [];
  const saving = createM.isPending || updateM.isPending;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Listings</h2>
          <p className="text-sm text-white/50">
            {listings.length} {listings.length === 1 ? "property" : "properties"}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          <Plus className="h-4 w-4" /> New listing
        </button>
      </div>

      {listingsQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 py-16 text-center text-white/50">
          No listings yet. Create your first property.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {listings.map((l) => (
                <tr key={l.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={storageUrl(l.images?.[0])}
                        alt=""
                        className="h-10 w-14 rounded object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-medium text-white">
                          {l.title}
                          {l.featured && (
                            <Star className="h-3.5 w-3.5 fill-[#C9974C] text-[#C9974C]" />
                          )}
                        </div>
                        <div className="text-xs text-white/40">
                          {l.community || l.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-white/70">
                    {l.propertyType}
                  </td>
                  <td className="px-4 py-3 capitalize text-white/70">
                    {l.purpose}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {formatAed(l.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs capitalize text-white/80">
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(l)}
                        className="rounded-md p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${l.title}"?`))
                            deleteM.mutate({ id: l.id });
                        }}
                        className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/15 bg-[#0A1628] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editing ? "Edit listing" : "New listing"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Modern Apartment with Marina Views"
                />
              </Field>
              <Field label="Reference">
                <input
                  className={inputClass}
                  value={form.reference}
                  onChange={(e) =>
                    setForm({ ...form, reference: e.target.value })
                  }
                  placeholder="YK-1024"
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[90px] resize-y`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Type">
                <select
                  className={selectClass}
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm({ ...form, propertyType: e.target.value })
                  }
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#0A1628] capitalize">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Purpose">
                <select
                  className={selectClass}
                  value={form.purpose}
                  onChange={(e) =>
                    setForm({ ...form, purpose: e.target.value })
                  }
                >
                  <option value="sale" className="bg-[#0A1628]">
                    Sale
                  </option>
                  <option value="rent" className="bg-[#0A1628]">
                    Rent
                  </option>
                  <option value="offplan" className="bg-[#0A1628]">
                    Off Plan
                  </option>
                </select>
              </Field>
              <Field label="Status">
                <select
                  className={selectClass}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-[#0A1628] capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Field label="Price (AED)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </Field>
              <Field label="Bedrooms">
                <input
                  type="number"
                  className={inputClass}
                  value={form.bedrooms}
                  onChange={(e) =>
                    setForm({ ...form, bedrooms: e.target.value })
                  }
                />
              </Field>
              <Field label="Bathrooms">
                <input
                  type="number"
                  className={inputClass}
                  value={form.bathrooms}
                  onChange={(e) =>
                    setForm({ ...form, bathrooms: e.target.value })
                  }
                />
              </Field>
              <Field label="Area (sqft)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="City">
                <select
                  className={selectClass}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option value="Dubai" className="bg-[#0A1628]">
                    Dubai
                  </option>
                  <option value="Abu Dhabi" className="bg-[#0A1628]">
                    Abu Dhabi
                  </option>
                </select>
              </Field>
              <Field label="Community">
                {communities.length > 0 ? (
                  <select
                    className={selectClass}
                    value={form.communityId}
                    onChange={(e) => {
                      const id = e.target.value;
                      const match = communities.find(
                        (c) => String(c.id) === id,
                      );
                      setForm({
                        ...form,
                        communityId: id,
                        community: match?.name ?? "",
                      });
                    }}
                  >
                    <option value="" className="bg-[#0A1628]">
                      Unassigned
                    </option>
                    {communities.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#0A1628]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={inputClass}
                    value={form.community}
                    onChange={(e) =>
                      setForm({ ...form, community: e.target.value })
                    }
                    placeholder="Dubai Marina"
                  />
                )}
              </Field>
              <Field label="Agent">
                <select
                  className={selectClass}
                  value={form.agentId}
                  onChange={(e) =>
                    setForm({ ...form, agentId: e.target.value })
                  }
                >
                  <option value="" className="bg-[#0A1628]">
                    Unassigned
                  </option>
                  {agents.map((a) => (
                    <option key={a.id} value={a.id} className="bg-[#0A1628]">
                      {a.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Address">
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Field>

            <Field label="Amenities (comma separated)">
              <input
                className={inputClass}
                value={form.amenities}
                onChange={(e) =>
                  setForm({ ...form, amenities: e.target.value })
                }
                placeholder="Swimming Pool, Gym, Covered Parking"
              />
            </Field>

            <Field label="Photos">
              <div className="space-y-3">
                {form.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.images.map((img, i) => (
                      <div key={img} className="group relative">
                        <img
                          src={storageUrl(img)}
                          alt=""
                          className="h-16 w-24 rounded object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              images: f.images.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="absolute -right-1.5 -top-1.5 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition group-hover:opacity-100"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9974C]">
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {isUploading ? "Uploading..." : "Add photos"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      void handleFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </Field>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="h-4 w-4 accent-[#C9974C]"
              />
              Feature on homepage
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
                {editing ? "Save changes" : "Create listing"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
