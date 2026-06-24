import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, TrendingUp, Key, Building, BarChart, Calculator, Search, CheckCircle2, ArrowRight, ChevronDown, Star } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useProperties } from "@/lib/useProperties";
import { useListCommunities } from "@workspace/api-client-react";
import { storageUrl } from "@/lib/listingApi";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/language";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { MortgageTools } from "@/components/shared/MortgageTools";
import { Faq } from "@/components/shared/Faq";

const GOOGLE_PROFILE_URL = "https://share.google/2LAI96DtQ8bSoDWij";

const GOOGLE_REVIEWS = [
  { name: "James Mitchell", initial: "J", color: "#1a73e8", when: "2 weeks ago", text: "Exceptional service from start to finish. They found exactly what we were looking for in Dubai Marina and handled every detail with genuine care." },
  { name: "Fatima Al Rashid", initial: "F", color: "#c9974c", when: "1 month ago", text: "Their market knowledge in Abu Dhabi is unmatched. They handled the sale of my villa with the utmost professionalism and complete transparency." },
  { name: "Rahul Sharma", initial: "R", color: "#0f9d58", when: "1 month ago", text: "Total peace of mind knowing my investments are in safe hands. The management team is responsive, honest, and genuinely puts clients first." },
  { name: "Sarah Thompson", initial: "S", color: "#db4437", when: "2 months ago", text: "Professional, discreet, and highly effective. Acquiring our Downtown penthouse was seamless from the first viewing right through to handover." },
  { name: "Omar Khalifa", initial: "O", color: "#4285f4", when: "3 months ago", text: "Best brokerage experience I have had in the UAE. They listened, advised honestly, and secured a great price. Highly recommended to anyone." },
  { name: "Elena Petrova", initial: "E", color: "#a142f4", when: "3 months ago", text: "From the first call they were attentive and knowledgeable. They found us a fantastic rental on the Palm within days. Five stars without hesitation." },
];

const PRICE_RANGES: Record<string, { min?: number; max?: number }> = {
  "Any Price": {},
  "Under AED 1M": { max: 1_000_000 },
  "AED 1M - 2M": { min: 1_000_000, max: 2_000_000 },
  "AED 2M - 5M": { min: 2_000_000, max: 5_000_000 },
  "AED 5M - 10M": { min: 5_000_000, max: 10_000_000 },
  "AED 10M+": { min: 10_000_000 },
};

