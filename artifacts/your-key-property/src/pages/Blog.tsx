import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useListPosts } from "@workspace/api-client-react";
import { postCover, formatPostDate, excerptFrom } from "@/lib/blogApi";
import { useSeo } from "@/lib/useSeo";
import { Loader2 } from "lucide-react";

export function Blog() {
  useSeo({
    title: "Insights & Market Intelligence",
    description:
      "Expert analysis, market trends, and investment guidance for Dubai and Abu Dhabi real estate from the Your Key Property Management team.",
  });

  const postsQ = useListPosts({ status: "published" });
  const posts = postsQ.data ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary mb-4">
              Insights
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">
              Market Intelligence
            </h1>
            <p className="mt-4 max-w-2xl text-white/60">
              Perspectives on the Dubai and Abu Dhabi property markets — trends,
              neighbourhood guides, and investment strategy from our advisors.
            </p>
          </div>

          {postsQ.isLoading ? (
            <div className="flex justify-center py-24 text-white/50">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-white/15 py-24 text-center text-white/50">
              No articles published yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group h-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition hover:border-secondary/50">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={postCover(post)}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-white/50">
                        {post.category && (
                          <span className="text-secondary">{post.category}</span>
                        )}
                        <span>{formatPostDate(post.publishedAt)}</span>
                      </div>
                      <h2 className="font-serif text-xl font-bold text-white transition group-hover:text-secondary">
                        {post.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm text-white/60">
                        {excerptFrom(post)}
                      </p>
                      <span className="mt-4 inline-block text-xs font-mono uppercase tracking-widest text-secondary">
                        Read article →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
