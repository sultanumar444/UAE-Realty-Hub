import { useState } from "react";
import { useParams, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPropertyById, PROPERTIES } from "@/lib/properties";
import { useCurrency } from "@/lib/currency";
import { useFavorites } from "@/lib/favorites";
import { MortgageCalculator } from "@/components/shared/MortgageCalculator";
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
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-primary mb-4">Property Not Found</h1>
            <Link href="/properties">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">Back to Properties</Button>
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-24">
        {/* Gallery */}
        <div className="container mx-auto px-4 mt-8 mb-12">
          <div className="relative h-[400px] md:h-[600px] mb-4 bg-muted">
            <img src={mainImage} alt={property.title} className="w-full h-full object-cover" />
            <button 
              onClick={() => toggleFavorite(property.id)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              data-testid={`btn-favorite-${property.id}`}
            >
              <Heart className={`w-6 h-6 ${isFav ? "fill-secondary text-secondary" : "text-primary"}`} />
            </button>
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white text-xs font-bold px-4 py-2 tracking-wider shadow-lg">
                {property.status}
              </span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x">
            {property.gallery.map((img, i) => (
              <img 
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className={`w-32 h-24 object-cover cursor-pointer snap-start transition-all ${mainImage === img ? 'ring-2 ring-secondary opacity-100' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT COLUMN */}
            <div className="flex-1">
              <div className="mb-8 border-b border-border pb-8">
                <div className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
                  {property.status === "FOR RENT" ? `${formatPrice(property.price)} / yr` : formatPrice(property.price)}
                </div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-4">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-lg mb-8">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span>{property.location}, {property.emirate}</span>
                </div>
                
                <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Type</span>
                    <span className="text-lg font-semibold text-primary">{property.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Bed className="w-5 h-5 text-primary" /></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bedrooms</span>
                      <span className="text-lg font-semibold text-primary">{property.beds === 0 ? "Studio" : property.beds}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Bath className="w-5 h-5 text-primary" /></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bathrooms</span>
                      <span className="text-lg font-semibold text-primary">{property.baths}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Square className="w-5 h-5 text-primary" /></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Area</span>
                      <span className="text-lg font-semibold text-primary">{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Description</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {property.description}
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Location</h2>
                <div className="w-full h-[400px] bg-primary relative flex items-center justify-center overflow-hidden border border-border">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <div className="relative z-10 text-center bg-white/10 backdrop-blur-md p-8 border border-white/20">
                    <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-white mb-2">{property.location}</h3>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary mt-4 rounded-none">
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* RIGHT COLUMN */}
            <div className="lg:w-[400px] shrink-0">
              <div className="sticky top-24 space-y-8">
                
                {/* Agent Card */}
                <div className="bg-white border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-serif font-bold text-primary mb-6">Listed By</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={property.agent.image} alt={property.agent.name} className="w-20 h-20 rounded-full object-cover border-2 border-muted" />
                    <div>
                      <div className="font-serif font-bold text-lg text-primary">{property.agent.name}</div>
                      <div className="text-xs font-semibold text-secondary uppercase tracking-widest">{property.agent.title}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white flex gap-2 rounded-none h-12">
                      <Phone className="w-4 h-4" /> Call {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 flex gap-2 rounded-none h-12">
                      <SiWhatsapp className="w-4 h-4" /> WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full border-border hover:bg-muted flex gap-2 rounded-none h-12">
                      <Mail className="w-4 h-4" /> Email Agent
                    </Button>
                  </div>
                </div>
                
                {/* Mortgage Calculator Compact */}
                {property.status === "FOR SALE" && (
                  <MortgageCalculator price={property.price} compact={true} />
                )}
                
              </div>
            </div>
            
          </div>
          
          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      <Footer />
    </div>
  );
}
