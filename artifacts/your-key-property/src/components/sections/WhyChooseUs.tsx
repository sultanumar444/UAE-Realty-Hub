import { motion } from "framer-motion";

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="/images/about.png" 
                alt="Elegant marble lobby" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-background border border-border p-8 shadow-xl max-w-[280px] hidden md:block">
              <p className="text-4xl font-serif text-primary mb-2">15+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Years of Excellence in Dubai</p>
            </div>
          </motion.div>

          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              The Your Key Advantage
            </span>
            <h2 className="text-4xl md:text-5xl mb-8">
              Discretion, Professionalism, and Unmatched Access
            </h2>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl mb-2">Market Authority</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We don't just follow the market; we anticipate it. Our deep local knowledge ensures you are always positioned favorably, whether buying off-plan or investing in mature communities.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl mb-2">Exclusive Network</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our relationships open doors to off-market properties and pre-launch opportunities that others simply cannot access.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl mb-2">White-Glove Service</h4>
                <p className="text-muted-foreground leading-relaxed">
                  From the initial consultation to final handover and beyond, experience a seamless, discreet process tailored entirely to your lifestyle and investment goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
