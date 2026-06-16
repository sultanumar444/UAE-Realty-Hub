import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: "Properties", href: "/properties" },
  { name: "Off-Plan", href: "/off-plan" },
  { name: "Communities", href: "/communities" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

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
