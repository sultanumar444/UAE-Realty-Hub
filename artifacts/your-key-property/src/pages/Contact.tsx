import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 border border-border">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send an Enquiry</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm" />
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm"></textarea>
                <Button type="button" className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 rounded-none">Submit Enquiry</Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Our Offices</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-2">Abu Dhabi HQ</h3>
                  <p className="text-muted-foreground text-sm">Al Bateen, Abu Dhabi, UAE<br/>+971 2 555 1234</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Dubai Branch</h3>
                  <p className="text-muted-foreground text-sm">Business Bay, Dubai, UAE<br/>+971 4 555 5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