export function Home() {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const { properties } = useProperties();
  const communitiesQ = useListCommunities();
  const featured = properties.filter(p => p.featured);
  const featuredProperties = (featured.length > 0 ? featured : properties).slice(0, 6);

  // Off-plan properties (DB-driven "Towers Under Construction")
  const offPlanProperties = properties.filter((p) => p.status === "OFF PLAN").slice(0, 3);

  // Coveted Locations sourced from DB communities, with a clickable link to
  // the filtered property list and a live count per community.
  const countForCommunity = (name: string) =>
    properties.filter((p) => p.community === name).length;

  const FALLBACK_AREAS = [
    { name: "Dubai Marina", em: "Dubai", img: "/images/dubai-skyline.png" },
    { name: "Downtown Dubai", em: "Dubai", img: "/images/luxury-villa.png" },
    { name: "Palm Jumeirah", em: "Dubai", img: "/images/modern-apartment.png" },
    { name: "Saadiyat Island", em: "Abu Dhabi", img: "/images/abudhabi-skyline.png" },
  ];
  const dbCommunities = communitiesQ.data ?? [];
  const covetedAreas =
    dbCommunities.length > 0
      ? dbCommunities.slice(0, 4).map((c) => ({
          name: c.name,
          em: c.emirate || "Dubai",
          img: storageUrl(c.imageUrl),
        }))
      : FALLBACK_AREAS;

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

  // Hero search console state
  const [, navigate] = useLocation();
  const [searchTab, setSearchTab] = useState<"sale" | "rent" | "offplan">("sale");
  const [searchType, setSearchType] = useState("All Types");
  const [searchBeds, setSearchBeds] = useState("Any Bedrooms");
  const [searchPrice, setSearchPrice] = useState("Any Price");
  const [searchCommunity, setSearchCommunity] = useState("All Communities");

  const communityOptions =
    dbCommunities.length > 0
      ? dbCommunities.map((c) => c.name)
      : FALLBACK_AREAS.map((a) => a.name);

  const handleHeroSearch = () => {
    const sp = new URLSearchParams();
    sp.set("purpose", searchTab);
    if (searchType !== "All Types") sp.set("type", searchType);
    if (searchBeds !== "Any Bedrooms") sp.set("beds", searchBeds);
    if (searchCommunity !== "All Communities") sp.set("community", searchCommunity);
    const range = PRICE_RANGES[searchPrice];
    if (range?.min != null) sp.set("minPrice", String(range.min));
    if (range?.max != null) sp.set("maxPrice", String(range.max));
    navigate(`/properties?${sp.toString()}`);
  };

  const scrollToPortfolio = () => {
    (portfolioRef.current as HTMLElement | null)?.scrollIntoView({ behavior: "smooth" });
  };

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
          
          <div className="container relative z-10 mx-auto px-4 text-center mt-44">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl leading-[1.05]">
                {t("hero.title1")}
                <br />
                {t("hero.title2")}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-sans font-light">
                {t("hero.subtitle")}
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
                {([
                  { id: "sale", label: "Buy" },
                  { id: "rent", label: "Rent" },
                  { id: "offplan", label: "Off-Plan" },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSearchTab(tab.id)}
                    className={`text-sm font-mono uppercase tracking-widest pb-1 transition-colors ${
                      searchTab === tab.id
                        ? "font-semibold text-secondary border-b-2 border-secondary"
                        : "font-medium text-white/60 hover:text-white"
                    }`}
                  >
                    {t(tab.label)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 px-1">{t("Property Type")}</label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono appearance-none"
                  >
                    <option value="All Types" className="bg-primary">{t("All Types")}</option>
                    <option value="Apartments" className="bg-primary">{t("Apartments")}</option>
                    <option value="Villas" className="bg-primary">{t("Villas")}</option>
                    <option value="Townhouses" className="bg-primary">{t("Townhouses")}</option>
                    <option value="Penthouse" className="bg-primary">{t("Penthouse")}</option>
                    <option value="Commercial" className="bg-primary">{t("Commercial")}</option>
                    <option value="Studio" className="bg-primary">{t("Studio")}</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 px-1">{t("Bedrooms")}</label>
                  <select
                    value={searchBeds}
                    onChange={(e) => setSearchBeds(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono appearance-none"
                  >
                    <option value="Any Bedrooms" className="bg-primary">{t("Any Bedrooms")}</option>
                    <option value="1 Bed" className="bg-primary">{t("1 Bed")}</option>
                    <option value="2 Beds" className="bg-primary">{t("2 Beds")}</option>
                    <option value="3+ Beds" className="bg-primary">{t("3+ Beds")}</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 px-1">{t("Price Range")}</label>
                  <select
                    value={searchPrice}
                    onChange={(e) => setSearchPrice(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono appearance-none"
                  >
                    {Object.keys(PRICE_RANGES).map((label) => (
                      <option key={label} value={label} className="bg-primary">{t(label)}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-mono text-secondary uppercase tracking-widest mb-1 px-1">{t("Community")}</label>
                  <select
                    value={searchCommunity}
                    onChange={(e) => setSearchCommunity(e.target.value)}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono appearance-none"
                  >
                    <option value="All Communities" className="bg-primary">{t("All Communities")}</option>
                    {communityOptions.map((name) => (
                      <option key={name} value={name} className="bg-primary">{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleHeroSearch}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 md:py-4 px-10 rounded-lg flex items-center justify-center gap-2 font-mono uppercase tracking-widest"
                >
                  <Search className="w-4 h-4" />
                  <span>{t("Search Properties")}</span>
                </Button>
              </div>
            </motion.div>
            
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              onClick={scrollToPortfolio}
              aria-label={t("Scroll down to explore the portfolio")}
              className="mt-14 mx-auto flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="text-[10px] font-mono text-secondary uppercase tracking-widest border border-secondary/30 px-3 py-1 bg-secondary/10 backdrop-blur-sm transition-colors group-hover:bg-secondary/20 group-hover:border-secondary/60">
                {t("GROUND FLOOR")}
              </div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-secondary" />
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Floor Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L12 · THE PORTFOLIO */}
        <section ref={portfolioRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("L12 · The Portfolio")}</div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">{t("Featured Properties")}</h2>
              </div>
              <Link href="/properties">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-lg px-8 font-mono uppercase tracking-widest">
                  {t("View Portfolio")}
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
                    price={p.status === "FOR RENT" ? `${formatPrice(p.price)} / ${t("yr")}` : formatPrice(p.price)} 
                    title={p.title} 
                    location={p.location}
                    community={p.community}
                    agentName={p.agent?.name}
                    beds={p.beds === 0 ? t("Studio") : p.beds} 
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
        <section ref={risingRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("L24 · Rising")}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-md">{t("Towers Under Construction")}</h2>
              <p className="text-white/70 max-w-2xl mx-auto font-mono text-sm">
                {t("Secure your future with Dubai & Abu Dhabi's most anticipated new developments.")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offPlanProperties.length > 0
                ? offPlanProperties.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                    >
                      <PropertyCard
                        id={p.id}
                        image={p.image}
                        status={p.status}
                        price={formatPrice(p.price)}
                        title={p.title}
                        location={p.location}
                        community={p.community}
                        agentName={p.agent?.name}
                        beds={p.beds === 0 ? t("Studio") : p.beds}
                        baths={p.baths}
                        sqft={p.sqft}
                      />
                    </motion.div>
                  ))
                : [
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
            <div className="text-center mt-12">
              <Link href="/off-plan">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-lg px-8 font-mono uppercase tracking-widest">
                  {t("View All Off-Plan")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L36 · THE NUMBERS */}
        <section ref={numbersRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("L36 · The Numbers")}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">{t("Investment Analytics")}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              {[
                { val: "15+", label: "Years Experience" },
                { val: "4,500+", label: "Properties Sold" },
                { val: "12k+", label: "Happy Clients" },
                { val: "2.8B+", label: "AED Transaction Value" }
              ].map((stat, i) => (
                <div key={i} className="text-center flex flex-col gap-3 border border-white/15 p-8">
                  <span className="text-4xl md:text-6xl font-mono font-bold text-secondary">{stat.val}</span>
                  <span className="text-white/70 text-xs font-mono uppercase tracking-widest">{t(stat.label)}</span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MortgageTools showRoi={false} centerHeader title={t("Mortgage Tools")} subtitle={t("Plan every financial angle of your purchase.")} />
            </motion.div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L48 · PRIME ALTITUDES */}
        <section ref={primeRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("L48 · Prime Altitudes")}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">{t("Coveted Locations")}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {covetedAreas.map((area, i) => {
                const count = countForCommunity(area.name);
                return (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link href={`/properties?community=${encodeURIComponent(area.name)}`}>
                      <div className="relative h-64 overflow-hidden group cursor-pointer glass-panel p-2">
                        <img src={area.img} alt={area.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-80" />
                        <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
                          {count} {count === 1 ? t("Property") : t("Properties")}
                        </div>
                        <div className="absolute bottom-6 left-6">
                          <div className="text-[10px] text-secondary font-mono uppercase tracking-widest mb-2">{area.em}</div>
                          <div className="text-white font-serif font-bold text-xl">{area.name}</div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Link href="/communities">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-lg px-8 font-mono uppercase tracking-widest">
                  {t("Explore All Communities")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* L54 · CONCIERGE */}
        <section ref={conciergeRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("L54 · Concierge")}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">{t("Bespoke Services")}</h2>
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
                    <h3 className="text-xl font-serif font-bold text-white mb-3">{t(service.title)}</h3>
                    <p className="text-white/60 text-sm font-mono">{t(service.desc)}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOUD · TRUST */}
        <section ref={trustRef} className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("CLOUD · Trust")}</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 drop-shadow-md">{t("What Our Clients Say")}</h2>

              <div className="inline-flex flex-col sm:flex-row items-center gap-5 glass-panel px-8 py-5">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                  </svg>
                  <div className="text-left">
                    <div className="font-serif font-bold text-white text-lg leading-tight">{t("Google Reviews")}</div>
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">{t("Your Key Property Management")}</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/20" />
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-serif font-bold text-secondary">5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {GOOGLE_REVIEWS.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="glass-panel p-7 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-serif font-bold text-white text-lg shrink-0"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initial}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="font-serif font-bold text-white text-base leading-tight truncate">{r.name}</div>
                      <div className="text-[11px] font-mono text-white/40">{t(r.when)}</div>
                    </div>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                    </svg>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                    ))}
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">{t(r.text)}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-14">
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary rounded-lg px-8 py-6 font-mono uppercase tracking-widest">
                  {t("Read All Reviews on Google")}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <Faq />

        {/* PENTHOUSE (top) */}
        <section ref={penthouseRef} className="py-24 relative z-10 flex items-center min-h-[55vh]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-6 border border-secondary/30 px-4 py-2 inline-block bg-secondary/10 backdrop-blur-sm">
                {t("PH · PENTHOUSE")}
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
                {t("You've reached the summit.")}
              </h2>
              <p className="text-xl text-white/90 mb-12 font-mono">
                {t("Ready to elevate your real estate portfolio? Contact our concierge team for a private consultation.")}
              </p>
              
              <form className="glass-panel p-4 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                <input type="text" placeholder={t("Your Name")} className="flex-1 px-4 py-4 bg-white/5 border border-white/20 text-white font-mono outline-none focus:border-secondary placeholder:text-white/40" />
                <input type="email" placeholder={t("Email")} className="flex-1 px-4 py-4 bg-white/5 border border-white/20 text-white font-mono outline-none focus:border-secondary placeholder:text-white/40" />
                <Button type="button" className="bg-secondary hover:bg-secondary/90 text-white py-6 md:py-4 px-10 rounded-lg font-mono uppercase tracking-widest">
                  {t("Request Contact")}
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