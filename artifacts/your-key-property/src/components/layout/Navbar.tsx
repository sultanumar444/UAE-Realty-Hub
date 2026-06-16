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
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Mortgage Calculator", href: "/mortgage-calculator" },
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
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex flex-col cursor-pointer">
            <span className="text-2xl font-serif font-bold text-primary leading-none tracking-wide">
              YOUR KEY
            </span>
            <span className="text-[10px] font-sans font-semibold text-secondary tracking-widest mt-1">
              PROPERTY MANAGEMENT
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className={`text-sm font-medium transition-colors hover:text-secondary cursor-pointer ${
                  location === link.href ? "text-secondary" : "text-foreground"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-primary outline-none">
              {currency} ▼
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["AED", "USD", "GBP", "EUR", "INR"] as const).map(c => (
                <DropdownMenuItem 
                  key={c} 
                  onClick={() => setCurrency(c)}
                  className={`cursor-pointer ${currency === c ? "font-bold text-secondary" : ""}`}
                >
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/favorites">
            <div className="relative cursor-pointer text-primary hover:text-secondary transition-colors">
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-2 text-primary font-semibold">
            <Phone className="w-4 h-4 text-secondary" />
            <span>+971 2 555 1234</span>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none px-6">
            List Your Property
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-6 h-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white p-6 w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      className={`text-lg font-medium transition-colors hover:text-secondary cursor-pointer ${
                        location === link.href ? "text-secondary" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <div className="h-px bg-border w-full" />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="bg-muted px-2 py-1 text-sm font-semibold rounded-none border-none outline-none"
                    >
                      <option value="AED">AED</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </select>
                    
                    <Link href="/favorites">
                      <div className="flex items-center gap-2 text-primary cursor-pointer">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-semibold">Saved ({favoriteIds.length})</span>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span>+971 2 555 1234</span>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none w-full">
                    List Your Property
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
