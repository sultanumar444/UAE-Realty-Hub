import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OffPlanProjectCard } from "@/components/shared/OffPlanProjectCard";
import { useListOffPlanProjects } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";

export function OffPlan() {
  const { t } = useLanguage();
  const projectsQ = useListOffPlanProjects({ status: "published" });
  const [emirateFilter, setEmirateFilter] = useState<"all" | "Dubai" | "Abu Dhabi">("all");

  const projects = projectsQ.data ?? [];
  const visible =
    emirateFilter === "all"
      ? projects
      : projects.filter((p) => p.emirate === emirateFilter);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("Future Altitudes")}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">{t("Off-Plan Properties")}</h1>
            <p className="text-lg text-white/70 font-mono">{t("Towers under construction in Dubai & Abu Dhabi")}</p>
          </div>

          {projectsQ.isLoading ? (
            <p className="text-white/50 font-mono text-sm">{t("Loading...")}</p>
          ) : projects.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-4 mb-12 glass-panel p-4">
                {([
                  { id: "all", label: t("All Projects") },
                  { id: "Dubai", label: t("Dubai") },
                  { id: "Abu Dhabi", label: t("Abu Dhabi") },
                ] as const).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setEmirateFilter(f.id)}
                    className={`px-6 py-2 text-xs font-mono uppercase tracking-widest transition-colors border ${
                      emirateFilter === f.id
                        ? "bg-secondary text-[#0A1628] font-bold border-secondary"
                        : "bg-white/5 text-white hover:bg-white/10 border-white/20"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="mb-8 text-xs font-mono uppercase tracking-widest text-white/60">
                {t("Showing")} {visible.length} {visible.length === 1 ? t("project") : t("projects")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <OffPlanProjectCard project={p} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white/50 font-mono text-sm">{t("New off-plan projects will be announced shortly.")}</p>
          )}
        </div>
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}
