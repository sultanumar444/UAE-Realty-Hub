import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Properties", href: "#properties" },
    { name: "About", href: "#about" },
    { name: "Locations", href: "#locations" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex flex-col">
          <span className={`font-serif text-2xl font-semibold tracking-wide ${isScrolled ? "text-foreground" : "text-white"}`}>
            YOUR KEY
          </span>
          <span className={`text-[0.65rem] tracking-[0.2em] uppercase ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>
            Property Management
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide uppercase transition-colors ${
                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button
            variant={isScrolled ? "default" : "outline"}
            className={isScrolled ? "" : "bg-transparent text-white border-white/30 hover:bg-white hover:text-black"}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Inquire Now
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium p-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="w-full mt-2"
            onClick={() => {
              setIsOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Inquire Now
          </Button>
        </div>
      )}
    </motion.header>
  );
}
