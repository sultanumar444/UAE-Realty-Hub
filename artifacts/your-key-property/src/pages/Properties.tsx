import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/lib/useProperties";
import { useCurrency } from "@/lib/currency";

export function Properties() {
  const { formatPrice } = useCurrency();
  const { properties } = useProperties();
  const [type, setType] = useState<string>("All Types");
  const [location, setLocation] = useState<string>("Any Location");
  const [beds, setBeds] = useState<string>("Beds (Any)");
  
  // Status filter state
  const [buyChecked, setBuyChecked] = useState(true);
  const [rentChecked, setRentChecked] = useState(true);
  const [offPlanChecked, setOffPlanChecked] = useState(true);

  // Sync status filters with the ?purpose= query param (from the Properties dropdown)
  const search = useSearch();
  const params = new URLSearchParams(search);
  const communityParam = params.get("community");
  const qParam = params.get("q");
  const typeParam = params.get("type");
  useEffect(() => {
    setType(typeParam ?? "All Types");
  }, [typeParam]);
  useEffect(() => {
    const purpose = new URLSearchParams(search).get("purpose");
    if (purpose === "sale") {
      setBuyChecked(true);
      setRentChecked(false);
      setOffPlanChecked(false);
    } else if (purpose === "rent") {
      setBuyChecked(false);
      setRentChecked(true);
      setOffPlanChecked(false);
    } else if (purpose === "offplan") {
      setBuyChecked(false);
      setRentChecked(false);
      setOffPlanChecked(true);
    } else {
      setBuyChecked(true);
      setRentChecked(true);
      setOffPlanChecked(true);
    }
  }, [search]);

  const filteredProperties = useMemo(() => {
    const TYPE_MAP: Record<string, string> = {
      Apartments: "Apartment",
      Villas: "Villa",
      Townhouses: "Townhouse",
      Penthouse: "Penthouse",
      Commercial: "Commercial",
      Studio: "Studio",
    };

    return properties.filter(p => {
      if (communityParam && p.community !== communityParam) return false;

      if (qParam && qParam.trim()) {
        const q = qParam.trim().toLowerCase();
        const haystack = `${p.title} ${p.community ?? ""} ${p.location ?? ""} ${p.emirate ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (type !== "All Types") {
        const mappedType = TYPE_MAP[type] ?? type;
        if (p.type !== mappedType) return false;
      }
      
      if (location !== "Any Location" && p.emirate !== location && p.location !== location) return false;
      
      if (beds !== "Beds (Any)") {
        if (beds === "1 Bed" && p.beds !== 1) return false;
        if (beds === "2 Beds" && p.beds !== 2) return false;
        if (beds === "3+ Beds" && p.beds < 3) return false;
      }
      
      if (!buyChecked && p.status === "FOR SALE") return false;
      if (!rentChecked && p.status === "FOR RENT") return false;
      if (!offPlanChecked && p.status === "OFF PLAN") return false;
      
      return true;
    });
  }, [properties, type, location, beds, buyChecked, rentChecked, offPlanChecked, communityParam, qParam]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">
            {communityParam ? "Coveted Location" : "Portfolio"}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 drop-shadow-md">
            {communityParam || "Elevated Living"}
          </h1>
          {communityParam && (
            <a
              href="/properties"
              className="inline-block mb-12 text-xs font-mono uppercase tracking-widest text-secondary hover:text-white transition-colors"
            >
              &larr; View all locations
            </a>
          )}
          {!communityParam && <div className="mb-12" />}
          
          <div className="glass-panel p-6 mb-12 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm appearance-none"
              >
                <option className="bg-primary">All Types</option>
                <option className="bg-primary">Apartments</option>
                <option className="bg-primary">Villas</option>
                <option className="bg-primary">Townhouses</option>
                <option className="bg-primary">Penthouse</option>
                <option className="bg-primary">Commercial</option>
                <option className="bg-primary">Studio</option>
              </select>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm appearance-none"
              >
                <option className="bg-primary">Any Location</option>
                <option className="bg-primary">Dubai</option>
                <option className="bg-primary">Abu Dhabi</option>
                <option className="bg-primary">Dubai Marina</option>
                <option className="bg-primary">Downtown Dubai</option>
                <option className="bg-primary">Saadiyat Island</option>
              </select>
              <select 
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm appearance-none"
              >
                <option className="bg-primary">Beds (Any)</option>
                <option className="bg-primary">1 Bed</option>
                <option className="bg-primary">2 Beds</option>
                <option className="bg-primary">3+ Beds</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="glass-panel p-8 sticky top-32">
                <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Refine Search</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-white/70 uppercase tracking-widest mb-4 block">Status</label>
                    <div className="flex flex-col gap-4">
                      <label className="flex items-center gap-3 text-sm font-mono cursor-pointer">
                        <input type="checkbox" checked={buyChecked} onChange={(e) => setBuyChecked(e.target.checked)} className="w-4 h-4 accent-secondary bg-white/10 border-white/20" /> 
                        Buy
                      </label>
                      <label className="flex items-center gap-3 text-sm font-mono cursor-pointer">
                        <input type="checkbox" checked={rentChecked} onChange={(e) => setRentChecked(e.target.checked)} className="w-4 h-4 accent-secondary bg-white/10 border-white/20" /> 
                        Rent
                      </label>
                      <label className="flex items-center gap-3 text-sm font-mono cursor-pointer">
                        <input type="checkbox" checked={offPlanChecked} onChange={(e) => setOffPlanChecked(e.target.checked)} className="w-4 h-4 accent-secondary bg-white/10 border-white/20" /> 
                        Off-Plan
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-8 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/60">
                Showing {filteredProperties.length} results
              </div>
              
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((p) => (
                    <PropertyCard 
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      status={p.status} 
                      price={p.status === "FOR RENT" ? `${formatPrice(p.price)} / yr` : formatPrice(p.price)} 
                      title={p.title} 
                      location={p.location}
                      community={p.community}
                      agentName={p.agent?.name}
                      beds={p.beds === 0 ? "Studio" : p.beds} 
                      baths={p.baths} 
                      sqft={p.sqft}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 glass-panel">
                  <h3 className="font-serif font-bold text-2xl text-white mb-4">No properties match your altitude</h3>
                  <Button 
                    className="bg-secondary text-[#0A1628] hover:bg-secondary/90 font-mono uppercase tracking-widest"
                    onClick={() => {
                      setType("All Types");
                      setLocation("Any Location");
                      setBeds("Beds (Any)");
                      setBuyChecked(true);
                      setRentChecked(true);
                      setOffPlanChecked(true);
                    }}
                  >
                    Reset Console
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}