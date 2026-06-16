import { motion } from "framer-motion";

const locations = [
  { name: "Palm Jumeirah", desc: "Iconic waterfront living" },
  { name: "Downtown Dubai", desc: "The center of now" },
  { name: "Dubai Marina", desc: "Vibrant riviera lifestyle" },
  { name: "Business Bay", desc: "The commercial hub" },
  { name: "Emirates Hills", desc: "Exclusive villa communities" },
  { name: "Abu Dhabi", desc: "Capital prestige" }
];

export function Locations() {
  return (
    <section id="locations" className="py-24 md:py-32 bg-muted/50 border-y border-border">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Prime Destinations
          </span>
          <h2 className="text-4xl md:text-5xl mb-6">
            Locations We Cover
          </h2>
          <p className="text-muted-foreground text-lg">
            We specialize in the most sought-after neighborhoods across the UAE, representing properties that define modern luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border p-8 group hover:border-primary transition-colors"
            >
              <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">{loc.name}</h3>
              <p className="text-muted-foreground">{loc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
