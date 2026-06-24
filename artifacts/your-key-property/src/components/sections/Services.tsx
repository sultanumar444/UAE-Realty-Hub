import { motion } from "framer-motion";
import { Key, Home, Building2, Briefcase, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/language";

const services = [
  {
    title: "Buying",
    description: "Access off-market listings and premium developments. We guide you through seamless acquisitions.",
    icon: Key
  },
  {
    title: "Selling",
    description: "Position your property to the right audience with our global network of high-net-worth investors.",
    icon: Home
  },
  {
    title: "Renting",
    description: "Find the perfect long-term luxury residence or lease your property to verified corporate tenants.",
    icon: Building2
  },
  {
    title: "Property Management",
    description: "End-to-end management ensuring your asset is maintained to pristine standards.",
    icon: Briefcase
  },
  {
    title: "Investment Advisory",
    description: "Data-driven insights to maximize yields in Dubai's rapidly evolving real estate market.",
    icon: TrendingUp
  }
];

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 flex flex-col justify-start">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            >
              {t("Our Expertise")}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl mb-6"
            >
              {t("Comprehensive Real Estate Solutions")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {t("From strategic acquisitions to meticulous property management, we provide a holistic approach to luxury real estate in the UAE.")}
            </motion.p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-border pb-8 last:border-0"
              >
                <service.icon className="w-8 h-8 text-primary mb-6 transition-transform group-hover:scale-110 group-hover:text-foreground duration-500" />
                <h3 className="text-2xl mb-3">{t(service.title)}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
