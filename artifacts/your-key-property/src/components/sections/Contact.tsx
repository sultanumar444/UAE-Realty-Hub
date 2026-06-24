import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary text-secondary-foreground border-t border-white/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Private Consultation
            </span>
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Connect With Our Advisors
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-md">
              Whether you are acquiring a new asset or seeking to optimize your portfolio, our specialized advisors are ready to assist with utmost discretion.
            </p>
            
            <div className="space-y-6 text-white/80">
              <div>
                <p className="text-sm uppercase tracking-wider text-white/50 mb-1">Office</p>
                <p>Boulevard Plaza Tower 1, Level 14</p>
                <p>Downtown Dubai, UAE</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-white/50 mb-1">Contact</p>
                <p>+971 4 555 0000</p>
                <p>advisory@yourkey.ae</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background text-foreground p-8 md:p-12 shadow-2xl"
          >
            <h3 className="text-2xl mb-8">Inquiry Form</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+971 50 000 0000" className="rounded-xl border-border" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl border-border" />
              </div>
              
              <div className="space-y-2">
                <Label>Interest</Label>
                <Select>
                  <SelectTrigger className="rounded-xl border-border w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buying Property</SelectItem>
                    <SelectItem value="sell">Selling Property</SelectItem>
                    <SelectItem value="rent">Renting Property</SelectItem>
                    <SelectItem value="manage">Property Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="How can we assist you?" 
                  className="min-h-[120px] rounded-xl border-border resize-none" 
                />
              </div>
              
              <Button type="submit" className="w-full rounded-xl h-12 text-md tracking-wider uppercase">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
