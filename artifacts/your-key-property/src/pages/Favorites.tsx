import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { useFavorites } from "@/lib/favorites";
import { PROPERTIES } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currency";

export function Favorites() {
  const { favoriteIds } = useFavorites();
  const { formatPrice } = useCurrency();
  
  const favoriteProperties = PROPERTIES.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Saved Properties</h1>
          
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProperties.map((p) => (
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
              <h3 className="font-serif font-bold text-xl text-primary mb-2">You haven't saved any properties yet</h3>
              <p className="text-muted-foreground mb-6">Browse our properties and click the heart icon to save them here.</p>
              <Link href="/properties">
                <Button className="bg-secondary hover:bg-secondary/90 text-white">
                  Browse Properties
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
