import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { useFavorites } from "@/lib/favorites";
import { PROPERTIES } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currency";
import { motion } from "framer-motion";

export function Favorites() {
  const { favoriteIds } = useFavorites();
  const { formatPrice } = useCurrency();
  
  const favoriteProperties = PROPERTIES.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Saved Altitudes</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">Your Portfolio</h1>
          </div>
          
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProperties.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <PropertyCard 
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 glass-panel max-w-3xl mx-auto">
              <h3 className="font-serif font-bold text-2xl text-white mb-4">You haven't saved any properties yet</h3>
              <p className="text-white/60 font-mono text-sm mb-8">Browse our portfolio and click the heart icon to save them here.</p>
              <Link href="/properties">
                <Button className="bg-secondary hover:bg-secondary/90 text-[#0A1628] font-bold font-mono uppercase tracking-widest px-8 py-6 rounded-none">
                  Explore Altitudes
                </Button>
              </Link>
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