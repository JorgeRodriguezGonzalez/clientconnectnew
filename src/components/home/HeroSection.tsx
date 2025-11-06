import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container-custom py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sydney's Premier Digital Marketing Agency</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connecting Businesses with Their{" "}
              <span className="text-gradient-primary">Ideal Clients</span>
            </h1>
            
            <p className="text-lg text-text-medium max-w-xl">
              We help Sydney businesses grow through strategic digital marketing. From SEO to social media, 
              we deliver measurable results that drive real business growth.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-text-light">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-text-light">Client Retention</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-text-light">Years Experience</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 items-center pt-6">
              <div className="flex items-center gap-2 text-sm text-text-light">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>Google Partner</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-light">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>Facebook Marketing Partner</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-light">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>Award-Winning Team</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Sydney cityscape with modern business district"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="text-2xl font-bold text-secondary mb-1">+250%</div>
              <div className="text-sm text-text-medium">Average Client Growth</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
