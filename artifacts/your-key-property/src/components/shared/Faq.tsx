import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/language";

const FAQS = [
  {
    q: "Can non-residents and foreigners buy property in the UAE?",
    a: "Yes. Foreign nationals can buy, sell, and lease property in designated freehold areas across Dubai and Abu Dhabi with full ownership rights. Our team guides you through eligibility, freehold zones, and the end-to-end purchase process.",
  },
  {
    q: "What documents do I need to purchase a property?",
    a: "Typically a valid passport (and Emirates ID or visa copy for residents), proof of funds or a mortgage pre-approval, and a signed Memorandum of Understanding (Form F). For mortgage purchases, the bank will request income and bank statements. We prepare and review every document with you.",
  },
  {
    q: "How does property financing work for buyers?",
    a: "UAE banks offer mortgages to both residents and non-residents, usually up to 80% loan-to-value for residents and 50-75% for non-residents, over terms up to 25 years. We connect you with trusted mortgage advisors and help you secure pre-approval before you offer.",
  },
  {
    q: "What are the typical fees and service charges?",
    a: "Buyers should budget for a 4% Dubai Land Department transfer fee, agency commission (usually 2%), and annual service charges that vary by community and unit size. Our listings and advisors provide a clear breakdown so there are no surprises.",
  },
  {
    q: "What are the best areas to invest in Dubai and Abu Dhabi?",
    a: "It depends on your goals. High-yield communities like Business Bay, JVC, and Al Reem Island suit rental income, while Downtown Dubai, Palm Jumeirah, and Saadiyat Island favour capital appreciation. Use our Investment ROI tools or speak to an advisor for a tailored shortlist.",
  },
  {
    q: "Can you help with property management after I buy?",
    a: "Absolutely. We offer full property management, including tenant sourcing, rent collection, maintenance, and portal listing across Bayut, Dubizzle, and Property Finder, so your investment performs without the day-to-day workload.",
  },
];

export function Faq() {
  const { t } = useLanguage();

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {t("faq.kicker")} <span className="text-secondary italic">{t("faq.kickerAccent")}</span>
          </h2>
          <p className="text-white/60 font-mono text-sm md:text-base max-w-xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-panel border border-white/10 px-6 rounded-lg data-[state=open]:border-secondary/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-mono text-sm md:text-base text-white hover:text-secondary hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 font-sans text-sm md:text-base leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
