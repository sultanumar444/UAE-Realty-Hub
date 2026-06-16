import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/10 text-white pt-24 pb-8 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-serif font-bold text-white leading-none tracking-wide">
                YOUR KEY
              </span>
              <span className="text-xs font-mono font-semibold text-secondary tracking-widest mt-2">
                PROPERTY MANAGEMENT
              </span>
            </div>
            <p className="text-white/60 text-sm font-mono leading-relaxed mb-8">
              Your Key to UAE Real Estate. Abu Dhabi & Dubai's trusted property experts for buying, selling, renting, and investing.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-mono uppercase tracking-widest font-semibold mb-8 text-secondary">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/properties"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Properties</span></Link></li>
              <li><Link href="/off-plan"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Off-Plan</span></Link></li>
              <li><Link href="/communities"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Communities</span></Link></li>
              <li><Link href="/investment"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Investment ROI</span></Link></li>
              <li><Link href="/about"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">About Us</span></Link></li>
              <li><Link href="/contact"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-mono uppercase tracking-widest font-semibold mb-8 text-secondary">Our Services</h4>
            <ul className="space-y-4">
              <li><span className="text-white/70 text-sm font-mono">Buy Property</span></li>
              <li><span className="text-white/70 text-sm font-mono">Sell Property</span></li>
              <li><span className="text-white/70 text-sm font-mono">Rent & Lease</span></li>
              <li><span className="text-white/70 text-sm font-mono">Property Management</span></li>
              <li><span className="text-white/70 text-sm font-mono">Investment Advisory</span></li>
              <li><span className="text-white/70 text-sm font-mono">Free Valuation</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-mono uppercase tracking-widest font-semibold mb-8 text-secondary">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex flex-col">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Abu Dhabi HQ</span>
                <span className="text-white/80 text-sm font-mono">Al Bateen, Abu Dhabi, UAE</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Dubai Office</span>
                <span className="text-white/80 text-sm font-mono">Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex flex-col pt-4 border-t border-white/10">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Direct Line</span>
                <span className="text-secondary text-lg font-mono">+971 2 555 1234</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-mono">
            © {new Date().getFullYear()} Your Key Property Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-mono">
            <span>RERA License No. 12345</span>
            <span>DED License No. 67890</span>
          </div>
        </div>
      </div>
    </footer>
  );
}