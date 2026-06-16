import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/office-team.png" 
              alt="Our Office" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/70" />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Our Story</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Your Key Property Management is more than a real estate agency. We are your dedicated partners in navigating the dynamic UAE property market.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Established with Vision</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded over 15 years ago, Your Key Property Management has grown from a boutique agency into one of the most respected and trusted real estate brokerages in the United Arab Emirates.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Operating across Abu Dhabi and Dubai, we bridge the gap between premium properties and discerning clients. Whether you are a first-time buyer, a seasoned investor, or looking for comprehensive property management, we deliver transparent, professional, and personalized service.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary">Our Mission</h4>
                      <p className="text-sm text-muted-foreground">To provide unparalleled real estate services through transparency, expertise, and a deep understanding of our clients' needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary">Our Vision</h4>
                      <p className="text-sm text-muted-foreground">To be the undisputed leader in UAE real estate, recognized for our integrity, innovation, and exceptional results.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <img src="/images/dubai-skyline.png" alt="Dubai" className="w-full h-48 object-cover border border-border" />
                <img src="/images/abudhabi-skyline.png" alt="Abu Dhabi" className="w-full h-48 object-cover border border-border mt-8" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-16">Meet The Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "James Mitchell", title: "Senior Sales Consultant", spec: "Dubai Marina", img: "/images/agent-1.jpg" },
                { name: "Saeed Al Mansoori", title: "Leasing Manager", spec: "Abu Dhabi Luxury Rentals", img: "/images/agent-2.jpg" },
                { name: "Priya Sharma", title: "Investment Advisor", spec: "Off-Plan Properties", img: "/images/agent-3.jpg" },
                { name: "Fatima Hassan", title: "Property Manager", spec: "Asset Management", img: "/images/agent-4.jpg" },
                { name: "Michael Clarke", title: "Commercial Specialist", spec: "Business Bay & ADGM", img: "/images/agent-1.jpg" },
                { name: "Sara Al Futtaim", title: "Luxury Specialist", spec: "Palm Jumeirah", img: "/images/agent-4.jpg" },
                { name: "David Chen", title: "Sales Consultant", spec: "Downtown Dubai", img: "/images/agent-3.jpg" },
                { name: "Omar Zayed", title: "Operations Director", spec: "Company Operations", img: "/images/agent-2.jpg" }
              ].map((agent, i) => (
                <div key={i} className="bg-white border border-border p-6 group">
                  <div className="relative mb-6 overflow-hidden w-32 h-32 mx-auto rounded-full border-2 border-border group-hover:border-secondary transition-colors">
                    <img src={agent.img} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-1">{agent.name}</h3>
                  <p className="text-secondary text-sm font-semibold mb-2">{agent.title}</p>
                  <p className="text-muted-foreground text-xs">{agent.spec}</p>
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
