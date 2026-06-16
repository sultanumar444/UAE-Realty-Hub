import { useState } from "react";
import { toast } from "sonner";
import {
  useListPosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useListAgents,
  type Post,
  type PostInput,
} from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";
import { useCrmInvalidate, Field, inputClass, selectClass } from "./shared";
import { postCover, formatPostDate, slugify } from "../../lib/blogApi";

type FormState = {
  title: string;
  slug: string;
  slugTouched: boolean;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  authorId: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  slugTouched: false,
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: "",
  status: "draft",
  seoTitle: "",
  seoDescription: "",
  authorId: "",
};

function postToForm(p: Post): FormState {
  return {
    title: p.title,
    slug: p.slug,
    slugTouched: true,
    excerpt: p.excerpt ?? "",
    content: p.content ?? "",
    coverImage: p.coverImage ?? "",
    category: p.category ?? "",
    tags: p.tags.join(", "),
    status: p.status,
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
    authorId: p.authorId != null ? String(p.authorId) : "",
  };
}

function formToInput(f: FormState): PostInput {
  const tags = f.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    title: f.title.trim(),
    slug: f.slug.trim(),
    excerpt: f.excerpt.trim() || undefined,
    content: f.content.trim() || undefined,
    coverImage: f.coverImage || undefined,
    category: f.category.trim() || undefined,
    tags: tags.length ? tags : undefined,
    status: f.status,
    seoTitle: f.seoTitle.trim() || undefined,
    seoDescription: f.seoDescription.trim() || undefined,
    authorId: f.authorId ? Number(f.authorId) : null,
  };
}

export function PostsPanel() {
  const invalidate = useCrmInvalidate();
  const postsQ = useListPosts();
  const posts = postsQ.data ?? [];
  const agentsQ = useListAgents();
  const agents = agentsQ.data ?? [];

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const createM = useCreatePost({
    mutation: {
      onSuccess: () => {
        invalidate("posts");
        toast.success("Post created");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to create post"),
    },
  });
  const updateM = useUpdatePost({
    mutation: {
      onSuccess: () => {
        invalidate("posts");
        toast.success("Post updated");
        setOpen(false);
      },
      onError: (e) => toast.error(e.message || "Failed to update post"),
    },
  });
  const deleteM = useDeletePost({
    mutation: {
      onSuccess: () => {
        invalidate("posts");
        toast.success("Post deleted");
      },
      onError: (e) => toast.error(e.message || "Failed to delete post"),
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
  function openEdit(p: Post) {
    setEditing(p);
    setForm(postToForm(p));
    setOpen(true);
  }

  function setTitle(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slugTouched ? f.slug : slugify(title),
    }));
  }

  async function handleCover(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res) setForm((f) => ({ ...f, coverImage: res.objectPath }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
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
          <h2 className="text-xl font-semibold text-white">Insights</h2>
          <p className="text-sm text-white/50">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C9974C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition hover:bg-[#b8863b]"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      {postsQ.isLoading ? (
        <div className="flex justify-center py-16 text-white/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 py-16 text-center text-white/50">
          No posts yet. Create your first insight article.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <img
                src={postCover(p)}
                alt={p.title}
                className="h-16 w-24 flex-shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white">
                    {p.title}
                  </span>
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
                  {p.category ? `${p.category} · ` : ""}
                  {p.status === "published"
                    ? formatPostDate(p.publishedAt)
                    : "Draft"}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(p)}
                  className="rounded-md p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Edit post"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"?`))
                      deleteM.mutate({ id: p.id });
                  }}
                  className="rounded-md p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Delete post"
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
              {editing ? "Edit post" : "New post"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Title">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dubai Market Outlook 2026"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  placeholder="dubai-market-outlook-2026"
                />
              </Field>
              <Field label="Category">
                <input
                  className={inputClass}
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="Market Insights"
                />
              </Field>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/5">
                {form.coverImage ? (
                  <img
                    src={postCover({ coverImage: form.coverImage })}
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
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {isUploading ? "Uploading..." : "Cover image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    void handleCover(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <Field label="Excerpt">
              <textarea
                className={`${inputClass} min-h-[60px] resize-y`}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="A short summary shown on the blog index and in search results."
              />
            </Field>

            <Field label="Content">
              <textarea
                className={`${inputClass} min-h-[220px] resize-y`}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write the article. Leave a blank line between paragraphs."
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Tags (comma separated)">
                <input
                  className={inputClass}
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Dubai, Investment, DIFC"
                />
              </Field>
              <Field label="Author">
                <select
                  className={selectClass}
                  value={form.authorId}
                  onChange={(e) =>
                    setForm({ ...form, authorId: e.target.value })
                  }
                >
                  <option value="">No author</option>
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

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
                  placeholder="Defaults to the post title"
                />
              </Field>
              <Field label="SEO description">
                <textarea
                  className={`${inputClass} min-h-[60px] resize-y`}
                  value={form.seoDescription}
                  onChange={(e) =>
                    setForm({ ...form, seoDescription: e.target.value })
                  }
                  placeholder="Meta description for search engines (defaults to excerpt)."
                />
              </Field>
            </div>

            <Field label="Status">
              <select
                className={selectClass}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>

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
                {editing ? "Save changes" : "Create post"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
