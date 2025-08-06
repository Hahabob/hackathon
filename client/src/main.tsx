import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./contexts/SideBarContext";
import { SearchProvider } from "./contexts/SearchContext";

import App from "./App";
import "./index.css";

import CartProvider from "./contexts/CartProvider";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SearchProvider>
    <AuthProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </QueryClientProvider>
      </SidebarProvider>
    </AuthProvider>
  </SearchProvider>
);
