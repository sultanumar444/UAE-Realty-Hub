import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useProperties } from "@/lib/useProperties";
import { useCurrency } from "@/lib/currency";
import { motion } from "framer-motion";

const FALLBACK_PROJECTS = [
  { image: "/images/render-marina.png", title: "Marina Heights", developer: "Emaar", location: "Dubai Marina", price: 1200000, handover: "Q4 2026", roi: "7-9%" },
  { image: "/images/render-saadiyat.png", title: "Saadiyat Lagoons", developer: "Aldar", location: "Saadiyat Island", price: 2800000, handover: "Q2 2027", roi: "6-8%" },
  { image: "/images/render-yas.png", title: "Yas Bay Residences", developer: "Aldar", location: "Yas Island", price: 980000, handover: "Q1 2027", roi: "8-10%" },
  { image: "/images/dubai-skyline.png", title: "Downtown Views III", developer: "Emaar", location: "Downtown Dubai", price: 1800000, handover: "Q3 2026", roi: "7%" },
  { image: "/images/abudhabi-skyline.png", title: "Reem Hills", developer: "Aldar", location: "Al Reem Island", price: 1500000, handover: "Q1 2026", roi: "6%" },
  { image: "/images/luxury-villa.png", title: "Damac Lagoons", developer: "Damac", location: "Dubai", price: 2100000, handover: "Q4 2025", roi: "8%" },
];

export function OffPlan() {
  const { formatPrice } = useCurrency();
  const { properties } = useProperties();
  const [emirateFilter, setEmirateFilter] = useState<"all" | "Dubai" | "Abu Dhabi">("all");

  const offPlan = properties.filter((p) => p.status === "OFF PLAN");
  const visible =
    emirateFilter === "all"
      ? offPlan
      : offPlan.filter((p) => p.emirate === emirateFilter);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Future Altitudes</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">Off-Plan Properties</h1>
            <p className="text-lg text-white/70 font-mono">Towers under construction in Dubai &amp; Abu Dhabi</p>
          </div>

          {offPlan.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-4 mb-12 glass-panel p-4">
                {([
                  { id: "all", label: "All Projects" },
                  { id: "Dubai", label: "Dubai" },
                  { id: "Abu Dhabi", label: "Abu Dhabi" },
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
                Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <PropertyCard
                      id={p.id}
                      image={p.image}
                      status={p.status}
                      price={formatPrice(p.price)}
                      title={p.title}
                      location={p.location}
                      community={p.community}
                      agentName={p.agent?.name}
                      beds={p.beds === 0 ? "Studio" : p.beds}
                      baths={p.baths}
                      sqft={p.sqft}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FALLBACK_PROJECTS.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProjectCard {...proj} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}
