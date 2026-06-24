import { useState } from "react";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  useGetOffPlanProjectBySlug,
  useCreateLead,
  getGetOffPlanProjectBySlugQueryKey,
} from "@workspace/api-client-react";
import { projectHero, projectImage, projectGallery } from "@/lib/offPlanApi";
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
} from "lucide-react";

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
          `Interested in ${project!.name}${project!.location ? ` (${project!.location})` : ""}`,
        source: `off-plan:${project!.slug}`,
      },
    });
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm";

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

            {project.logoImage ? (
              <img
                src={projectImage(project.logoImage)}
                alt={project.developer ?? project.name}
                className="mb-5 h-12 w-auto object-contain"
              />
            ) : project.developer ? (
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
              <p className="mt-4 max-w-2xl font-serif text-lg italic text-white/85 md:text-2xl">
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
              <div className="mb-14">
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

            {gallery.length > 1 && (
              <div className="mb-4">
                <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                  {t("Gallery")}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            )}
          </div>

          {/* SIDEBAR — REGISTER INTEREST */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 glass-panel p-8">
              <h3 className="mb-2 font-serif text-2xl font-bold text-white">
                {t("Register Your Interest")}
              </h3>
              <p className="mb-6 text-sm text-white/60">
                {t("Request the brochure, pricing and payment plan for this project.")}
              </p>
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
                  {createLead.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("Enquire Now")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

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
      </main>

      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}
