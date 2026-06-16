import { Switch, Route } from "wouter";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { OffPlan } from "./pages/OffPlan";
import { Communities } from "./pages/Communities";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import NotFound from "./pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/off-plan" component={OffPlan} />
      <Route path="/communities" component={Communities} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
