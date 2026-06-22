import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, TrendingUp, Key, Building, BarChart, Calculator, MapPin, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useProperties } from "@/lib/useProperties";
import { useCurrency } from "@/lib/currency";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RoiVisualizer } from "@/components/shared/RoiVisualizer";

export function Home() {
  const { formatPrice } = useCurrency();
  const { properties } = useProperties();
  const featured = properties.filter(p => p.featured);
  const featuredProperties = (featured.length > 0 ? featured : properties).slice(0, 6);

  // Section Refs for scroll tracking
  const heroRef = useRef(null);
  const portfolioRef = useRef(null);
  const risingRef = useRef(null);
  const numbersRef = useRef(null);
  const primeRef = useRef(null);
  const conciergeRef = useRef(null);
  const trustRef = useRef(null);
  const penthouseRef = useRef(null);

  // Page-level scroll for deterministic hero parallax (avoids container offset ambiguity)
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* LOBBY (Hero) */}
        <section ref={heroRef} className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <img 
              src="/images/looking-up-towers.png" 
              alt="Looking up at glass towers" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent" />
          </motion.div>
          
          <div className="container relative z-10 mx-auto px-4 text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
                Your Key to the UAE Skyline
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-sans font-light">
                Ascend into Dubai & Abu Dhabi's most coveted addresses.
              </p>
            </motion.div>
            
            {/* Elevator Console Search */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl mx-auto glass-panel p-2 md:p-6 rounded-lg"
            >
              <div className="flex gap-4 mb-6 border-b border-white/20 pb-4 px-2">
                <button className="text-sm font-mono font-semibold text-secondary uppercase tracking-widest border-b-2 border-secondary pb-1">Buy</button>
                <button className="text-sm font-mono font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest pb-1">Rent</button>
                <button className="text-sm font-mono font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest pb-1">Off-Plan</button>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Area, Community or Building" 
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono placeholder:text-white/40"
                  />
                </div>
                <div className="w-full md:w-56">
                  <select className="w-full px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono appearance-none">
                    <option className="bg-primary">All Types</option>
                    <option className="bg-primary">Apartment</option>
                    <option className="bg-primary">Villa</option>
                    <option className="bg-primary">Townhouse</option>
                    <option className="bg-primary">Penthouse</option>
                  </select>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90 text-white py-6 md:py-4 px-10 rounded-none flex gap-2 font-mono uppercase tracking-widest">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="text-[10px] font-mono text-secondary uppercase tracking-widest border border-secondary/30 px-3 py-1 bg-secondary/10 backdrop-blur-sm">
                GROUND FLOOR
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 text-secondary rotate-90" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Floor Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L12 · THE PORTFOLIO */}
        <section ref={portfolioRef} className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">L12 · The Portfolio</div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">Featured Properties</h2>
              </div>
              <Link href="/properties">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-none px-8 font-mono uppercase tracking-widest">
                  View Portfolio
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <PropertyCard 
                    id={p.id}
                    image={p.image}
                    status={p.status} 
                    price={p.status === "FOR RENT" ? `${formatPrice(p.price)} / yr` : formatPrice(p.price)} 
                    title={p.title} 
                    location={p.location}
                    community={p.community}
                    agentName={p.agent?.name}
                    beds={p.beds === 0 ? "Studio" : p.beds} 
                    baths={p.baths} 
                    sqft={p.sqft}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L24 · RISING DEVELOPMENTS */}
        <section ref={risingRef} className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">L24 · Rising</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">Towers Under Construction</h2>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm">
                Secure your future with Dubai & Abu Dhabi's most anticipated new developments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { image: "/images/render-marina.png", title: "Marina Heights", developer: "Emaar", location: "Dubai Marina", price: 1200000, handover: "Q4 2026", roi: "7-9%" },
                { image: "/images/render-saadiyat.png", title: "Saadiyat Lagoons", developer: "Aldar", location: "Saadiyat Island", price: 2800000, handover: "Q2 2027", roi: "6-8%" },
                { image: "/images/render-yas.png", title: "Yas Bay Residences", developer: "Aldar", location: "Yas Island", price: 980000, handover: "Q1 2027", roi: "8-10%" }
              ].map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <ProjectCard {...proj} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L36 · THE NUMBERS */}
        <section ref={numbersRef} className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">L36 · The Numbers</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">Investment Analytics</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 glass-panel p-10">
              {[
                { val: "15+", label: "Years Experience" },
                { val: "4,500+", label: "Properties Sold" },
                { val: "12k+", label: "Happy Clients" },
                { val: "2.8B+", label: "AED Transaction Value" }
              ].map((stat, i) => (
                <div key={i} className="text-center flex flex-col gap-3">
                  <span className="text-4xl md:text-6xl font-mono font-bold text-secondary">{stat.val}</span>
                  <span className="text-white/70 text-xs font-mono uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <RoiVisualizer initialPrice={2500000} />
            </motion.div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L48 · PRIME ALTITUDES */}
        <section ref={primeRef} className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">L48 · Prime Altitudes</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">Coveted Locations</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Dubai Marina", em: "Dubai", img: "/images/dubai-skyline.png" },
                { name: "Downtown Dubai", em: "Dubai", img: "/images/luxury-villa.png" },
                { name: "Palm Jumeirah", em: "Dubai", img: "/images/modern-apartment.png" },
                { name: "Saadiyat Island", em: "Abu Dhabi", img: "/images/abudhabi-skyline.png" }
              ].map((area, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative h-64 overflow-hidden group cursor-pointer glass-panel p-2"
                >
                  <img src={area.img} alt={area.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6">
                    <div className="text-[10px] text-secondary font-mono uppercase tracking-widest mb-2">{area.em}</div>
                    <div className="text-white font-serif font-bold text-xl">{area.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L54 · CONCIERGE */}
        <section ref={conciergeRef} className="py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">L54 · Concierge</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">Bespoke Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: HomeIcon, title: "Buy Property", desc: "Find your dream home or next investment from our portfolio.", href: "/properties?purpose=sale" },
                { icon: TrendingUp, title: "Sell Property", desc: "Get the best market value with our expert strategies.", href: "/contact" },
                { icon: Key, title: "Rent & Lease", desc: "Discover high-quality rental properties or find reliable tenants.", href: "/properties?purpose=rent" },
                { icon: Building, title: "Property Management", desc: "Hassle-free management of your assets.", href: "/contact" },
                { icon: BarChart, title: "Investment Advisory", desc: "Data-driven insights to build a profitable portfolio.", href: "/investment" },
                { icon: Calculator, title: "Free Valuation", desc: "Accurate property valuations based on current data.", href: "/contact" }
              ].map((service, i) => (
                <Link key={i} href={service.href}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass-panel p-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors cursor-pointer h-full"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/60 text-sm font-mono">{service.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOUD · TRUST */}
        <section ref={trustRef} className="py-40 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">CLOUD · Trust</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16 drop-shadow-md">Client Experiences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "James Mitchell", type: "British Expat", text: "Exceptional service from start to finish. They found exactly what we were looking for in Dubai Marina." },
                { name: "Fatima Al Rashid", type: "UAE National", text: "Their market knowledge in Abu Dhabi is unmatched. Handled the sale of my villa with utmost professionalism." },
                { name: "Rahul Sharma", type: "Indian Investor", text: "Peace of mind knowing my investments are in safe hands with their management team." }
              ].map((test, i) => (
                <div key={i} className="glass-panel p-8 relative">
                  <div className="text-6xl font-serif text-secondary/30 absolute top-4 left-6">"</div>
                  <p className="text-white/80 relative z-10 mb-8 pt-6 font-mono text-sm leading-relaxed">
                    {test.text}
                  </p>
                  <div>
                    <div className="font-serif font-bold text-white text-lg">{test.name}</div>
                    <div className="text-xs font-mono text-secondary uppercase tracking-widest mt-1">{test.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PENTHOUSE (top) */}
        <section ref={penthouseRef} className="py-40 relative z-10 flex items-center min-h-[80vh]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-6 border border-secondary/30 px-4 py-2 inline-block bg-secondary/10 backdrop-blur-sm">
                PH · PENTHOUSE
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
                You've reached the summit.
              </h2>
              <p className="text-xl text-white/90 mb-12 font-mono">
                Ready to elevate your real estate portfolio? Contact our concierge team for a private consultation.
              </p>
              
              <form className="glass-panel p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                <input type="text" placeholder="Your Name" className="flex-1 px-4 py-4 bg-white/5 border border-white/20 text-white font-mono outline-none focus:border-secondary placeholder:text-white/40" />
                <input type="email" placeholder="Email" className="flex-1 px-4 py-4 bg-white/5 border border-white/20 text-white font-mono outline-none focus:border-secondary placeholder:text-white/40" />
                <Button type="button" className="bg-secondary hover:bg-secondary/90 text-white py-6 md:py-4 px-10 rounded-none font-mono uppercase tracking-widest">
                  Request Contact
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

      </main>
      
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}