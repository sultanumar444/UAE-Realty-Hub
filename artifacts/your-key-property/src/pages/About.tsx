import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-20 relative z-10">
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/glass-facade.png" 
              alt="Glass Facade" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-transparent" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-4 inline-block border border-secondary/30 px-3 py-1 bg-secondary/10 backdrop-blur-sm">Our Story</div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">Ascending Together</h1>
              <p className="text-lg md:text-xl text-white/80 font-mono max-w-2xl mx-auto leading-relaxed">
                Your Key Property Management is your dedicated partner in navigating the dynamic UAE property market.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Foundation</div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Established with Vision</h2>
                <div className="glass-panel p-8 space-y-6">
                  <p className="text-white/70 font-mono text-sm leading-relaxed">
                    Founded over 15 years ago, Your Key Property Management has grown from a boutique agency into one of the most respected and trusted real estate brokerages in the United Arab Emirates.
                  </p>
                  <p className="text-white/70 font-mono text-sm leading-relaxed">
                    Operating across Abu Dhabi and Dubai, we bridge the gap between premium properties and discerning clients. Whether you are a first-time buyer, a seasoned investor, or looking for comprehensive property management, we deliver transparent, professional, and personalized service.
                  </p>
                  
                  <div className="space-y-6 pt-6 border-t border-white/10">
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-mono font-bold text-white uppercase tracking-widest text-sm mb-2">Our Mission</h4>
                        <p className="text-xs font-mono text-white/60 leading-relaxed">To provide unparalleled real estate services through transparency, expertise, and a deep understanding of our clients' needs.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-mono font-bold text-white uppercase tracking-widest text-sm mb-2">Our Vision</h4>
                        <p className="text-xs font-mono text-white/60 leading-relaxed">To be the undisputed leader in UAE real estate, recognized for our integrity, innovation, and exceptional results.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                <motion.img 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src="/images/dubai-skyline.png" 
                  alt="Dubai" 
                  className="w-full h-64 object-cover border border-white/20 shadow-xl" 
                />
                <motion.img 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src="/images/abudhabi-skyline.png" 
                  alt="Abu Dhabi" 
                  className="w-full h-64 object-cover border border-white/20 shadow-xl mt-12" 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">The Experts</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16">Meet The Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "James Mitchell", title: "Senior Sales Consultant", spec: "Dubai Marina", img: "/images/agent-1.png" },
                { name: "Saeed Al Mansoori", title: "Leasing Manager", spec: "Abu Dhabi Luxury Rentals", img: "/images/agent-2.png" },
                { name: "Priya Sharma", title: "Investment Advisor", spec: "Off-Plan Properties", img: "/images/agent-3.png" },
                { name: "Fatima Hassan", title: "Property Manager", spec: "Asset Management", img: "/images/agent-4.png" },
                { name: "Michael Clarke", title: "Commercial Specialist", spec: "Business Bay & ADGM", img: "/images/agent-1.png" },
                { name: "Sara Al Futtaim", title: "Luxury Specialist", spec: "Palm Jumeirah", img: "/images/agent-4.png" },
                { name: "David Chen", title: "Sales Consultant", spec: "Downtown Dubai", img: "/images/agent-3.png" },
                { name: "Omar Zayed", title: "Operations Director", spec: "Company Operations", img: "/images/agent-2.png" }
              ].map((agent, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-panel p-8 group"
                >
                  <div className="relative mb-6 overflow-hidden w-24 h-24 mx-auto rounded-full border border-white/20 group-hover:border-secondary transition-colors">
                    <img src={agent.img} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-secondary text-[10px] font-mono uppercase tracking-widest mb-3">{agent.title}</p>
                  <p className="text-white/50 text-xs font-mono">{agent.spec}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}