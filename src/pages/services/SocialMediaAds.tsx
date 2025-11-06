import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Target, Users, BarChart, Zap, DollarSign } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Precise Targeting",
    description: "Reach your exact audience based on demographics, interests, and behaviors.",
  },
  {
    icon: Zap,
    title: "Creative Ad Design",
    description: "Eye-catching visuals and copy that stop the scroll and drive action.",
  },
  {
    icon: DollarSign,
    title: "Budget Optimization",
    description: "Smart spend allocation to maximize your return on ad spend.",
  },
  {
    icon: BarChart,
    title: "Performance Tracking",
    description: "Detailed analytics showing your cost per lead, conversion rate, and ROI.",
  },
];

const benefits = [
  "Reach thousands of potential customers in Sydney",
  "Target people based on specific interests and behaviors",
  "Retarget website visitors to increase conversions",
  "Scale winning campaigns quickly and efficiently",
  "Lower cost per acquisition than traditional advertising",
  "Full transparency with detailed performance reports",
];

const SocialMediaAds = () => {
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
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Social Media Advertising</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Turn Social Media Into Your Best Lead Source
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  Reach your ideal customers on Facebook, Instagram, and LinkedIn with precision-targeted 
                  campaigns that deliver real ROI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Start Advertising</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Get Free Audit</Link>
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
                    <div className="text-4xl font-bold text-primary mb-2">4.2x</div>
                    <div className="text-text-medium">Average return on ad spend (ROAS)</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">-52%</div>
                    <div className="text-text-medium">Average cost per lead reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">2.1M+</div>
                    <div className="text-text-medium">People reached across Sydney</div>
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
                  Why Social Media Advertising Works
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    Facebook and Instagram have over 18 million active users in Australia. Your ideal 
                    customers are already there – you just need to get in front of them.
                  </p>
                  <p>
                    Social media advertising offers targeting capabilities that traditional advertising 
                    can't match. You can target people based on their location, interests, job titles, 
                    buying behaviors, and even life events.
                  </p>
                  <p>
                    Better yet, with retargeting campaigns, you can stay top-of-mind with people who've 
                    visited your website but haven't converted yet – dramatically increasing your conversion rates.
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
                Our Advertising Approach
              </h2>
              <p className="text-lg text-text-medium">
                Strategic campaigns designed to deliver maximum ROI.
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
                  Campaign Benefits
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
                Start Generating Leads Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's create a social media advertising strategy that drives real business growth.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Your Free Strategy</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialMediaAds;
