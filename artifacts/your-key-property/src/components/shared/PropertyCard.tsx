import { Bed, Bath, Square, Heart, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useFavorites } from "@/lib/favorites";
import { useLanguage } from "@/lib/language";

interface PropertyCardProps {
  id?: string;
  image: string;
  status: "FOR SALE" | "FOR RENT" | "OFF PLAN";
  price: string;
  title: string;
  location: string;
  beds: number | string;
  baths: number | string;
  sqft: number | string;
  type?: string;
  community?: string;
  agentName?: string;
  agentImage?: string;
}

const PURPOSE_LABEL: Record<PropertyCardProps["status"], string> = {
  "FOR SALE": "BUY",
  "FOR RENT": "RENT",
  "OFF PLAN": "OFF PLAN",
};

export function PropertyCard({
  id = "1",
  image,
  status,
  price,
  title,
  location,
  beds,
  baths,
  sqft,
  type,
  community,
  agentName,
  agentImage,
}: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
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
          <div className="relative h-60 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent opacity-60" />
            <div className="absolute top-4 left-4 z-10 flex items-stretch">
              <span className="bg-secondary text-white text-[10px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
                {t(PURPOSE_LABEL[status])}
              </span>
              {type && (
                <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest border-l border-white/20">
                  {t(type)}
                </span>
              )}
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
            <div className="text-secondary font-serif font-bold text-2xl mb-4">{price}</div>

            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-white font-mono text-sm font-bold">
                  <Bed className="w-4 h-4 text-secondary" />
                  <span>{beds}</span>
                </div>
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider mt-1">{t("Beds")}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-white font-mono text-sm font-bold">
                  <Bath className="w-4 h-4 text-secondary" />
                  <span>{baths}</span>
                </div>
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider mt-1">{t("Baths")}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-white font-mono text-sm font-bold">
                  <Square className="w-4 h-4 text-secondary" />
                  <span>{sqft}</span>
                </div>
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider mt-1">{t("Square (ft)")}</span>
              </div>
            </div>

            <h3 className="font-serif font-bold text-lg text-white mb-2 line-clamp-2 leading-snug">{title}</h3>
            <div className="flex items-center gap-2 text-white/55 font-mono text-[11px] uppercase tracking-wider line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">{community ? `${location}, ${community}` : location}</span>
            </div>

            {agentName && (
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/10">
                {agentImage ? (
                  <img
                    src={agentImage}
                    alt={agentName}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-secondary/20 border border-white/20 flex items-center justify-center font-serif font-bold text-secondary text-sm">
                    {agentName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider">{t("Listing by")}</div>
                  <div className="text-white font-mono text-xs font-bold truncate">{agentName}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
