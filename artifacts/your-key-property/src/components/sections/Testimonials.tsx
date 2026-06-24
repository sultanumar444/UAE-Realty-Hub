import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const testimonials = [
  {
    quote: "Their understanding of the Dubai luxury market is unparalleled. They found us an off-market villa on the Palm that perfectly matched our exacting requirements.",
    author: "James M.",
    title: "International Investor"
  },
  {
    quote: "Professional, discreet, and highly effective. The entire process of acquiring our penthouse in Downtown Dubai was handled with absolute precision.",
    author: "Sarah T.",
    title: "Expat Resident"
  },
  {
    quote: "Your Key has managed my property portfolio for three years. Their attention to detail and tenant curation is the best I have experienced in the region.",
    author: "Ahmed K.",
    title: "Portfolio Owner"
  }
];

export function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl">{t("Client Perspectives")}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-lg text-foreground mb-8 flex-grow leading-relaxed">
                "{t(test.quote)}"
              </p>
              <div>
                <p className="font-serif text-lg">{test.author}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">{t(test.title)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
