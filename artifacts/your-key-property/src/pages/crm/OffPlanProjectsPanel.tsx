import { useState } from "react";
import { toast } from "sonner";
import {
  useListOffPlanProjects,
  useCreateOffPlanProject,
  useUpdateOffPlanProject,
  useDeleteOffPlanProject,
  type OffPlanProject,
  type OffPlanProjectInput,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, ImageIcon, X } from "lucide-react";
import { useCrmInvalidate, Field, inputClass, selectClass } from "./shared";
import { slugify } from "../../lib/blogApi";
import { projectHero, projectImage } from "../../lib/offPlanApi";

type FormState = {
  name: string;
  slug: string;
  slugTouched: boolean;
  developer: string;
  emirate: string;
  location: string;
  community: string;
  tagline: string;
  description: string;
  heroImage: string;
  logoImage: string;
  gallery: string[];
  amenities: string;
  highlights: string;
  startingPrice: string;
  handover: string;
  paymentPlan: string;
  bedrooms: string;
  unitTypes: string;
  brochureUrl: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: string;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  slugTouched: false,
  developer: "",
  emirate: "Dubai",
  location: "",
  community: "",
  tagline: "",
  description: "",
  heroImage: "",
  logoImage: "",
  gallery: [],
  amenities: "",
  highlights: "",
  startingPrice: "",
  handover: "",
  paymentPlan: "",
  bedrooms: "",
  unitTypes: "",
  brochureUrl: "",
  seoTitle: "",
  seoDescription: "",
  featured: false,
  status: "draft",
};

function projectToForm(p: OffPlanProject): FormState {
  return {
    name: p.name,
    slug: p.slug,
    slugTouched: true,
    developer: p.developer ?? "",
    emirate: p.emirate || "Dubai",
    location: p.location ?? "",
    community: p.community ?? "",
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    heroImage: p.heroImage ?? "",
    logoImage: p.logoImage ?? "",
    gallery: p.gallery ?? [],
    amenities: p.amenities.join(", "),
    highlights: p.highlights.join("\n"),
    startingPrice: p.startingPrice != null ? String(p.startingPrice) : "",
    handover: p.handover ?? "",
    paymentPlan: p.paymentPlan ?? "",
    bedrooms: p.bedrooms ?? "",
    unitTypes: p.unitTypes ?? "",
    brochureUrl: p.brochureUrl ?? "",
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
    featured: p.featured,
    status: p.status,
  };
}

