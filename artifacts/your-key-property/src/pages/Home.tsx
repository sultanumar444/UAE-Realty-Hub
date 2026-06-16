import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, TrendingUp, Key, Building, BarChart, Calculator, MapPin, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/dubai-skyline.png" 
              alt="Dubai Skyline" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center mt-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Your Key to UAE Real Estate
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Abu Dhabi & Dubai's trusted property experts — Buy, Sell, Rent & Invest
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white p-2 md:p-4 rounded-sm shadow-xl">
              <div className="flex gap-2 mb-4 border-b border-border pb-2 px-2">
                <button className="px-4 py-2 text-sm font-semibold text-primary border-b-2 border-secondary">Buy</button>
                <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Rent</button>
                <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Off-Plan</button>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Area, Community or Building" 
                    className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm"
                  />
                </div>
                <div className="w-full md:w-48">
                  <select className="w-full px-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm appearance-none">
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Penthouse</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90 text-white py-6 md:py-3 px-8 rounded-none flex gap-2">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-white/80">
              <span className="font-semibold text-white">Popular:</span> Dubai Marina <span className="mx-2">|</span> Downtown Dubai <span className="mx-2">|</span> Palm Jumeirah <span className="mx-2">|</span> Saadiyat Island
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/10">
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-secondary">15+</span>
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-secondary">4,500+</span>
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Properties Sold</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-secondary">12,000+</span>
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Happy Clients</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-secondary">AED 2.8B+</span>
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Transaction Value</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Featured Properties</h2>
                <div className="flex gap-4">
                  <button className="text-sm font-semibold text-primary border-b-2 border-secondary pb-1">All</button>
                  <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors pb-1">Buy</button>
                  <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors pb-1">Rent</button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PropertyCard 
                image="/images/modern-apartment.png"
                status="FOR SALE" price="AED 2,800,000" title="Modern Apartment" location="Dubai Marina"
                beds={2} baths={2} sqft="1,450"
              />
              <PropertyCard 
                image="/images/luxury-villa.png"
                status="FOR SALE" price="AED 18,500,000" title="Luxury Villa" location="Palm Jumeirah"
                beds={5} baths={6} sqft="8,200"
              />
              <PropertyCard 
                image="/images/penthouse.png"
                status="FOR SALE" price="AED 12,000,000" title="Penthouse" location="Downtown Dubai"
                beds={4} baths={5} sqft="5,100"
              />
              <PropertyCard 
                image="/images/townhouse.png"
                status="FOR SALE" price="AED 3,200,000" title="Townhouse" location="Yas Island Abu Dhabi"
                beds={3} baths={3} sqft="2,800"
              />
              <PropertyCard 
                image="/images/modern-apartment.png"
                status="FOR RENT" price="AED 95,000 / yr" title="Studio Apartment" location="Business Bay"
                beds="Studio" baths={1} sqft="520"
              />
              <PropertyCard 
                image="/images/abudhabi-skyline.png"
                status="FOR RENT" price="AED 450,000 / yr" title="Office Space" location="ADGM Abu Dhabi"
                beds="Comm" baths={2} sqft="3,200"
              />
            </div>
            
            <div className="text-center mt-12">
              <Link href="/properties">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* OFF PLAN */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Off-Plan Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Secure your future with Dubai & Abu Dhabi's most anticipated new developments
              </p>
            </div>
            
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-8 pb-8 snap-x snap-mandatory">
              <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-0 snap-center">
                <ProjectCard 
                  image="/images/render-marina.png"
                  title="Marina Heights" developer="Emaar" location="Dubai Marina"
                  price="AED 1.2M" handover="Q4 2026" roi="7-9%"
                />
              </div>
              <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-0 snap-center">
                <ProjectCard 
                  image="/images/render-saadiyat.png"
                  title="Saadiyat Lagoons" developer="Aldar" location="Saadiyat Island"
                  price="AED 2.8M" handover="Q2 2027" roi="6-8%"
                />
              </div>
              <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-0 snap-center">
                <ProjectCard 
                  image="/images/render-yas.png"
                  title="Yas Bay Residences" developer="Aldar" location="Yas Island"
                  price="AED 980K" handover="Q1 2027" roi="8-10%"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive real estate solutions tailored to your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: HomeIcon, title: "Buy Property", desc: "Find your dream home or next investment from our extensive portfolio of premium properties." },
                { icon: TrendingUp, title: "Sell Property", desc: "Get the best market value for your property with our expert marketing and sales strategies." },
                { icon: Key, title: "Rent & Lease", desc: "Discover high-quality rental properties or find reliable tenants for your investments." },
                { icon: Building, title: "Property Management", desc: "Hassle-free management of your assets, ensuring maximum returns and property care." },
                { icon: BarChart, title: "Investment Advisory", desc: "Data-driven insights and personalized strategies to build a profitable real estate portfolio." },
                { icon: Calculator, title: "Free Valuation", desc: "Accurate, up-to-date property valuations based on current market trends and data." }
              ].map((service, i) => (
                <div key={i} className="bg-white p-8 border border-border flex flex-col items-center text-center transition-all hover:border-secondary group">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AREAS WE COVER */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 text-center">Prime Locations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Dubai Marina", em: "Dubai", img: "/images/dubai-skyline.png" },
                { name: "Downtown Dubai", em: "Dubai", img: "/images/luxury-villa.png" },
                { name: "Palm Jumeirah", em: "Dubai", img: "/images/modern-apartment.png" },
                { name: "Business Bay", em: "Dubai", img: "/images/penthouse.png" },
                { name: "JBR", em: "Dubai", img: "/images/dubai-skyline.png" },
                { name: "Saadiyat Island", em: "Abu Dhabi", img: "/images/abudhabi-skyline.png" },
                { name: "Al Reem Island", em: "Abu Dhabi", img: "/images/townhouse.png" },
                { name: "Yas Island", em: "Abu Dhabi", img: "/images/abudhabi-skyline.png" }
              ].map((area, i) => (
                <div key={i} className="relative h-48 md:h-64 overflow-hidden group cursor-pointer border border-border">
                  <img src={area.img} alt={area.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-xs text-white/80 uppercase tracking-widest font-semibold mb-1">{area.em}</div>
                    <div className="text-white font-serif font-bold text-lg">{area.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img src="/images/office-team.png" alt="Office Team" className="w-full h-auto object-cover border border-border" />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Why Choose Us</h2>
                <p className="text-muted-foreground mb-8">
                  We are a team of dedicated professionals committed to providing exceptional real estate services across the UAE. Our deep market knowledge and client-first approach set us apart.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "RERA Certified Agents",
                    "15+ Years Market Experience",
                    "Abu Dhabi & Dubai Licensed",
                    "Award-Winning Service"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-primary">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                  <div>
                    <div className="text-2xl font-serif font-bold text-primary">2.4k+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Properties Managed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-primary">99%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-primary">18</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg Days to Sell</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEET OUR TEAM */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Meet Our Experts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of specialists is ready to guide you through every step of your real estate journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "James Mitchell", title: "Senior Sales Consultant", spec: "Dubai Marina & Palm Jumeirah", img: "/images/agent-1.jpg" },
                { name: "Saeed Al Mansoori", title: "Leasing Manager", spec: "Abu Dhabi Luxury Rentals", img: "/images/agent-2.jpg" },
                { name: "Priya Sharma", title: "Investment Advisor", spec: "Off-Plan & Commercial", img: "/images/agent-3.jpg" },
                { name: "Fatima Hassan", title: "Property Manager", spec: "Asset Management & Care", img: "/images/agent-4.jpg" }
              ].map((agent, i) => (
                <div key={i} className="group text-center">
                  <div className="relative mb-6 overflow-hidden border border-border">
                    <img src={agent.img} alt={agent.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-1">{agent.name}</h3>
                  <p className="text-secondary text-sm font-semibold mb-2">{agent.title}</p>
                  <p className="text-muted-foreground text-sm">{agent.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKET INSIGHTS */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Market Insights</h2>
              <Link href="/about">
                <Button variant="link" className="text-primary hover:text-secondary p-0">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Dubai Property Market Q1 2026 Report", cat: "Market Report", img: "/images/dubai-skyline.png" },
                { title: "Top 5 Communities for Families in Abu Dhabi", cat: "Lifestyle", img: "/images/townhouse.png" },
                { title: "Off-Plan vs Ready: What's Best in 2026", cat: "Investment", img: "/images/render-yas.png" }
              ].map((blog, i) => (
                <div key={i} className="bg-white border border-border group cursor-pointer hover:shadow-lg transition-all">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-secondary font-semibold uppercase tracking-widest mb-3">{blog.cat}</div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-4 line-clamp-2 group-hover:text-secondary transition-colors">{blog.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      Discover the latest trends and insights from our experts on the UAE real estate market.
                    </p>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREE VALUATION */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">What's Your Property Worth?</h2>
            <p className="text-white/80 mb-10 text-lg">Get a free, no-obligation valuation from our experts</p>
            
            <form className="flex flex-col md:flex-row gap-4 bg-white/10 p-4 backdrop-blur-sm border border-white/20">
              <input type="text" placeholder="Property Address" className="flex-1 px-4 py-3 bg-white text-primary border-none outline-none focus:ring-2 focus:ring-secondary text-sm" />
              <input type="text" placeholder="Your Name" className="flex-1 px-4 py-3 bg-white text-primary border-none outline-none focus:ring-2 focus:ring-secondary text-sm" />
              <input type="email" placeholder="Email" className="flex-1 px-4 py-3 bg-white text-primary border-none outline-none focus:ring-2 focus:ring-secondary text-sm" />
              <Button type="button" className="bg-secondary hover:bg-secondary/90 text-white py-6 md:py-3 px-8 rounded-none">
                Request Valuation
              </Button>
            </form>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-16">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "James Mitchell", type: "British Expat", text: "Exceptional service from start to finish. They found exactly what we were looking for in Dubai Marina within our budget." },
                { name: "Fatima Al Rashid", type: "UAE National", text: "Their market knowledge in Abu Dhabi is unmatched. They handled the sale of my villa with utmost professionalism and achieved a great price." },
                { name: "Rahul Sharma", type: "Indian Investor", text: "I've been using their property management services for 3 years. Peace of mind knowing my investments are in safe hands." }
              ].map((test, i) => (
                <div key={i} className="bg-white p-8 border border-border relative">
                  <div className="text-6xl font-serif text-secondary/20 absolute top-4 left-4">"</div>
                  <p className="text-muted-foreground relative z-10 mb-8 pt-4 italic">
                    "{test.text}"
                  </p>
                  <div>
                    <div className="font-serif font-bold text-primary text-lg">{test.name}</div>
                    <div className="text-sm text-secondary">{test.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
