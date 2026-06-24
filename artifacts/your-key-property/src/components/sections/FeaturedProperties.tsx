import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

const properties = [
  {
    title: "Signature Villa on Frond M",
    location: "Palm Jumeirah",
    price: "AED 45,000,000",
    beds: 6,
    baths: 7,
    sqft: "13,000",
    image: "/images/property-1.png",
  },
  {
    title: "Burj Khalifa View Penthouse",
    location: "Downtown Dubai",
    price: "AED 28,500,000",
    beds: 4,
    baths: 5,
    sqft: "7,500",
    image: "/images/property-2.png",
  },
  {
    title: "Waterfront Duplex",
    location: "Dubai Marina",
    price: "AED 18,200,000",
    beds: 3,
    baths: 4,
    sqft: "4,200",
    image: "/images/property-3.png",
  }
];

export function FeaturedProperties() {
  const { t } = useLanguage();
  return (
    <section id="properties" className="py-24 md:py-32 bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              {t("Exclusive Portfolio")}
            </span>
            <h2 className="text-4xl md:text-5xl text-white">
              {t("Featured Properties")}
            </h2>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
            {t("View All Properties")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={property.image} 
                  alt={t(property.title)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <p className="text-white text-2xl font-serif">{property.price}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl text-white mb-2">{t(property.title)}</h3>
                <p className="text-white/60 flex items-center gap-2 mb-4">
                  <MapPin size={16} /> {t(property.location)}
                </p>
                
                <div className="flex items-center gap-6 text-white/80 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Bed size={18} className="text-primary" />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={18} className="text-primary" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={18} className="text-primary" />
                    <span>{property.sqft} {t("sqft")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
