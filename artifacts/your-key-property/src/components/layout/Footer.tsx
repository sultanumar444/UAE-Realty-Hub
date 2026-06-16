import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-serif font-bold text-white leading-none tracking-wide">
                YOUR KEY
              </span>
              <span className="text-[10px] font-sans font-semibold text-secondary tracking-widest mt-1">
                PROPERTY MANAGEMENT
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Your Key to UAE Real Estate. Abu Dhabi & Dubai's trusted property experts for buying, selling, renting, and investing.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/properties"><span className="text-white/70 hover:text-secondary transition-colors cursor-pointer text-sm">Properties</span></Link></li>
              <li><Link href="/off-plan"><span className="text-white/70 hover:text-secondary transition-colors cursor-pointer text-sm">Off-Plan</span></Link></li>
              <li><Link href="/communities"><span className="text-white/70 hover:text-secondary transition-colors cursor-pointer text-sm">Communities</span></Link></li>
              <li><Link href="/about"><span className="text-white/70 hover:text-secondary transition-colors cursor-pointer text-sm">About Us</span></Link></li>
              <li><Link href="/contact"><span className="text-white/70 hover:text-secondary transition-colors cursor-pointer text-sm">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><span className="text-white/70 text-sm">Buy Property</span></li>
              <li><span className="text-white/70 text-sm">Sell Property</span></li>
              <li><span className="text-white/70 text-sm">Rent & Lease</span></li>
              <li><span className="text-white/70 text-sm">Property Management</span></li>
              <li><span className="text-white/70 text-sm">Investment Advisory</span></li>
              <li><span className="text-white/70 text-sm">Free Valuation</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Abu Dhabi</span>
                <span className="text-white/70 text-sm">Al Bateen, Abu Dhabi, UAE</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Dubai</span>
                <span className="text-white/70 text-sm">Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Phone</span>
                <span className="text-secondary text-sm font-semibold">+971 2 555 1234</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Email</span>
                <span className="text-white/70 text-sm">info@yourkeyproperty.ae</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Your Key Property Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <span>RERA License No. 12345</span>
            <span>DED License No. 67890</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
