import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCurrency } from "@/lib/currency";

const COMMUNITIES = [
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
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Explore UAE Communities</h1>
            <p className="text-lg text-muted-foreground">Discover the perfect neighborhood for your lifestyle</p>
          </div>
          
          <div className="flex gap-4 mb-12 border-b border-border pb-4">
            <button className="text-lg font-semibold text-primary border-b-2 border-secondary px-2 py-1 -mb-[18px]">All</button>
            <button className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1">Dubai</button>
            <button className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1">Abu Dhabi</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {COMMUNITIES.map((c, i) => (
              <div key={i} className="bg-white border border-border group overflow-hidden flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {c.em}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">{c.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{c.desc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mt-auto mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Buy</div>
                      <div className="font-semibold text-primary">{formatPrice(c.priceBuy)} / sqft</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Rent</div>
                      <div className="font-semibold text-primary">{formatPrice(c.priceRent)} / yr</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">Types:</span> {c.types}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
