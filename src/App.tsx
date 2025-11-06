import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SEO from "./pages/services/SEO";
import GoogleAds from "./pages/services/GoogleAds";
import WebDesign from "./pages/services/WebDesign";
import SocialMediaManagement from "./pages/services/SocialMediaManagement";
import SocialMediaAds from "./pages/services/SocialMediaAds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/google-ads" element={<GoogleAds />} />
          <Route path="/services/web-design" element={<WebDesign />} />
          <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
          <Route path="/services/social-media-ads" element={<SocialMediaAds />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
