import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { name: "SEO", path: "/services/seo" },
    { name: "Google Ads", path: "/services/google-ads" },
    { name: "Web Design", path: "/services/web-design" },
    { name: "Social Media Management", path: "/services/social-media-management" },
    { name: "Social Media Advertising", path: "/services/social-media-ads" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">Client Connect</span>
              <span className="text-xs text-text-medium">AUSTRALIA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-text-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium text-text-medium hover:text-primary transition-colors">
                Services
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2 text-sm text-text-medium hover:bg-bg-light hover:text-primary transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/about" className="text-sm font-medium text-text-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-text-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Button asChild>
              <Link to="/contact">Get Free Audit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-sm font-medium text-text-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-dark">Services</p>
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block py-2 pl-4 text-sm text-text-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium text-text-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium text-text-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full mt-4">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Free Audit</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
