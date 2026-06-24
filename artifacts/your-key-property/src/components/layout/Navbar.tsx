import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/lib/currency";
import { useLanguage } from "@/lib/language";
import { GetInTouchDialog } from "@/components/shared/GetInTouchDialog";

const WHATSAPP_URL = "https://wa.link/hwu3q8";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const propertyLinks = [
    { name: t("nav.allProperties"), href: "/properties" },
    { name: t("nav.offPlan"), href: "/off-plan" },
    { name: t("nav.sale"), href: "/properties?purpose=sale" },
    { name: t("nav.rent"), href: "/properties?purpose=rent" },
  ];

  const aboutLinks = [
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.insights"), href: "/blog" },
    { name: t("nav.agents"), href: "/agents" },
  ];

  const midLinks = [
    { name: t("nav.communities"), href: "/communities" },
    { name: t("nav.investment"), href: "/investment" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A1628]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg" : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="cursor-pointer">
            <img
              src="/images/yourkey-logo-white.png"
              alt="Your Key Property Management"
              className="h-10 md:h-12 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-mono uppercase tracking-[3px] text-white/80 hover:text-white transition-colors cursor-pointer outline-none">
              {t("nav.properties")} <span className="text-[8px]">▼</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-[#0A1628]/95 backdrop-blur-md border-white/20">
              {propertyLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="cursor-pointer font-mono text-xs uppercase tracking-[3px] text-white focus:bg-white/10 focus:text-secondary">
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {midLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-xs font-mono uppercase tracking-[3px] transition-colors cursor-pointer ${
                  location === link.href ? "text-secondary font-bold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-mono uppercase tracking-[3px] text-white/80 hover:text-white transition-colors cursor-pointer outline-none">
              {t("nav.about")} <span className="text-[8px]">▼</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-[#0A1628]/95 backdrop-blur-md border-white/20">
              {aboutLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="cursor-pointer font-mono text-xs uppercase tracking-[3px] text-white focus:bg-white/10 focus:text-secondary">
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact">
            <span
              className={`text-xs font-mono uppercase tracking-[3px] transition-colors cursor-pointer ${
                location === "/contact" ? "text-secondary font-bold" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.contact")}
            </span>
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5 pl-3">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-mono font-bold text-white outline-none uppercase">
              {lang === "ar" ? "AR" : "EN"} <span className="text-[8px]">▼</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0A1628]/95 backdrop-blur-md border-white/20">
              <DropdownMenuItem onClick={() => setLang("en")} className={`cursor-pointer font-mono text-xs focus:bg-white/10 ${lang === "en" ? "text-secondary font-bold" : "text-white"}`}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("ar")} className={`cursor-pointer font-mono text-xs focus:bg-white/10 ${lang === "ar" ? "text-secondary font-bold" : "text-white"}`}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xs font-mono font-bold text-white outline-none">
              {currency} <span className="text-[8px]">▼</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0A1628]/95 backdrop-blur-md border-white/20">
              {(["AED", "USD", "GBP", "EUR", "INR"] as const).map(c => (
                <DropdownMenuItem 
                  key={c} 
                  onClick={() => setCurrency(c)}
                  className={`cursor-pointer font-mono text-xs focus:bg-white/10 ${currency === c ? "text-secondary font-bold" : "text-white"}`}
                >
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white hover:text-[#25D366] transition-colors">
            <SiWhatsapp className="w-5 h-5" />
          </a>

          <a href="tel:+971506692770" aria-label="Call" className="flex items-center gap-2 text-white font-mono text-xs hover:text-secondary transition-colors whitespace-nowrap">
            <Phone className="w-4 h-4 text-secondary" />
            <span className="hidden 2xl:inline">+971 50 669 2770</span>
          </a>

          <Link href="/crm">
            <span className="text-[10px] font-mono uppercase tracking-[3px] text-white/50 hover:text-secondary transition-colors cursor-pointer">
              {t("nav.crm")}
            </span>
          </Link>

          <GetInTouchDialog>
            <Button className="bg-secondary hover:bg-secondary/90 text-[#0A1628] rounded-none px-4 xl:px-6 font-mono text-xs uppercase tracking-widest transition-colors font-bold">
              {t("nav.getInTouch")}
            </Button>
          </GetInTouchDialog>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A1628]/95 backdrop-blur-xl border-l border-white/10 p-6 w-[300px] overflow-y-auto">
              <div className="flex flex-col gap-7 mt-12">
                {[...propertyLinks, ...midLinks, ...aboutLinks, { name: t("nav.contact"), href: "/contact" }].map((link) => (
                  <Link key={link.href + link.name} href={link.href}>
                    <span
                      className={`text-sm font-mono uppercase tracking-[3px] transition-colors cursor-pointer ${
                        location === link.href ? "text-secondary" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <div className="h-px bg-white/10 w-full" />
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-3">
                    <select 
                      value={lang} 
                      onChange={(e) => setLang(e.target.value as "en" | "ar")}
                      className="bg-white/10 px-2 py-2 text-xs font-mono font-bold text-white rounded-none border border-white/20 outline-none"
                    >
                      <option value="en" className="bg-[#0A1628]">EN</option>
                      <option value="ar" className="bg-[#0A1628]">AR</option>
                    </select>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="bg-white/10 px-2 py-2 text-xs font-mono font-bold text-white rounded-none border border-white/20 outline-none"
                    >
                      <option value="AED" className="bg-[#0A1628]">AED</option>
                      <option value="USD" className="bg-[#0A1628]">USD</option>
                      <option value="GBP" className="bg-[#0A1628]">GBP</option>
                      <option value="EUR" className="bg-[#0A1628]">EUR</option>
                      <option value="INR" className="bg-[#0A1628]">INR</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center gap-2 text-white hover:text-[#25D366]">
                      <SiWhatsapp className="w-5 h-5" />
                      <span className="text-xs font-mono">WhatsApp</span>
                    </a>
                  </div>

                  <a href="tel:+971506692770" className="flex items-center gap-3 text-white font-mono text-sm">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span>+971 50 669 2770</span>
                  </a>

                  <GetInTouchDialog>
                    <Button className="bg-secondary hover:bg-secondary/90 text-[#0A1628] rounded-none w-full font-mono text-xs uppercase tracking-widest font-bold">
                      {t("nav.getInTouch")}
                    </Button>
                  </GetInTouchDialog>

                  <Link href="/crm">
                    <span className="text-[10px] font-mono uppercase tracking-[3px] text-white/40 hover:text-secondary cursor-pointer">
                      {t("nav.crm")}
                    </span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
