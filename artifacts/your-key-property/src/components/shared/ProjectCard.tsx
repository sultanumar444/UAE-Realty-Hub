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
    <div className="group bg-white border border-border overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col h-full min-w-[300px]">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {roi && (
          <div className="absolute top-4 right-4">
            <span className="bg-secondary text-white text-xs font-bold px-3 py-1 tracking-wider">
              Est. ROI {roi}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif font-semibold text-xl text-primary mb-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <Building className="w-4 h-4" />
          <span>by {developer}</span>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Tag className="w-4 h-4 text-secondary" />
            <span className="text-primary font-semibold">Starting {formatPrice(price)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">Handover {handover}</span>
          </div>
        </div>
        
        <Link href="/contact">
          <button className="w-full py-3 bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
            Register Interest
          </button>
        </Link>
      </div>
    </div>
  );
}
