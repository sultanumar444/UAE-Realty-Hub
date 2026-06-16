import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { motion } from "framer-motion";

export function OffPlan() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Future Altitudes</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">Off-Plan Properties</h1>
            <p className="text-lg text-white/70 font-mono">Towers under construction in Dubai & Abu Dhabi</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-12 glass-panel p-4">
            <button className="px-6 py-2 bg-secondary text-[#0A1628] text-xs font-mono uppercase tracking-widest font-bold">All Projects</button>
            <button className="px-6 py-2 bg-white/5 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors">Dubai</button>
            <button className="px-6 py-2 bg-white/5 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors">Abu Dhabi</button>
            <button className="px-6 py-2 bg-white/5 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors">Emaar</button>
            <button className="px-6 py-2 bg-white/5 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors">Aldar</button>
            <button className="px-6 py-2 bg-white/5 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors">Damac</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: "/images/render-marina.png", title: "Marina Heights", developer: "Emaar", location: "Dubai Marina", price: 1200000, handover: "Q4 2026", roi: "7-9%" },
              { image: "/images/render-saadiyat.png", title: "Saadiyat Lagoons", developer: "Aldar", location: "Saadiyat Island", price: 2800000, handover: "Q2 2027", roi: "6-8%" },
              { image: "/images/render-yas.png", title: "Yas Bay Residences", developer: "Aldar", location: "Yas Island", price: 980000, handover: "Q1 2027", roi: "8-10%" },
              { image: "/images/dubai-skyline.png", title: "Downtown Views III", developer: "Emaar", location: "Downtown Dubai", price: 1800000, handover: "Q3 2026", roi: "7%" },
              { image: "/images/abudhabi-skyline.png", title: "Reem Hills", developer: "Aldar", location: "Al Reem Island", price: 1500000, handover: "Q1 2026", roi: "6%" },
              { image: "/images/luxury-villa.png", title: "Damac Lagoons", developer: "Damac", location: "Dubai", price: 2100000, handover: "Q4 2025", roi: "8%" }
            ].map((proj, i) => (
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
        </div>
      </main>
      
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}