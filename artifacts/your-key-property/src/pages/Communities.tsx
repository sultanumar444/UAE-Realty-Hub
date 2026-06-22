import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCurrency } from "@/lib/currency";
import { storageUrl } from "@/lib/listingApi";
import { useProperties } from "@/lib/useProperties";
import { useListCommunities } from "@workspace/api-client-react";
import { motion } from "framer-motion";

type CommunityCard = {
  name: string;
  em: string;
  img: string;
  desc: string;
  priceBuy: number | null;
  priceRent: number | null;
  types: string;
};

const FALLBACK_COMMUNITIES: CommunityCard[] = [
  { name: "Dubai Marina", em: "Dubai", img: "/images/dubai-skyline.png", desc: "A vibrant waterfront community known for its high-rise towers, luxury yachts, and bustling promenade.", priceBuy: 1500, priceRent: 120000, types: "Apartments, Penthouses" },
  { name: "Downtown Dubai", em: "Dubai", img: "/images/luxury-villa.png", desc: "The center of now, featuring the Burj Khalifa, Dubai Mall, and premium luxury residences.", priceBuy: 2200, priceRent: 150000, types: "Apartments, Penthouses" },
  { name: "Palm Jumeirah", em: "Dubai", img: "/images/modern-apartment.png", desc: "World-famous man-made island offering ultra-luxury villas and beachfront apartments.", priceBuy: 3500, priceRent: 250000, types: "Villas, Apartments" },
  { name: "Business Bay", em: "Dubai", img: "/images/penthouse.png", desc: "A central business and residential district along the Dubai Canal.", priceBuy: 1300, priceRent: 95000, types: "Apartments, Commercial" },
  { name: "JBR", em: "Dubai", img: "/images/render-marina.png", desc: "Beachfront living with a massive retail promenade and stunning sea views.", priceBuy: 1600, priceRent: 140000, types: "Apartments" },
  { name: "Saadiyat Island", em: "Abu Dhabi", img: "/images/abudhabi-skyline.png", desc: "The cultural hub of Abu Dhabi with pristine beaches and world-class museums.", priceBuy: 1800, priceRent: 160000, types: "Villas, Apartments" },
  { name: "Yas Island", em: "Abu Dhabi", img: "/images/render-yas.png", desc: "Entertainment capital featuring theme parks, a marina, and modern residential communities.", priceBuy: 1200, priceRent: 110000, types: "Townhouses, Apartments" },
  { name: "Al Reem Island", em: "Abu Dhabi", img: "/images/townhouse.png", desc: "A modern island development close to the city center, popular with expats and families.", priceBuy: 1000, priceRent: 85000, types: "Apartments, Townhouses" }
];

export function Communities() {
  const { formatPrice } = useCurrency();
  const communitiesQ = useListCommunities();
  const { properties } = useProperties();
  const [emirateFilter, setEmirateFilter] = useState<"all" | "Dubai" | "Abu Dhabi">("all");

  const countForCommunity = (name: string) =>
    properties.filter((p) => p.community === name).length;

  const allCommunities: CommunityCard[] = useMemo(() => {
    const data = communitiesQ.data ?? [];
    if (data.length === 0) return FALLBACK_COMMUNITIES;
    return data.map((c) => ({
      name: c.name,
      em: c.emirate || "Dubai",
      img: storageUrl(c.imageUrl),
      desc: c.description ?? "",
      priceBuy: c.priceFrom ?? null,
      priceRent: c.rentFrom ?? null,
      types: c.propertyTypes ?? "",
    }));
  }, [communitiesQ.data]);

  const COMMUNITIES =
    emirateFilter === "all"
      ? allCommunities
      : allCommunities.filter((c) => c.em === emirateFilter);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Prime Altitudes</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">Explore UAE Communities</h1>
            <p className="text-lg text-white/70 font-mono">Discover the perfect neighborhood for your lifestyle</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-16 border-b border-white/10 pb-4">
            {([
              { id: "all", label: "All Elevations" },
              { id: "Dubai", label: "Dubai" },
              { id: "Abu Dhabi", label: "Abu Dhabi" },
            ] as const).map((f) => (
              <button
                key={f.id}
                onClick={() => setEmirateFilter(f.id)}
                className={`text-sm font-mono uppercase tracking-widest transition-colors px-2 py-1 ${
                  emirateFilter === f.id
                    ? "font-bold text-secondary border-b-2 border-secondary -mb-[18px]"
                    : "font-medium text-white/60 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {COMMUNITIES.map((c, i) => {
              const count = countForCommunity(c.name);
              return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card overflow-hidden flex flex-col group"
              >
                <Link href={`/properties?community=${encodeURIComponent(c.name)}`}>
                <div className="relative h-64 overflow-hidden cursor-pointer">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
                    {c.em}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#0A1628]/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
                    {count} {count === 1 ? "Property" : "Properties"}
                  </div>
                </div>
                </Link>
                <div className="p-6 flex-grow flex flex-col bg-[#0A1628]/60">
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{c.name}</h3>
                  <p className="text-white/60 text-sm font-mono leading-relaxed mb-6 flex-grow">{c.desc}</p>
                  
                  {(c.priceBuy != null || c.priceRent != null) && (
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-auto mb-4">
                      <div>
                        <div className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-1">Avg Buy</div>
                        <div className="font-mono font-bold text-secondary text-sm">{c.priceBuy != null ? <>{formatPrice(c.priceBuy)} <span className="text-white/50 text-[10px]">/ sqft</span></> : "—"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-1">Avg Rent</div>
                        <div className="font-mono font-bold text-secondary text-sm">{c.priceRent != null ? <>{formatPrice(c.priceRent)} <span className="text-white/50 text-[10px]">/ yr</span></> : "—"}</div>
                      </div>
                    </div>
                  )}
                  
                  {c.types && (
                    <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest pt-4 border-t border-white/10 mt-auto">
                      <span className="text-white/70">Types:</span> {c.types}
                    </div>
                  )}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}