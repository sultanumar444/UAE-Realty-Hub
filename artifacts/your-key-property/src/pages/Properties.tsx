import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Properties() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Properties for Sale & Rent</h1>
          
          <div className="bg-white p-6 border border-border mb-12 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none">
                <option>All Types</option>
                <option>Apartments</option>
                <option>Villas</option>
                <option>Townhouses</option>
              </select>
              <select className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none">
                <option>Any Location</option>
                <option>Dubai Marina</option>
                <option>Downtown Dubai</option>
                <option>Saadiyat Island</option>
              </select>
              <select className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none">
                <option>Price (Any)</option>
                <option>Under 1M AED</option>
                <option>1M - 3M AED</option>
                <option>Over 3M AED</option>
              </select>
              <select className="px-4 py-3 bg-muted/50 border border-border outline-none text-sm appearance-none">
                <option>Beds (Any)</option>
                <option>1 Bed</option>
                <option>2 Beds</option>
                <option>3+ Beds</option>
              </select>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-white py-6 px-8 rounded-none flex gap-2 h-[46px]">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
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
                      <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Buy</label>
                      <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Rent</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1,2,3,4,5,6,7,8,9].map((i) => (
                <PropertyCard 
                  key={i}
                  image={i % 3 === 0 ? "/images/modern-apartment.png" : i % 2 === 0 ? "/images/luxury-villa.png" : "/images/townhouse.png"}
                  status={i % 4 === 0 ? "FOR RENT" : "FOR SALE"} 
                  price={i % 4 === 0 ? "AED 120,000 / yr" : "AED 3,500,000"} 
                  title={i % 3 === 0 ? "Luxury Apartment" : "Modern Villa"} 
                  location={i % 2 === 0 ? "Dubai Marina" : "Saadiyat Island"}
                  beds={i % 3 + 2} baths={i % 3 + 2} sqft={i * 500 + 1000}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
