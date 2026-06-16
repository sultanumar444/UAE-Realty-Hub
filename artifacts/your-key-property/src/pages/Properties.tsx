import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/lib/properties";
import { Slider } from "@/components/ui/slider";
import { useCurrency } from "@/lib/currency";

export function Properties() {
  const { formatPrice } = useCurrency();
  const [type, setType] = useState<string>("All Types");
  const [location, setLocation] = useState<string>("Any Location");
  const [beds, setBeds] = useState<string>("Beds (Any)");
  
  // Status filter state
  const [buyChecked, setBuyChecked] = useState(true);
  const [rentChecked, setRentChecked] = useState(true);

  const filteredProperties = useMemo(() => {
    const TYPE_MAP: Record<string, string> = {
      Apartments: "Apartment",
      Villas: "Villa",
      Townhouses: "Townhouse",
      Penthouse: "Penthouse",
      Commercial: "Commercial",
      Studio: "Studio",
    };

    return PROPERTIES.filter(p => {
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
      
      return true;
    });
  }, [type, location, beds, buyChecked, rentChecked]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Properties for Sale & Rent</h1>
          
          <div className="bg-white p-6 border border-border mb-12 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none"
              >
                <option>All Types</option>
                <option>Apartments</option>
                <option>Villas</option>
                <option>Townhouses</option>
                <option>Penthouse</option>
                <option>Commercial</option>
                <option>Studio</option>
              </select>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none"
              >
                <option>Any Location</option>
                <option>Dubai</option>
                <option>Abu Dhabi</option>
                <option>Dubai Marina</option>
                <option>Downtown Dubai</option>
                <option>Saadiyat Island</option>
              </select>
              <select 
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none"
              >
                <option>Beds (Any)</option>
                <option>1 Bed</option>
                <option>2 Beds</option>
                <option>3+ Beds</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white border border-border p-6 sticky top-32">
                <h3 className="font-serif font-bold text-lg mb-4">Map View</h3>
                <div className="w-full h-48 bg-muted mb-4 relative overflow-hidden flex items-center justify-center border border-border">
                  <img src="/images/uae-map.jpg" alt="Map" className="w-full h-full object-cover opacity-80" />
                  <Button size="sm" variant="secondary" className="absolute z-10 text-xs">View Map</Button>
                </div>
                <h3 className="font-serif font-bold text-lg mb-4 mt-8">Refine Search</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Status</label>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={buyChecked} onChange={(e) => setBuyChecked(e.target.checked)} /> Buy
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={rentChecked} onChange={(e) => setRentChecked(e.target.checked)} /> Rent
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground font-semibold">
                Showing {filteredProperties.length} properties
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
                      beds={p.beds === 0 ? "Studio" : p.beds} 
                      baths={p.baths} 
                      sqft={p.sqft}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border border-border">
                  <h3 className="font-serif font-bold text-xl text-primary mb-2">No properties match your filters</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setType("All Types");
                      setLocation("Any Location");
                      setBeds("Beds (Any)");
                      setBuyChecked(true);
                      setRentChecked(true);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
