import { MapPin } from "lucide-react";
import { Link } from "wouter";
import type { OffPlanProject } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language";
import { projectHero } from "@/lib/offPlanApi";

export function OffPlanProjectCard({ project }: { project: OffPlanProject }) {
  const { t } = useLanguage();

  const unitTags = (project.unitTypes ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link href={`/off-plan/${project.slug}`}>
      <div className="group glass-card overflow-hidden flex flex-col h-full cursor-pointer">
        <div className="relative h-60 overflow-hidden">
          <img
            src={projectHero(project)}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent opacity-60" />
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
            {project.paymentPlan && (
              <span className="bg-white/95 text-[#0A1628] text-[10px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow">
                {project.paymentPlan} {t("payment plan")}
              </span>
            )}
            {project.handover && (
              <span className="bg-secondary text-white text-[10px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow">
                {t("Handover")} {project.handover}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow bg-[#0A1628]/60">
          <h3 className="font-serif font-bold text-xl text-white mb-2 line-clamp-1">{project.name}</h3>
          <div className="flex items-center gap-2 text-white/55 font-mono text-[11px] uppercase tracking-wider mb-5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="truncate">
              {[project.location || project.community, project.emirate].filter(Boolean).join(", ")}
            </span>
          </div>

          {unitTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {unitTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-secondary/50 text-secondary text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
