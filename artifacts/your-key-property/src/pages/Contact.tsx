import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Reach Out</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Contact Us</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-10"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-8">Send an Enquiry</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm"></textarea>
                </div>
                <Button type="button" className="w-full bg-secondary hover:bg-secondary/90 text-[#0A1628] font-bold font-mono uppercase tracking-widest py-6 rounded-none mt-4">Submit Enquiry</Button>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-8">Our Offices</h2>
              <div className="space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="font-mono font-bold text-secondary uppercase tracking-widest mb-4">Abu Dhabi HQ</h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                    Al Bateen, Abu Dhabi<br/>
                    United Arab Emirates
                  </p>
                  <p className="text-white font-mono text-lg">+971 2 555 1234</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="font-mono font-bold text-secondary uppercase tracking-widest mb-4">Dubai Branch</h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                    Business Bay, Dubai<br/>
                    United Arab Emirates
                  </p>
                  <p className="text-white font-mono text-lg">+971 4 555 5678</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <div className="relative z-10 bg-[#0f172a]">
        <Footer />
      </div>
    </div>
  );
}