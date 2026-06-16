import { createRoot } from "react-dom/client";
import { Router as WouterRouter } from "wouter";
import App from "./App";
import "./index.css";
import { CurrencyProvider } from "./lib/currency";
import { FavoritesProvider } from "./lib/favorites";
import { ClerkProviderWithRoutes, basePath } from "./auth/clerk";

createRoot(document.getElementById("root")!).render(
  <WouterRouter base={basePath}>
    <ClerkProviderWithRoutes>
      <CurrencyProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CurrencyProvider>
    </ClerkProviderWithRoutes>
  </WouterRouter>
);
