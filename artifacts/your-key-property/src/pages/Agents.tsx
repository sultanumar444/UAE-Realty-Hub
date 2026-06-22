import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useListAgents } from "@workspace/api-client-react";
import { storageUrl } from "@/lib/listingApi";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const FALLBACK_AGENTS = [
  { name: "James Mitchell", title: "Senior Sales Consultant", spec: "Dubai Marina", img: "/images/agent-1.png" },
  { name: "Saeed Al Mansoori", title: "Leasing Manager", spec: "Abu Dhabi Luxury Rentals", img: "/images/agent-2.png" },
  { name: "Priya Sharma", title: "Investment Advisor", spec: "Off-Plan Properties", img: "/images/agent-3.png" },
  { name: "Fatima Hassan", title: "Property Manager", spec: "Asset Management", img: "/images/agent-4.png" },
  { name: "Michael Clarke", title: "Commercial Specialist", spec: "Business Bay & ADGM", img: "/images/agent-1.png" },
  { name: "Sara Al Futtaim", title: "Luxury Specialist", spec: "Palm Jumeirah", img: "/images/agent-4.png" },
  { name: "David Chen", title: "Sales Consultant", spec: "Downtown Dubai", img: "/images/agent-3.png" },
  { name: "Omar Zayed", title: "Operations Director", spec: "Company Operations", img: "/images/agent-2.png" },
];

interface TeamMember {
  name: string;
  title: string;
  spec: string;
  img: string;
  phone?: string;
  email?: string;
}

export function Agents() {
  const agentsQ = useListAgents();

  const activeAgents = (agentsQ.data ?? []).filter((a) => a.active);

  const team: TeamMember[] =
    activeAgents.length > 0
      ? activeAgents.map((a) => ({
          name: a.name,
          title: a.title || "Property Consultant",
          spec: a.bio || "Your Key Property Management",
          img: storageUrl(a.photoUrl),
          phone: a.phone || undefined,
          email: a.email || undefined,
        }))
      : FALLBACK_AGENTS;

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-secondary uppercase tracking-[3px] mb-3">The Experts</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">Meet The Team</h1>
            <p className="text-white/60 font-mono text-sm max-w-2xl mx-auto">
              A dedicated team of specialists guiding you through every step of buying, selling, renting, and investing across Dubai &amp; Abu Dhabi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((agent, i) => (
              <motion.div
                key={`${agent.name}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-panel p-8 text-center group"
              >
                <div className="relative mb-6 overflow-hidden w-24 h-24 mx-auto rounded-full border border-white/20 group-hover:border-secondary transition-colors">
                  <img src={agent.img} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-1">{agent.name}</h3>
                <p className="text-secondary text-[10px] font-mono uppercase tracking-[3px] mb-3">{agent.title}</p>
                <p className="text-white/50 text-xs font-mono mb-4">{agent.spec}</p>
                {(agent.phone || agent.email) && (
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} aria-label={`Call ${agent.name}`} className="text-white/60 hover:text-secondary transition-colors">
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} aria-label={`Email ${agent.name}`} className="text-white/60 hover:text-secondary transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}
