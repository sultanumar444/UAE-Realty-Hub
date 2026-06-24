import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/language";

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const createLead = useCreateLead({
    mutation: {
      onSuccess: () => {
        toast.success(t("Enquiry sent. Our team will be in touch shortly."));
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      },
      onError: (e) =>
        toast.error(e.message || t("Could not send your enquiry. Please try again.")),
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t("Please enter your name"));
      return;
    }
    if (!email.trim() && !phone.trim()) {
      toast.error(t("Please provide an email or phone number"));
      return;
    }
    createLead.mutate({
      data: {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        message: message.trim() || undefined,
        source: "contact-form",
      },
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">{t("Reach Out")}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{t("Contact Us")}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-10"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-8">{t("Send an Enquiry")}</h2>
              <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{t("Full Name")}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{t("Email Address")}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{t("Phone Number")}</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{t("Message")}</label>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm"></textarea>
                </div>
                <Button type="submit" disabled={createLead.isPending} className="w-full bg-secondary hover:bg-secondary/90 text-[#0A1628] font-bold font-mono uppercase tracking-widest py-6 rounded-lg mt-4 flex items-center justify-center gap-2">
                  {createLead.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {createLead.isPending ? t("Sending...") : t("Submit Enquiry")}
                </Button>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-8">{t("Our Offices")}</h2>
              <div className="space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="font-mono font-bold text-secondary uppercase tracking-widest mb-4">{t("Dubai Office")}</h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                    {t("Office 17, 35th Floor, Al Saqr Business Tower,")}<br/>
                    {t("DIFC, Dubai, United Arab Emirates")}
                  </p>
                  <a href="tel:+971506692770" className="text-white font-mono text-lg hover:text-secondary transition-colors">+971 50 669 2770</a>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="font-mono font-bold text-secondary uppercase tracking-widest mb-4">{t("Abu Dhabi Office")}</h3>
                  <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                    {t("Office M01, Al Mansouri Building, Al Gheel Street,")}<br/>
                    {t("Al Danah, Abu Dhabi, United Arab Emirates")}
                  </p>
                  <a href="tel:+971544517999" className="text-white font-mono text-lg hover:text-secondary transition-colors">+971 54 451 7999</a>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="font-mono font-bold text-secondary uppercase tracking-widest mb-4">{t("Email")}</h3>
                  <a href="mailto:main@yourkey.ae" className="text-white font-mono text-lg hover:text-secondary transition-colors">main@yourkey.ae</a>
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
