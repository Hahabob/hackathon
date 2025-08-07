import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./contexts/SideBarContext";
import { SearchProvider } from "./contexts/SearchContext";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";
import "./index.css";

import CartProvider from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SearchProvider>
      <AuthProvider>
        <SidebarProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              <App />
            </CartProvider>
          </QueryClientProvider>
        </SidebarProvider>
      </AuthProvider>
    </SearchProvider>
  </ThemeProvider>
);
