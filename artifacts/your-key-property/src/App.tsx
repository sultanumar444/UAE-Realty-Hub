import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Locations } from "@/components/sections/Locations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedProperties />
        <WhyChooseUs />
        <Locations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
