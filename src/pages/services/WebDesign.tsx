import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Rocket, Palette, TrendingUp, Code } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Custom Design",
    description: "Unique designs that reflect your brand and stand out from competitors.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Perfectly optimized for mobile devices where most traffic comes from.",
  },
  {
    icon: Rocket,
    title: "Conversion Focused",
    description: "Every element designed to turn visitors into customers.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Fast-loading, SEO-friendly, and easy to maintain.",
  },
];

const benefits = [
  "Professional design that builds trust and credibility",
  "Fast loading times for better user experience and SEO",
  "Mobile-responsive design that works on all devices",
  "Strategic layout that guides visitors to take action",
  "Easy-to-use content management system (CMS)",
  "Ongoing support and maintenance available",
];

const WebDesign = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Web Design & Development</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Websites That Turn Visitors Into Customers
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  We create beautiful, high-converting websites that represent your Sydney business 
                  perfectly and drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">See Our Work</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">2-4</div>
                    <div className="text-text-medium">Weeks to launch your new website</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">+180%</div>
                    <div className="text-text-medium">Average conversion rate improvement</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-text-medium">Mobile responsive & SEO optimized</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Website is Your Best Salesperson
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    In today's digital world, your website is often the first impression potential 
                    customers have of your business. A poorly designed website can cost you thousands 
                    in lost revenue.
                  </p>
                  <p>
                    We build websites that not only look great but are strategically designed to convert 
                    visitors into customers. Every element – from the color scheme to the call-to-action 
                    buttons – is carefully planned based on proven conversion principles.
                  </p>
                  <p>
                    Plus, all our websites are built with SEO in mind, giving you a head start in 
                    ranking on Google.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Deliver
              </h2>
              <p className="text-lg text-text-medium">
                Premium websites built for performance and results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-medium">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Website Package Includes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span className="text-lg text-text-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-br from-primary to-primary/90">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready for a Website That Works?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's discuss your project and create a website that drives real business results.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Your Free Quote</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WebDesign;
