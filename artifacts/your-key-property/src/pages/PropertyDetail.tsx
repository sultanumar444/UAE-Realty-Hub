import { useState } from "react";
import { useParams, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPropertyById, PROPERTIES } from "@/lib/properties";
import { useCurrency } from "@/lib/currency";
import { useFavorites } from "@/lib/favorites";
import { MortgageCalculator } from "@/components/shared/MortgageCalculator";
import { RoiVisualizer } from "@/components/shared/RoiVisualizer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Bed, Bath, Square, MapPin, CheckCircle2, Heart, Phone, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export function PropertyDetail() {
  const params = useParams();
  const property = getPropertyById(params.id || "");
  const { formatPrice } = useCurrency();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [mainImage, setMainImage] = useState(property?.image || "");
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative z-10">
          <div className="text-center glass-panel p-12">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">Property Not Found</h1>
            <Link href="/properties">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-mono uppercase tracking-widest">Back to Portfolio</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFav = isFavorite(property.id);

  const similarProperties = PROPERTIES.filter(
    p => p.id !== property.id && (p.type === property.type || p.emirate === property.emirate)
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 mb-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <div className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-3 border border-secondary/30 px-3 py-1 inline-block bg-secondary/10 backdrop-blur-sm">
                  {property.status} · {property.type}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">{property.title}</h1>
                <div className="flex items-center gap-2 text-white/70 font-mono text-sm">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>{property.location}, {property.emirate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-serif font-bold text-secondary">
                  {property.status === "FOR RENT" ? `${formatPrice(property.price)} / yr` : formatPrice(property.price)}
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="relative h-[50vh] min-h-[400px] mb-4 glass-panel p-1">
            <img src={mainImage} alt={property.title} className="w-full h-full object-cover" />
            <button 
              onClick={() => toggleFavorite(property.id)}
              className="absolute top-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors z-10"
              data-testid={`btn-favorite-${property.id}`}
            >
              <Heart className={`w-6 h-6 ${isFav ? "fill-secondary text-secondary" : "text-white"}`} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x pb-4">
            {property.gallery.map((img, i) => (
              <div key={i} className={`shrink-0 glass-panel p-1 cursor-pointer transition-all ${mainImage === img ? 'border-secondary' : 'opacity-60 hover:opacity-100'}`} onClick={() => setMainImage(img)}>
                <img src={img} alt={`Gallery ${i}`} className="w-32 h-24 object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col xl:flex-row gap-12">
            
            {/* LEFT COLUMN */}
            <div className="flex-1">
              
              <div className="glass-panel p-8 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Type</span>
                    <span className="text-lg font-mono text-white">{property.type}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1"><Bed className="w-3 h-3 text-secondary"/> Bedrooms</span>
                    <span className="text-lg font-mono text-white">{property.beds === 0 ? "Studio" : property.beds}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1"><Bath className="w-3 h-3 text-secondary"/> Bathrooms</span>
                    <span className="text-lg font-mono text-white">{property.baths}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1"><Square className="w-3 h-3 text-secondary"/> Area</span>
                    <span className="text-lg font-mono text-white">{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-6">About this Property</h2>
                <div className="text-white/80 font-mono text-sm leading-relaxed whitespace-pre-wrap glass-panel p-8">
                  {property.description}
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 glass-panel p-8">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-mono text-sm">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {property.status === "FOR SALE" && (
                <div className="mb-12" id="roi-visualizer">
                  <RoiVisualizer initialPrice={property.price} />
                </div>
              )}
              
            </div>
            
            {/* RIGHT COLUMN */}
            <div className="xl:w-[400px] shrink-0">
              <div className="sticky top-32 space-y-8">
                
                {/* Agent Card */}
                <div className="glass-panel p-8">
                  <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-6">Listed By</h3>
                  <div className="flex items-center gap-6 mb-8">
                    <img src={property.agent.image} alt={property.agent.name} className="w-20 h-20 rounded-full object-cover border border-white/20" />
                    <div>
                      <div className="font-serif font-bold text-xl text-white mb-1">{property.agent.name}</div>
                      <div className="text-[10px] font-mono text-secondary uppercase tracking-widest">{property.agent.title}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white flex gap-2 rounded-none h-14 font-mono uppercase tracking-widest text-xs">
                      <Phone className="w-4 h-4" /> Call {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 flex gap-2 rounded-none h-14 font-mono uppercase tracking-widest text-xs">
                      <SiWhatsapp className="w-4 h-4" /> WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 flex gap-2 rounded-none h-14 font-mono uppercase tracking-widest text-xs">
                      <Mail className="w-4 h-4" /> Email Agent
                    </Button>
                  </div>
                </div>
                
                {/* Mortgage Calculator Compact */}
                {property.status === "FOR SALE" && (
                  <div className="glass-panel p-6">
                    <MortgageCalculator price={property.price} compact={true} className="!bg-transparent !border-none" />
                  </div>
                )}
                
              </div>
            </div>
            
          </div>
          
          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-24 pt-16 border-t border-white/10">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3 text-center">Portfolio</div>
              <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">Similar Altitudes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarProperties.map(p => (
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