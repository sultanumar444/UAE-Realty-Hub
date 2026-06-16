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
    <div className="group glass-card overflow-hidden flex flex-col h-full relative">
      <Link href={`/properties/${id}`}>
        <div className="cursor-pointer h-full flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent opacity-60" />
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
                {status}
              </span>
            </div>
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              data-testid={`btn-favorite-card-${id}`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-secondary text-secondary" : "text-white"}`} />
            </button>
          </div>
          
          <div className="p-6 flex flex-col flex-grow relative bg-[#0A1628]/60">
            <div className="text-secondary font-mono font-bold text-xl mb-3">
              {price}
            </div>
            <h3 className="font-serif font-bold text-xl text-white mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-white/60 font-mono text-xs mb-6 line-clamp-1 uppercase tracking-wider">
              {location}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto mb-6">
              <div className="flex items-center gap-2 text-white/70 font-mono text-xs">
                <Bed className="w-4 h-4 text-secondary" />
                <span>{beds}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 font-mono text-xs">
                <Bath className="w-4 h-4 text-secondary" />
                <span>{baths}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 font-mono text-xs">
                <Square className="w-4 h-4 text-secondary" />
                <span>{sqft} sqft</span>
              </div>
            </div>
            
            <button className="w-full py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-secondary hover:border-secondary hover:text-white transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}