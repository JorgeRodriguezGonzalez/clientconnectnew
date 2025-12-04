import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Sparkles } from "lucide-react";

// --- ASSETS & STYLES ---

const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
};

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const Footer = () => {
  return (
    <footer className="relative bg-white pt-20 pb-10 overflow-hidden text-gray-600">
      
      {/* --- TOP BORDER LINE --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      {/* Gradient Blur Bottom (Sutil) */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent -z-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* 1. Company Info */}
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span 
                className="text-2xl font-bold tracking-tight"
                style={{
                  backgroundImage: `linear-gradient(45deg, #1f2937, ${COLORS.turquoise})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Client Connect
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                AUSTRALIA
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Connecting businesses with their ideal clients through data-driven strategies and measurable results.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-100">
              <Sparkles className="w-3 h-3" style={{ color: COLORS.gold }} />
              <span>Serving Sydney since 2018</span>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/seo" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/google-ads" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Google Ads (PPC)
                </Link>
              </li>
              <li>
                <Link to="/services/web-design" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Web Design & Dev
                </Link>
              </li>
              <li>
                <Link to="/services/social-media" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Social Media Strategy
                </Link>
              </li>
              <li>
                <Link to="/services/analytics" className="text-sm hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  Analytics & Reporting
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">HQ:</span>
                <span className="text-gray-600">Sydney, Australia</span>
              </li>
              <li>
                <a href="mailto:hello@clientconnect.com.au" className="block hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  hello@clientconnect.com.au
                </a>
              </li>
              <li>
                <a href="tel:+612xxxxxxxx" className="block hover:text-[rgb(103,188,183)] transition-colors duration-200">
                  +61 2 xxxx xxxx
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <SocialLink href="#" label="Facebook" icon={Facebook} />
              <SocialLink href="#" label="Instagram" icon={Instagram} />
              <SocialLink href="#" label="LinkedIn" icon={Linkedin} />
              <SocialLink href="#" label="Twitter" icon={Twitter} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Client Connect Australia. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-gray-600 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <a 
    href={href} 
    aria-label={label}
    className="group flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white hover:border-[rgb(103,188,183)] hover:bg-[rgb(103,188,183)] transition-all duration-300"
  >
    <Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
  </a>
);

export default Footer;