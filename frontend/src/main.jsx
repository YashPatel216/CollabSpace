import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import {BrowserRouter} from 'react-router'
import "./index.css";
import {Toaster} from 'react-hot-toast'
import App from "./App.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from "./providers/AuthProvider.jsx";


const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key! Please add VITE_CLERK_PUBLISHABLE_KEY in .env.local");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
       <QueryClientProvider client={queryClient}>
       <AuthProvider>
      <App />
      </AuthProvider>
      <Toaster/>
      </QueryClientProvider>
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
