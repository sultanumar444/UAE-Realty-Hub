import { Link, useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { useListAgents } from "@workspace/api-client-react";
import { storageUrl } from "@/lib/listingApi";
import { useProperties } from "@/lib/useProperties";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/language";
import { Phone, Mail, ArrowLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";

export function AgentProfile() {
  const [, params] = useRoute("/agents/:id");
  const id = params?.id ? Number(params.id) : undefined;
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  const agentsQ = useListAgents();
  const { properties } = useProperties();

  const agent = (agentsQ.data ?? []).find((a) => a.id === id);
  const listings = properties.filter((p) => p.agentId === id);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <Link href="/agents">
            <span className="inline-flex items-center gap-2 mb-10 text-xs font-mono uppercase tracking-widest text-secondary hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> {t("Back to team")}
            </span>
          </Link>

          {!agent ? (
            <div className="text-center py-32 glass-panel">
              <h1 className="font-serif font-bold text-2xl text-white mb-4">{t("Agent not found")}</h1>
              <Link href="/agents">
                <span className="text-secondary font-mono text-sm uppercase tracking-widest cursor-pointer hover:text-white">
                  {t("View the team")}
                </span>
              </Link>
            </div>
          ) : (
            <>
              <div className="glass-panel p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-10">
                <div className="w-40 h-40 shrink-0 overflow-hidden rounded-full border border-white/20">
                  <img src={storageUrl(agent.photoUrl)} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left flex-grow">
                  <div className="text-[10px] text-secondary font-mono uppercase tracking-[3px] mb-3">
                    {agent.title || t("Property Consultant")}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">
                    {agent.name}
                  </h1>
                  {agent.bio && (
                    <p className="text-white/60 font-mono text-sm max-w-2xl mb-6 leading-relaxed">{agent.bio}</p>
                  )}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-2 text-white/70 hover:text-secondary transition-colors font-mono text-sm">
                        <Phone className="w-4 h-4 text-secondary" /> {agent.phone}
                      </a>
                    )}
                    {agent.whatsapp && (
                      <a href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 hover:text-secondary transition-colors font-mono text-sm">
                        <SiWhatsapp className="w-4 h-4 text-secondary" /> {agent.whatsapp}
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 text-white/70 hover:text-secondary transition-colors font-mono text-sm">
                        <Mail className="w-4 h-4 text-secondary" /> {agent.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("Portfolio")}</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-md">
                    {t("Listings by")} {agent.name.split(" ")[0]}
                  </h2>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/60">
                  {listings.length} {listings.length === 1 ? t("property") : t("properties")}
                </div>
              </div>

              {listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
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
              ) : (
                <div className="text-center py-24 glass-panel">
                  <p className="text-white/60 font-mono text-sm">{t("No active listings for this agent yet.")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}
