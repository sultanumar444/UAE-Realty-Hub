import { Switch, Route } from "wouter";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { OffPlan } from "./pages/OffPlan";
import { OffPlanProject } from "./pages/OffPlanProject";
import { Communities } from "./pages/Communities";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { MortgageCalculatorPage } from "./pages/MortgageCalculator";
import { Favorites } from "./pages/Favorites";
import { Investment } from "./pages/Investment";
import { Agents } from "./pages/Agents";
import { AgentProfile } from "./pages/AgentProfile";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Crm } from "./pages/Crm";
import NotFound from "./pages/not-found";
import { SignInPage, RequireAuth } from "./auth/clerk";
import { SiWhatsapp } from "react-icons/si";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { AtmosphericBackground } from "./components/shared/AtmosphericBackground";
import { AltitudeRail } from "./components/shared/AltitudeRail";
import { Toaster } from "./components/ui/sonner";

function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {showTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 bg-primary/80 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-all border border-white/20"
          aria-label="Scroll to top"
          data-testid="btn-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <a 
        href="https://wa.link/hwu3q8"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#25D366]/90 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform animate-pulse"
        aria-label="WhatsApp"
        data-testid="btn-whatsapp"
      >
        <SiWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}

function App() {
  return (
    <>
      <AtmosphericBackground />
      <AltitudeRail />
      <div className="relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/properties" component={Properties} />
          <Route path="/properties/:id" component={PropertyDetail} />
          <Route path="/off-plan/:slug" component={OffPlanProject} />
          <Route path="/off-plan" component={OffPlan} />
          <Route path="/communities" component={Communities} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/mortgage-calculator" component={MortgageCalculatorPage} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/investment" component={Investment} />
          <Route path="/agents/:id" component={AgentProfile} />
          <Route path="/agents" component={Agents} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/crm">
            <RequireAuth>
              <Crm />
            </RequireAuth>
          </Route>
          <Route path="/crm/:rest*">
            <RequireAuth>
              <Crm />
            </RequireAuth>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
      <FloatingButtons />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
