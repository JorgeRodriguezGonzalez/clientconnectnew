import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bg-light border-t">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">Client Connect</span>
              <span className="text-xs text-text-medium">AUSTRALIA</span>
            </div>
            <p className="text-sm text-text-medium">
              Connecting Businesses with Their Ideal Clients
            </p>
            <p className="text-sm text-text-light">
              Proudly serving Sydney businesses since 2018
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-dark mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-text-medium hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-text-dark mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/seo" className="text-sm text-text-medium hover:text-primary transition-colors">
                  SEO
                </Link>
              </li>
              <li>
                <Link to="/services/google-ads" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link to="/services/web-design" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-management" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-ads" className="text-sm text-text-medium hover:text-primary transition-colors">
                  Social Media Advertising
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-text-dark mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-text-medium">
              <li>Sydney, Australia</li>
              <li>
                <a href="mailto:hello@clientconnect.com.au" className="hover:text-primary transition-colors">
                  hello@clientconnect.com.au
                </a>
              </li>
              <li>
                <a href="tel:+61-2-xxxx-xxxx" className="hover:text-primary transition-colors">
                  +61 2 xxxx xxxx
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-text-medium hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-medium hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-medium hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-medium hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-light">
          <p>&copy; 2024 Client Connect Australia. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
