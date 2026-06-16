import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/shared/ProjectCard";

export function OffPlan() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Off-Plan Properties</h1>
            <p className="text-lg text-muted-foreground">New Developments in Dubai & Abu Dhabi</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-6 py-2 bg-primary text-white text-sm font-semibold border border-primary">All Projects</button>
            <button className="px-6 py-2 bg-white text-primary hover:bg-muted text-sm font-medium border border-border transition-colors">Dubai</button>
            <button className="px-6 py-2 bg-white text-primary hover:bg-muted text-sm font-medium border border-border transition-colors">Abu Dhabi</button>
            <button className="px-6 py-2 bg-white text-primary hover:bg-muted text-sm font-medium border border-border transition-colors">Emaar</button>
            <button className="px-6 py-2 bg-white text-primary hover:bg-muted text-sm font-medium border border-border transition-colors">Aldar</button>
            <button className="px-6 py-2 bg-white text-primary hover:bg-muted text-sm font-medium border border-border transition-colors">Damac</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              image="/images/render-marina.png"
              title="Marina Heights" developer="Emaar" location="Dubai Marina"
              price="AED 1.2M" handover="Q4 2026" roi="7-9%"
            />
            <ProjectCard 
              image="/images/render-saadiyat.png"
              title="Saadiyat Lagoons" developer="Aldar" location="Saadiyat Island"
              price="AED 2.8M" handover="Q2 2027" roi="6-8%"
            />
            <ProjectCard 
              image="/images/render-yas.png"
              title="Yas Bay Residences" developer="Aldar" location="Yas Island"
              price="AED 980K" handover="Q1 2027" roi="8-10%"
            />
            <ProjectCard 
              image="/images/dubai-skyline.png"
              title="Downtown Views III" developer="Emaar" location="Downtown Dubai"
              price="AED 1.8M" handover="Q3 2026" roi="7%"
            />
            <ProjectCard 
              image="/images/abudhabi-skyline.png"
              title="Reem Hills" developer="Aldar" location="Al Reem Island"
              price="AED 1.5M" handover="Q1 2026" roi="6%"
            />
            <ProjectCard 
              image="/images/luxury-villa.png"
              title="Damac Lagoons" developer="Damac" location="Dubai"
              price="AED 2.1M" handover="Q4 2025" roi="8%"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
