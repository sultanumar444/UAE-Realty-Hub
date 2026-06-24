import { useParams, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  useGetPostBySlug,
  useListPosts,
  getGetPostBySlugQueryKey,
} from "@workspace/api-client-react";
import { postCover, formatPostDate, readingTime, excerptFrom } from "@/lib/blogApi";
import { useSeo } from "@/lib/useSeo";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";

export function BlogPost() {
  const params = useParams();
  const slug = params.slug || "";
  const postQ = useGetPostBySlug(slug, {
    query: {
      enabled: Boolean(slug),
      queryKey: getGetPostBySlugQueryKey(slug),
    },
  });
  const post = postQ.data;

  const relatedQ = useListPosts({ status: "published" });
  const related = (relatedQ.data ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  useSeo({
    title: post ? post.seoTitle || post.title : "Article",
    description: post
      ? post.seoDescription || excerptFrom(post)
      : undefined,
    image: post ? postCover(post) : undefined,
    type: "article",
  });

  if (postQ.isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative z-10">
          <Loader2 className="h-7 w-7 animate-spin text-white/50" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post || post.status !== "published") {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative z-10">
          <div className="text-center glass-panel p-12">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              Article Not Found
            </h1>
            <Link href="/blog">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-mono uppercase tracking-widest">
                Back to Insights
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog">
              <span className="mb-8 inline-flex cursor-pointer items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/60 transition hover:text-secondary">
                <ArrowLeft className="h-4 w-4" /> All Insights
              </span>
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-white/50">
              {post.category && (
                <span className="text-secondary">{post.category}</span>
              )}
              <span>{formatPostDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{readingTime(post.content)} min read</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white">
              {post.title}
            </h1>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl">
            <img
              src={postCover(post)}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            {post.excerpt && (
              <p className="mb-8 border-l-2 border-secondary pl-5 text-lg font-serif italic text-white/80">
                {post.excerpt}
              </p>
            )}
            <div className="whitespace-pre-line text-base leading-relaxed text-white/75">
              {post.content}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-mono text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div className="mx-auto mt-20 max-w-5xl border-t border-white/10 pt-12">
              <h2 className="mb-8 font-serif text-2xl font-bold text-white">
                More insights
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`}>
                    <div className="group cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition hover:border-secondary/50">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={postCover(r)}
                          alt={r.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-base font-bold text-white transition group-hover:text-secondary">
                          {r.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