function splitList(value: string, sep: "," | "\n"): string[] {
  return value
    .split(sep === "," ? /,/ : /\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function formToInput(f: FormState): OffPlanProjectInput {
  const amenities = splitList(f.amenities, ",");
  const highlights = splitList(f.highlights, "\n");
  const price = f.startingPrice.trim() ? Number(f.startingPrice) : null;
  return {
    name: f.name.trim(),
    slug: f.slug.trim(),
    developer: f.developer.trim() || undefined,
    emirate: f.emirate || "Dubai",
    location: f.location.trim() || undefined,
    community: f.community.trim() || undefined,
    tagline: f.tagline.trim() || undefined,
    description: f.description.trim() || undefined,
    heroImage: f.heroImage || undefined,
    logoImage: f.logoImage || undefined,
    gallery: f.gallery.length ? f.gallery : undefined,
    amenities: amenities.length ? amenities : undefined,
    highlights: highlights.length ? highlights : undefined,
    startingPrice: price != null && Number.isFinite(price) ? price : null,
    handover: f.handover.trim() || undefined,
    paymentPlan: f.paymentPlan.trim() || undefined,
    bedrooms: f.bedrooms.trim() || undefined,
    unitTypes: f.unitTypes.trim() || undefined,
    brochureUrl: f.brochureUrl.trim() || undefined,
    seoTitle: f.seoTitle.trim() || undefined,
    seoDescription: f.seoDescription.trim() || undefined,
    featured: f.featured,
    status: f.status,
  };
}

export function OffPlanProjectsPanel() {
  const invalidate = useCrmInvalidate();
  const projectsQ = useListOffPlanProjects();
  const projects = projectsQ.data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<OffPlanProject | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const createM = useCreateOffPlanProject({
    mutation: {
      onSuccess: () => {
        invalidate("offPlanProjects");
        toast.success("Project created");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to create project"),
    },
  });
  const updateM = useUpdateOffPlanProject({
    mutation: {
      onSuccess: () => {
        invalidate("offPlanProjects");
        toast.success("Project updated");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to update project"),
    },
  });
  const deleteM = useDeleteOffPlanProject({
    mutation: {
      onSuccess: () => {
        invalidate("offPlanProjects");
        toast.success("Project deleted");
      },
      onError: (e) => toast.error(e.message || "Failed to delete project"),
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
  function openEdit(p: OffPlanProject) {
    setEditing(p);
    setForm(projectToForm(p));
    setOpen(true);
  }

  function setName(name: string) {
    setForm((f) => ({
      ...f,
      name,
      slug: f.slugTouched ? f.slug : slugify(name),
    }));
  }

  async function handleSingle(
    files: FileList | null,
    key: "heroImage" | "logoImage",
  ) {
    const file = files?.[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res) setForm((f) => ({ ...f, [key]: res.objectPath }));
  }

  async function handleGallery(files: FileList | null) {
    if (!files || files.length === 0) return;
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const res = await uploadFile(file);
      if (res) uploaded.push(res.objectPath);
    }
    if (uploaded.length)
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...uploaded] }));
  }

  function removeGalleryAt(idx: number) {
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error("Name and slug are required");
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
          <h2 className="text-xl font-semibold text-white">Off-Plan Projects</h2>
          <p className="text-sm text-white/50">
            {projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          <Plus className="h-4 w-4" /> New project
        </button>
      </div>

      {projectsQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 py-16 text-center text-white/50">
          No off-plan projects yet. Create your first project.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <img
                src={projectHero(p)}
                alt={p.name}
                className="h-16 w-24 flex-shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white">
                    {p.name}
                  </span>
                  {p.featured && (
                    <span className="rounded-full bg-[#C9974C]/20 px-2 py-0.5 text-[10px] uppercase text-[#C9974C]">
                      Featured
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase ${
                      p.status === "published"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="truncate text-xs text-white/50">/{p.slug}</div>
                <div className="text-xs text-white/40">
                  {[p.developer, p.location || p.community, p.emirate]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(p)}
                  className="rounded-md p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Edit project"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.name}"?`))
                      deleteM.mutate({ id: p.id });
                  }}
                  className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Delete project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/15 bg-[#0A1628] text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editing ? "Edit project" : "New project"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Project name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Opula Residences"
                />
              </Field>
              <Field label="Slug">
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: slugify(e.target.value),
                      slugTouched: true,
                    })
                  }
                  placeholder="opula-residences"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Developer">
                <input
                  className={inputClass}
                  value={form.developer}
                  onChange={(e) =>
                    setForm({ ...form, developer: e.target.value })
                  }
                  placeholder="Aldar"
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
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Location / area">
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Yas Bay"
                />
              </Field>
              <Field label="Community (optional)">
                <input
                  className={inputClass}
                  value={form.community}
                  onChange={(e) =>
                    setForm({ ...form, community: e.target.value })
                  }
                  placeholder="Yas Island"
                />
              </Field>
            </div>

            <Field label="Tagline">
              <input
                className={inputClass}
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Waterfront living on Yas Island"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
                  Hero image
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/5">
                    {form.heroImage ? (
                      <img
                        src={projectImage(form.heroImage)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/30">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9974C]">
                    <Plus className="h-4 w-4" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        void handleSingle(e.target.files, "heroImage");
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
                  Developer logo (optional)
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/5">
                    {form.logoImage ? (
                      <img
                        src={projectImage(form.logoImage)}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/30">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-[#C9974C]">
                    <Plus className="h-4 w-4" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        void handleSingle(e.target.files, "logoImage");
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                  Gallery
                </span>
                {isUploading && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-white/50" />
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {form.gallery.map((path, idx) => (
                  <div
                    key={`${path}-${idx}`}
                    className="group relative h-20 w-28 overflow-hidden rounded-md border border-white/10 bg-white/5"
                  >
                    <img
                      src={projectImage(path)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryAt(idx)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white/80 transition hover:bg-red-500/80 hover:text-white"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="inline-flex h-20 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-white/20 bg-white/5 text-xs text-white/60 transition hover:border-[#C9974C]">
                  <Plus className="h-5 w-5" /> Add
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => {
                      void handleGallery(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>

            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[140px] resize-y`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the project. Leave a blank line between paragraphs."
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Starting price (AED)">
                <input
                  className={inputClass}
                  type="number"
                  min="0"
                  value={form.startingPrice}
                  onChange={(e) =>
                    setForm({ ...form, startingPrice: e.target.value })
                  }
                  placeholder="980000"
                />
              </Field>
              <Field label="Handover">
                <input
                  className={inputClass}
                  value={form.handover}
                  onChange={(e) =>
                    setForm({ ...form, handover: e.target.value })
                  }
                  placeholder="Q2 2027"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Payment plan">
                <input
                  className={inputClass}
                  value={form.paymentPlan}
                  onChange={(e) =>
                    setForm({ ...form, paymentPlan: e.target.value })
                  }
                  placeholder="60 / 40"
                />
              </Field>
              <Field label="Bedrooms">
                <input
                  className={inputClass}
                  value={form.bedrooms}
                  onChange={(e) =>
                    setForm({ ...form, bedrooms: e.target.value })
                  }
                  placeholder="Studio - 4 BR"
                />
              </Field>
            </div>

            <Field label="Unit types">
              <input
                className={inputClass}
                value={form.unitTypes}
                onChange={(e) =>
                  setForm({ ...form, unitTypes: e.target.value })
                }
                placeholder="Apartments, Townhouses, Penthouses"
              />
            </Field>

            <Field label="Amenities (comma separated)">
              <input
                className={inputClass}
                value={form.amenities}
                onChange={(e) =>
                  setForm({ ...form, amenities: e.target.value })
                }
                placeholder="Infinity Pool, Private Beach, Gym, Concierge"
              />
            </Field>

            <Field label="Highlights (one per line)">
              <textarea
                className={`${inputClass} min-h-[90px] resize-y`}
                value={form.highlights}
                onChange={(e) =>
                  setForm({ ...form, highlights: e.target.value })
                }
                placeholder={"Direct beach access\nBranded residences\n5 minutes to F1 circuit"}
              />
            </Field>

            <Field label="Brochure URL (optional)">
              <input
                className={inputClass}
                value={form.brochureUrl}
                onChange={(e) =>
                  setForm({ ...form, brochureUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </Field>

            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wide text-white/50">
                SEO
              </p>
              <Field label="SEO title">
                <input
                  className={inputClass}
                  value={form.seoTitle}
                  onChange={(e) =>
                    setForm({ ...form, seoTitle: e.target.value })
                  }
                  placeholder="Defaults to the project name"
                />
              </Field>
              <Field label="SEO description">
                <textarea
                  className={`${inputClass} min-h-[60px] resize-y`}
                  value={form.seoDescription}
                  onChange={(e) =>
                    setForm({ ...form, seoDescription: e.target.value })
                  }
                  placeholder="Meta description for search engines."
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Status">
                <select
                  className={selectClass}
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
              <label className="flex items-center gap-3 self-end pb-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="h-4 w-4 accent-[#C9974C]"
                />
                <span className="text-sm text-white/80">
                  Feature on homepage
                </span>
              </label>
            </div>

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
                {editing ? "Save changes" : "Create project"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
