import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/lib/currency";
import { useFavorites } from "@/lib/favorites";

const NAV_LINKS = [
  { name: "Properties", href: "/properties" },
  { name: "Off-Plan", href: "/off-plan" },
  { name: "Communities", href: "/communities" },
  { name: "Investment", href: "/investment" },
  { name: "Insights", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className={`text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                  location === link.href ? "text-secondary font-bold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
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

          <Link href="/favorites">
            <div className="relative cursor-pointer text-white hover:text-secondary transition-colors">
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-[#0A1628] font-mono font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </div>
          </Link>

          <a href="tel:+971506692770" className="flex items-center gap-2 text-white font-mono text-xs hover:text-secondary transition-colors">
            <Phone className="w-4 h-4 text-secondary" />
            <span>+971 50 669 2770</span>
          </a>
          <Link href="/crm">
            <Button className="bg-transparent border border-white/30 hover:bg-white hover:text-[#0A1628] text-white rounded-none px-6 font-mono text-xs uppercase tracking-widest transition-colors">
              List Property
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A1628]/95 backdrop-blur-xl border-l border-white/10 p-6 w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      className={`text-sm font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                        location === link.href ? "text-secondary" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <div className="h-px bg-white/10 w-full" />
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
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
                    
                    <Link href="/favorites">
                      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-secondary">
                        <Heart className="w-5 h-5" />
                        <span className="text-xs font-mono font-bold">Saved ({favoriteIds.length})</span>
                      </div>
                    </Link>
                  </div>
                  
                  <a href="tel:+971506692770" className="flex items-center gap-3 text-white font-mono text-sm">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span>+971 50 669 2770</span>
                  </a>
                  <Link href="/crm">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none w-full font-mono text-xs uppercase tracking-widest">
                      List Your Property
                    </Button>
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