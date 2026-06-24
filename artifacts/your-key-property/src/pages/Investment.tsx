import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MortgageTools } from "@/components/shared/MortgageTools";

export function Investment() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Investment Tools
            </h1>
            <p className="text-xl text-white/80 font-mono">
              Data-driven insights to model your returns from altitude. 
              Visualize equity growth, rental yields, and overall profitability.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <MortgageTools />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}