import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useListOffPlanProjects } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language";
import { useCurrency } from "@/lib/currency";
import { projectHero } from "@/lib/offPlanApi";

export function OffPlanShowcase() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const projectsQ = useListOffPlanProjects({ status: "published" });
  const projects = projectsQ.data ?? [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = projects.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), 6000);
    return () => clearInterval(id);
  }, [paused, total]);

  if (projects.length === 0) return null;

  const safeIndex = ((index % total) + total) % total;
  const project = projects[safeIndex];

  const go = (dir: 1 | -1) => setIndex((i) => i + dir);

  const startingPrice =
    project.startingPrice && project.startingPrice > 0
      ? formatPrice(project.startingPrice)
      : null;

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">
            {t("L30 · Signature Projects")}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">
            {t("Off-Plan Projects")}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm">
            {t("Explore the UAE's most anticipated new developments, handpicked by Your Key.")}
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[520px] w-full md:h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={projectHero(project)}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Developer name */}
            <div className="absolute left-6 top-6 z-10 md:left-10 md:top-10">
              {project.developer ? (
                <span className="font-serif text-lg font-bold uppercase tracking-[0.2em] text-white drop-shadow">
                  {project.developer}
                </span>
              ) : null}
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-12">
              <motion.div
                key={`content-${project.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-2xl"
              >
                {(project.location || project.community) && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5 text-secondary" />
                    {[project.location || project.community, project.emirate]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}

                <h3 className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
                  {project.name}
                </h3>

                {project.tagline && (
                  <p className="mt-3 font-serif text-lg text-white/80 md:text-xl">
                    {project.tagline}
                  </p>
                )}

                {project.description && (
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 line-clamp-3 md:text-base">
                    {project.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-white">
                  {startingPrice && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        {t("Starting From")}
                      </div>
                      <div className="font-serif text-xl font-bold text-secondary">
                        {startingPrice}
                      </div>
                    </div>
                  )}
                  {project.handover && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        {t("Handover")}
                      </div>
                      <div className="font-serif text-xl font-bold">
                        {project.handover}
                      </div>
                    </div>
                  )}
                  {project.paymentPlan && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        {t("Payment Plan")}
                      </div>
                      <div className="font-serif text-xl font-bold">
                        {project.paymentPlan}
                      </div>
                    </div>
                  )}
                </div>

                <Link href={`/off-plan/${project.slug}`}>
                  <button className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0A1628] transition hover:bg-secondary">
                    {t("Explore More")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Carousel controls + counter */}
            {total > 1 && (
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4 md:bottom-12 md:right-12">
                <button
                  onClick={() => go(-1)}
                  aria-label={t("Previous project")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-secondary hover:bg-secondary hover:text-[#0A1628]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label={t("Next project")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-secondary hover:bg-secondary hover:text-[#0A1628]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="ml-2 font-mono text-sm tracking-widest text-white">
                  <span className="text-secondary">
                    {String(safeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/50"> / {String(total).padStart(2, "0")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
