import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./global.css";
import AuthProvider from "./context/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { stores, StoreContext } from "./stores.ts";
import HttpService from "./services/HttpService.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

HttpService.configure();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={stores}>
        <BrowserRouter>
          <AuthProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </StoreContext.Provider>,
    </QueryClientProvider>
  </React.StrictMode>
);
