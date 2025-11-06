import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MousePointerClick, Target, DollarSign, BarChart, TrendingUp, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Campaign Strategy",
    description: "Custom campaigns targeting your ideal customers at the right time.",
  },
  {
    icon: Zap,
    title: "Ad Creation",
    description: "Compelling ad copy and extensions that maximize click-through rates.",
  },
  {
    icon: DollarSign,
    title: "Bid Management",
    description: "Smart bidding strategies that get you the best ROI.",
  },
  {
    icon: BarChart,
    title: "Conversion Tracking",
    description: "Track every lead and sale to prove real business impact.",
  },
];

const benefits = [
  "Immediate visibility on Google search results",
  "Pay only when someone clicks your ad",
  "Target customers ready to buy right now",
  "Full control over your daily budget",
  "Detailed analytics showing exactly what works",
  "Scale up quickly when you find winning campaigns",
];

const GoogleAds = () => {
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
                <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-6">
                  <MousePointerClick className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Google Ads Management</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get Instant Visibility. Drive Qualified Traffic.
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  Our Google Ads experts create and manage high-performing campaigns that 
                  deliver measurable ROI for Sydney businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Get Free Audit</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Book Strategy Call</Link>
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
                    <div className="text-4xl font-bold text-secondary mb-2">3.8x</div>
                    <div className="text-text-medium">Average return on ad spend (ROAS)</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">-45%</div>
                    <div className="text-text-medium">Average cost per acquisition reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
                    <div className="text-text-medium">Campaign monitoring and optimization</div>
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
                  Why Google Ads for Your Sydney Business?
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    Google Ads puts your business at the top of search results instantly. While SEO 
                    builds long-term visibility, Google Ads delivers immediate traffic and leads.
                  </p>
                  <p>
                    The key is doing it right. Many businesses waste thousands on poorly managed campaigns. 
                    Our certified Google Ads experts ensure every dollar you spend works hard for your business.
                  </p>
                  <p>
                    We specialize in Sydney market campaigns, understanding local search behavior and 
                    competition to give you maximum advantage.
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
                Our Google Ads Management
              </h2>
              <p className="text-lg text-text-medium">
                Comprehensive campaign management that delivers results.
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
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-secondary" />
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
                  What You Get
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
                      <TrendingUp className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <span className="text-lg text-text-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-br from-secondary to-secondary/90">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Start Getting More Leads Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get a free Google Ads account audit and discover how to improve your ROI.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90" asChild>
                <Link to="/contact">Get Free Ads Audit</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleAds;
