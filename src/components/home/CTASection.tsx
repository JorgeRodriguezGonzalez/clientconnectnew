import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary/90">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your free consultation today and discover how we can help you achieve your business goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Results in 30-90 days</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>100% Transparency</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
