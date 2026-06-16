export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10 text-white/60">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-semibold tracking-wide text-white block mb-2">
              YOUR KEY
            </span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 block mb-6">
              Property Management
            </span>
            <p className="max-w-sm text-sm leading-relaxed">
              The premier luxury real estate brokerage in the United Arab Emirates, delivering exceptional properties to exceptional clients.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#locations" className="hover:text-white transition-colors">Locations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ORN: 12345</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm">
          <p>&copy; {new Date().getFullYear()} Your Key Property Management. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
