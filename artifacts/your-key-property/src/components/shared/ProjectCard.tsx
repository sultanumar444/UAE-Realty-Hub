import { Calendar, MapPin, Building, Tag } from "lucide-react";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currency";

interface ProjectCardProps {
  id?: string;
  image: string;
  title: string;
  developer: string;
  location: string;
  price: number;
  handover: string;
  roi?: string;
}

export function ProjectCard({ image, title, developer, location, price, handover, roi }: ProjectCardProps) {
  const { formatPrice } = useCurrency();
  return (
    <div className="group glass-card overflow-hidden flex flex-col h-full min-w-[300px]">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent opacity-60" />
        {roi && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
              Est. ROI {roi}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-[#0A1628]/60">
        <h3 className="font-serif font-bold text-xl text-white mb-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-wider mb-6">
          <Building className="w-3 h-3 text-secondary" />
          <span>by {developer}</span>
        </div>
        
        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-center gap-3 text-xs font-mono">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-white/80">{location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <Tag className="w-4 h-4 text-secondary" />
            <span className="text-white font-bold">Starting {formatPrice(price)}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-white/80">Handover {handover}</span>
          </div>
        </div>
        
        <Link href="/contact">
          <button className="w-full py-3 bg-white/5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-colors">
            Register Interest
          </button>
        </Link>
      </div>
    </div>
  );
}