import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MortgageCalculator } from "@/components/shared/MortgageCalculator";
import { useLanguage } from "@/lib/language";

export function MortgageCalculatorPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("Mortgage Calculator")}</h1>
            <p className="text-lg text-muted-foreground">{t("Plan your property purchase with our comprehensive UAE mortgage calculator.")}</p>
          </div>
          
          <MortgageCalculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
