import { useState } from "react";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Faq } from "@/components/shared/Faq";
import {
  useGetOffPlanProjectBySlug,
  useListAgents,
  useCreateLead,
  getGetOffPlanProjectBySlugQueryKey,
  type OffPlanProject as OffPlanProjectModel,
  type Agent,
} from "@workspace/api-client-react";
import { projectHero, projectImage, projectGallery } from "@/lib/offPlanApi";
import { storageUrl } from "@/lib/listingApi";
import { useSeo } from "@/lib/useSeo";
import { useLanguage } from "@/lib/language";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  MapPin,
  CalendarClock,
  Wallet,
  BedDouble,
  Building2,
  CheckCircle2,
  Download,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm";

// Turn a pasted Google Maps link (share link, place URL, or "Embed a map"
// snippet) into an iframe-embeddable src. Falls back to a search query when no
// link is provided.
function isGoogleMapsHost(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return (
      host === "google.com" ||
      host.endsWith(".google.com") ||
      host === "maps.app.goo.gl" ||
      host === "goo.gl"
    );
  } catch {
    return false;
  }
}

function buildMapSrc(
  mapUrl: string | null | undefined,
  fallbackQuery: string,
): string {
  const raw = (mapUrl ?? "").trim();
  if (raw) {
    // Admin may paste a full <iframe ...> snippet — pull out the src.
    const iframeMatch = raw.match(/src=["']([^"']+)["']/i);
    const url = iframeMatch ? iframeMatch[1] : raw;
    // Already embeddable (Embed a map URL, or any ...&output=embed link).
    // Only trust embeddable links that point at a Google Maps host, so a
    // pasted non-Google URL can't be framed verbatim.
    if (
      isGoogleMapsHost(url) &&
      (/\/maps\/embed/i.test(url) || /[?&]output=embed/i.test(url))
    ) {
      return url;
    }
    // Place URL with coordinates: .../@25.07,55.13,15z/...
    const coord = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coord) {
      return `https://www.google.com/maps?q=${coord[1]},${coord[2]}&output=embed`;
    }
    // Query form: ...?q=Some+Place
    const qMatch = url.match(/[?&]q=([^&]+)/);
    if (qMatch) {
      return `https://www.google.com/maps?q=${qMatch[1]}&output=embed`;
    }
    // Otherwise treat the whole link/text as a search query.
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(fallbackQuery)}&output=embed`;
}

export function OffPlanProject() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const params = useParams();
  const slug = params.slug || "";

  const projectQ = useGetOffPlanProjectBySlug(slug, {
    query: {
      enabled: Boolean(slug),
      queryKey: getGetOffPlanProjectBySlugQueryKey(slug),
    },
  });
  const project = projectQ.data;

  const agentsQ = useListAgents();
  const agents = agentsQ.data ?? [];
  const agent =
    (project?.agentId != null
      ? agents.find((a) => a.id === project.agentId)
      : undefined) ?? agents.find((a) => a.active);

  useSeo({
    title: project ? project.seoTitle || project.name : "Off-Plan Project",
    description: project
      ? project.seoDescription ||
        project.tagline ||
        project.description.slice(0, 160)
      : undefined,
    image: project ? projectHero(project) : undefined,
    type: "article",
  });

  if (projectQ.isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative z-10">
          <Loader2 className="h-7 w-7 animate-spin text-white/50" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 relative z-10">
          <div className="text-center glass-panel p-12">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              {t("Project Not Found")}
            </h1>
            <Link href="/off-plan">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-mono uppercase tracking-widest">
                {t("View All Off-Plan")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = projectGallery(project);
  const materials = (project.materials ?? []).map((p) => storageUrl(p));
  const floorPlanPdfUrl = project.floorPlanPdf ? storageUrl(project.floorPlanPdf) : null;
  const brochurePdfUrl = project.brochurePdf ? storageUrl(project.brochurePdf) : null;
  const hasMaterials = materials.length > 0 || !!floorPlanPdfUrl || !!brochurePdfUrl;
  const floorPlans = project.floorPlans ?? [];
  const milestones = project.paymentMilestones ?? [];
  const startingPrice =
    project.startingPrice && project.startingPrice > 0
      ? formatPrice(project.startingPrice)
      : null;

  const facts: { icon: typeof MapPin; label: string; value: string }[] = [];
  if (startingPrice)
    facts.push({ icon: Wallet, label: t("Starting From"), value: startingPrice });
  if (project.handover)
    facts.push({ icon: CalendarClock, label: t("Handover"), value: project.handover });
  if (project.paymentPlan)
    facts.push({ icon: Wallet, label: t("Payment Plan"), value: project.paymentPlan });
  if (project.bedrooms)
    facts.push({ icon: BedDouble, label: t("Bedrooms"), value: project.bedrooms });
  if (project.unitTypes)
    facts.push({ icon: Building2, label: t("Unit Types"), value: project.unitTypes });

  const locationText = [project.location || project.community, project.emirate]
    .filter(Boolean)
    .join(", ");

  const keyInfo: { label: string; value: string }[] = [];
  const deliveryDate = project.deliveryDate || project.handover;
  if (deliveryDate)
    keyInfo.push({ label: t("Delivery date"), value: deliveryDate });
  if (locationText) keyInfo.push({ label: t("Location"), value: locationText });
  if (project.paymentPlan)
    keyInfo.push({ label: t("Payment plan"), value: project.paymentPlan });
  if (project.numberOfBuildings)
    keyInfo.push({
      label: t("Number of buildings"),
      value: project.numberOfBuildings,
    });
  const propertyTypes = project.propertyTypes || project.unitTypes;
  if (propertyTypes)
    keyInfo.push({ label: t("Property types"), value: propertyTypes });
  if (project.governmentFee)
    keyInfo.push({ label: t("Government fee"), value: project.governmentFee });
  if (project.ownershipType)
    keyInfo.push({ label: t("Ownership type"), value: project.ownershipType });

  const mapFallback =
    project.mapAddress || locationText || project.name;
  const mapSrc = buildMapSrc(project.mapUrl, mapFallback);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />

      <main className="flex-grow relative z-10">
        {/* HERO */}
        <section className="relative h-[78vh] min-h-[520px] w-full">
          <img
            src={projectHero(project)}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/45 to-[#0A1628]/30" />

          <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-16">
            <Link href="/off-plan">
              <span className="mb-6 inline-flex cursor-pointer items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/70 transition hover:text-secondary">
                <ArrowLeft className="h-4 w-4" /> {t("All Off-Plan")}
              </span>
            </Link>

            {project.developer ? (
              <div className="mb-3 font-serif text-lg font-bold uppercase tracking-[0.2em] text-white/90">
                {project.developer}
              </div>
            ) : null}

            {(project.location || project.community) && (
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-white backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-secondary" />
                {[project.location || project.community, project.emirate]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}

            <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
              {project.name}
            </h1>
            {project.tagline && (
              <p className="mt-4 max-w-2xl font-serif text-lg text-white/85 md:text-2xl">
                {project.tagline}
              </p>
            )}
          </div>
        </section>

        {/* KEY FACTS */}
        {facts.length > 0 && (
          <section className="relative z-10 border-y border-white/10 bg-white/[0.03]">
            <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-3 lg:grid-cols-5">
              {facts.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <f.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                      {f.label}
                    </div>
                    <div className="font-serif text-lg font-bold text-white">
                      {f.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-3">
          {/* MAIN */}
          <div className="lg:col-span-2">
            {keyInfo.length > 0 && (
              <div className="mb-14">
                <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                  {t("Key information")}
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {keyInfo.map((item, i) => (
                    <div key={i}>
                      <div className="mb-1.5 text-sm text-white/55">
                        {item.label}
                      </div>
                      <div className="font-serif text-lg font-bold leading-snug text-white">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.description && (
              <div className="mb-14">
                <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                  {t("About the Project")}
                </h2>
                <div className="whitespace-pre-line text-base leading-relaxed text-white/75">
                  {project.description}
                </div>
              </div>
            )}

            {project.highlights.length > 0 && (
              <div className="mb-14">
                <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                  {t("Project Highlights")}
                </h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                      <span className="text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.amenities.length > 0 && (
              <div className="mb-4">
                <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                  {t("Amenities")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono text-white/75"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR — REGISTER INTEREST */}
          <aside className="lg:col-span-1">
            <div id="enquire" className="sticky top-28 glass-panel p-8">
              {startingPrice && (
                <div className="mb-5 border-b border-white/10 pb-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {t("Starting From")}
                  </div>
                  <div className="font-serif text-3xl font-bold text-secondary">
                    {startingPrice}
                  </div>
                </div>
              )}
              <h3 className="mb-2 font-serif text-2xl font-bold text-white">
                {t("Register Your Interest")}
              </h3>
              <p className="mb-6 text-sm text-white/60">
                {t("Request the brochure, pricing and payment plan for this project.")}
              </p>
              <LeadForm project={project} t={t} />

              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-white/20 px-4 py-3 text-xs font-mono uppercase tracking-widest text-white transition hover:border-secondary hover:text-secondary"
                >
                  <Download className="h-4 w-4" /> {t("Download Brochure")}
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* PROPERTY TYPES & FLOOR PLANS */}
        {floorPlans.length > 0 && (
          <section className="relative z-10 border-t border-white/10 py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                {t("Property Types & Floor Plans")}
              </h2>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <div className="hidden grid-cols-[80px_1.5fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] font-mono uppercase tracking-widest text-white/50 md:grid">
                  <span>{t("Layout")}</span>
                  <span>{t("Unit Type")}</span>
                  <span>{t("Bedrooms")}</span>
                  <span>{t("Size")}</span>
                  <span>{t("Starting From")}</span>
                  <span />
                </div>
                {floorPlans.map((fp, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 items-center gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 md:grid-cols-[80px_1.5fr_1fr_1fr_1fr_auto]"
                  >
                    <div className="row-span-2 h-16 w-16 overflow-hidden rounded-md border border-white/10 bg-white/5 md:row-span-1">
                      {fp.image ? (
                        <img
                          src={projectImage(fp.image)}
                          alt={fp.type}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/25">
                          <Building2 className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="font-serif text-base font-bold text-white">
                      {fp.type}
                    </div>
                    <div className="font-mono text-sm text-white/70">
                      {fp.bedrooms || "—"}
                    </div>
                    <div className="font-mono text-sm text-white/70">
                      {fp.size || "—"}
                    </div>
                    <div className="font-mono text-sm font-bold text-secondary">
                      {fp.price && fp.price > 0 ? formatPrice(fp.price) : "—"}
                    </div>
                    <a
                      href="#enquire"
                      className="justify-self-start rounded-md border border-secondary/60 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-secondary transition hover:bg-secondary hover:text-[#0A1628] md:justify-self-end"
                    >
                      {t("Enquire")}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GET A FREE CONSULTATION */}
        {agent && <Consultation agent={agent} project={project} t={t} />}

        {/* LOCATION BANNER IMAGE */}
        {project.locationImage && (
          <section className="relative z-10">
            <img
              src={projectImage(project.locationImage)}
              alt={`${project.name} location`}
              className="h-[280px] w-full object-cover md:h-[440px]"
            />
          </section>
        )}

        {/* ATTRACTIVE PAYMENT PLAN */}
        {milestones.length > 0 && (
          <section className="relative z-10 py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                {t("Attractive Payment Plan")}
                {project.developer ? ` ${t("from")} ${project.developer}` : ""}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className="glass-panel flex flex-col items-center p-8 text-center"
                  >
                    <div className="font-serif text-4xl font-bold text-secondary">
                      {m.percentage}
                    </div>
                    <div className="mt-3 font-mono text-xs uppercase tracking-widest text-white/70">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DOWNLOAD BROCHURE */}
        {project.brochureUrl && (
          <section className="relative z-10 py-12">
            <div className="container mx-auto px-4">
              <div className="glass-panel flex flex-col items-center justify-between gap-6 p-10 md:flex-row">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {t("Download Brochure")}
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    {t("Get the full project brochure with floor plans and pricing.")}
                  </p>
                </div>
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0A1628] transition hover:bg-secondary/90"
                >
                  <Download className="h-4 w-4" /> {t("Download Brochure")}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* LOCATION MAP */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
              {t("Location")}
            </h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                title={`${project.name} location map`}
                src={mapSrc}
                className="h-[360px] w-full md:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* PROJECT MATERIALS */}
        {hasMaterials && (
          <section className="relative z-10 py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                {t("Project Materials")}
              </h2>
              {(floorPlanPdfUrl || brochurePdfUrl) && (
                <div className="mb-8 flex flex-wrap gap-4">
                  {floorPlanPdfUrl && (
                    <a
                      href={floorPlanPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-mono text-sm uppercase tracking-widest text-white transition hover:border-secondary hover:bg-secondary/10"
                      data-testid="link-floorplan-pdf"
                    >
                      <Download className="h-4 w-4 text-secondary" />
                      {t("Download Floor Plan")}
                    </a>
                  )}
                  {brochurePdfUrl && (
                    <a
                      href={brochurePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-mono text-sm uppercase tracking-widest text-white transition hover:border-secondary hover:bg-secondary/10"
                      data-testid="link-brochure-pdf"
                    >
                      <Download className="h-4 w-4 text-secondary" />
                      {t("Download Brochure PDF")}
                    </a>
                  )}
                </div>
              )}
              {materials.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {materials.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={src}
                      alt={`${project.name} material ${i + 1}`}
                      className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </a>
                ))}
              </div>
              )}
            </div>
          </section>
        )}

        {/* GALLERY */}
        {gallery.length > 1 && (
          <section className="relative z-10 py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 font-serif text-2xl font-bold text-white md:text-3xl">
                {t("Gallery")}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* POPULAR QUESTIONS */}
        <Faq />
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}

function LeadForm({
  project,
  t,
}: {
  project: OffPlanProjectModel;
  t: (k: string) => string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const createLead = useCreateLead({
    mutation: {
      onSuccess: () => {
        toast.success(t("Enquiry sent. Our team will be in touch shortly."));
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      },
      onError: (e) =>
        toast.error(e.message || t("Could not send your enquiry. Please try again.")),
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t("Please enter your name"));
      return;
    }
    if (!email.trim() && !phone.trim()) {
      toast.error(t("Please provide an email or phone number"));
      return;
    }
    createLead.mutate({
      data: {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        message:
          message.trim() ||
          `Interested in ${project.name}${project.location ? ` (${project.location})` : ""}`,
        source: `off-plan:${project.slug}`,
      },
    });
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("Full Name")}
        className={inputClass}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("Email")}
        className={inputClass}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t("Phone")}
        className={inputClass}
      />
      <textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("Message")}
        className={inputClass}
      />
      <Button
        type="submit"
        disabled={createLead.isPending}
        className="w-full bg-secondary hover:bg-secondary/90 text-[#0A1628] font-mono uppercase tracking-widest disabled:opacity-60"
      >
        {createLead.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("Enquire Now")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

function Consultation({
  agent,
  project,
  t,
}: {
  agent: Agent;
  project: OffPlanProjectModel;
  t: (k: string) => string;
}) {
  return (
    <section className="relative z-10 border-y border-white/10 bg-white/[0.03] py-16">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div className="flex items-center gap-6">
          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {agent.photoUrl ? (
              <img
                src={storageUrl(agent.photoUrl)}
                alt={agent.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-serif text-white/40">
                {agent.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-secondary">
              {t("Get a Free Consultation")}
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
              {agent.name}
            </h2>
            {agent.title && (
              <p className="mt-1 font-mono text-sm text-white/60">{agent.title}</p>
            )}
            <div className="mt-4 space-y-2 font-mono text-sm text-white/70">
              {agent.phone && (
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 transition hover:text-secondary"
                >
                  <Phone className="h-4 w-4 text-secondary" /> {agent.phone}
                </a>
              )}
              {agent.email && (
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 transition hover:text-secondary"
                >
                  <Mail className="h-4 w-4 text-secondary" /> {agent.email}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="glass-panel p-8">
          <h3 className="mb-6 font-serif text-xl font-bold text-white">
            {t("Get a free consultation from our sales team")}
          </h3>
          <LeadForm project={project} t={t} />
        </div>
      </div>
    </section>
  );
}
