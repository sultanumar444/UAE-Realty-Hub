import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/10 text-white pt-24 pb-8 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <img
                src="/images/yourkey-logo-white.png"
                alt="Your Key Property Management"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-white/60 text-sm font-mono leading-relaxed mb-8">
              Your Key to UAE Real Estate. Abu Dhabi & Dubai's trusted property experts for buying, selling, renting, and investing.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/yourkeypropertymanagementllc" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.instagram.com/yourkeypropertymanagement/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/yourkeypropertymanagement" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
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
              <li><Link href="/blog"><span className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-mono">Insights</span></Link></li>
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
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Dubai Office</span>
                <span className="text-white/80 text-sm font-mono leading-relaxed">Office 17, 35th Floor, Al Saqr Business Tower, DIFC, Dubai</span>
                <a href="tel:+971506692770" className="text-secondary text-sm font-mono mt-1 hover:underline">+971 50 669 2770</a>
              </li>
              <li className="flex flex-col">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Abu Dhabi Office</span>
                <span className="text-white/80 text-sm font-mono leading-relaxed">Office M01, Al Mansouri Building, Al Gheel St, Al Danah, Abu Dhabi</span>
                <a href="tel:+971544517999" className="text-secondary text-sm font-mono mt-1 hover:underline">+971 54 451 7999</a>
              </li>
              <li className="flex flex-col pt-4 border-t border-white/10">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:main@yourkey.ae" className="text-secondary text-sm font-mono hover:underline">main@yourkey.ae</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-mono">
            © {new Date().getFullYear()} Your Key Property Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-mono">
            <span>Licensed Real Estate Brokerage</span>
            <span>Dubai &middot; Abu Dhabi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}