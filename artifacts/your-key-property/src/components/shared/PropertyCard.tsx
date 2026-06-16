import { Bed, Bath, Square, Heart } from "lucide-react";
import { Link } from "wouter";
import { useFavorites } from "@/lib/favorites";

interface PropertyCardProps {
  id?: string;
  image: string;
  status: "FOR SALE" | "FOR RENT";
  price: string;
  title: string;
  location: string;
  beds: number | string;
  baths: number | string;
  sqft: number | string;
}

export function PropertyCard({ id = "1", image, status, price, title, location, beds, baths, sqft }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="group bg-white border border-border overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 flex flex-col h-full relative">
      <Link href={`/properties/${id}`}>
        <div className="cursor-pointer h-full flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 tracking-wider">
                {status}
              </span>
            </div>
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              data-testid={`btn-favorite-card-${id}`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-secondary text-secondary" : "text-primary"}`} />
            </button>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="text-secondary font-serif font-bold text-2xl mb-2">
              {price}
            </div>
            <h3 className="font-serif font-semibold text-xl text-primary mb-1 line-clamp-1">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-6 line-clamp-1">
              {location}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto mb-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Bed className="w-4 h-4" />
                <span>{beds}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Bath className="w-4 h-4" />
                <span>{baths}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Square className="w-4 h-4" />
                <span>{sqft} sqft</span>
              </div>
            </div>
            
            <button className="w-full py-3 border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
