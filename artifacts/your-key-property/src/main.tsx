import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CurrencyProvider } from "./lib/currency";
import { FavoritesProvider } from "./lib/favorites";

createRoot(document.getElementById("root")!).render(
  <CurrencyProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </CurrencyProvider>
);
