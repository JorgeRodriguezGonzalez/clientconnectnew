import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, TrendingUp, FileText, BarChart, Link2, Users } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Keyword Research",
    description: "In-depth analysis to find the most valuable keywords for your business.",
  },
  {
    icon: FileText,
    title: "On-Page SEO",
    description: "Optimize your website's content, meta tags, and structure for search engines.",
  },
  {
    icon: Link2,
    title: "Link Building",
    description: "Earn high-quality backlinks from authoritative Australian websites.",
  },
  {
    icon: BarChart,
    title: "Performance Tracking",
    description: "Detailed monthly reports showing your rankings and organic traffic growth.",
  },
];

const benefits = [
  "Increase organic traffic by 150-300% within 6-12 months",
  "Rank on page 1 for your most valuable keywords",
  "Build long-term sustainable visibility",
  "Lower cost per acquisition compared to paid ads",
  "Establish authority in your industry",
  "Capture customers at every stage of the buying journey",
];

const faqs = [
  {
    question: "How long does SEO take to work?",
    answer: "Typically, you'll start seeing initial results within 3-4 months, with significant improvements by 6-12 months. SEO is a long-term strategy that builds momentum over time.",
  },
  {
    question: "What's included in your SEO service?",
    answer: "Our comprehensive SEO includes keyword research, technical SEO audit and fixes, on-page optimization, content strategy, link building, local SEO (if applicable), and monthly reporting.",
  },
  {
    question: "Do you guarantee rankings?",
    answer: "We don't guarantee specific rankings as search engines constantly change their algorithms. However, we guarantee our best efforts and a data-driven approach that has consistently delivered results for our clients.",
  },
  {
    question: "Will I need to keep paying for SEO?",
    answer: "SEO is an ongoing process. While results compound over time, you'll need consistent effort to maintain and improve rankings, especially as competitors also optimize their sites.",
  },
];

const SEOService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                  <Search className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">SEO Services</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Rank Higher on Google. Get More Customers.
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  Our proven SEO strategies help Sydney businesses dominate search results and 
                  drive qualified organic traffic that converts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Get Free SEO Audit</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Book Consultation</Link>
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
                    <div className="text-4xl font-bold text-secondary mb-2">+285%</div>
                    <div className="text-text-medium">Average organic traffic increase</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">Top 3</div>
                    <div className="text-text-medium">Average ranking position achieved</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">6-12</div>
                    <div className="text-text-medium">Months to see significant results</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is SEO */}
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
                  Why SEO Matters for Sydney Businesses
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    When your potential customers search for your products or services on Google, 
                    where does your business appear? If you're not on page 1, you're invisible to 
                    75% of searchers.
                  </p>
                  <p>
                    SEO (Search Engine Optimization) is the process of improving your website's 
                    visibility in search results. Unlike paid ads, SEO builds long-term, sustainable 
                    traffic that doesn't stop when you stop paying.
                  </p>
                  <p>
                    For Sydney businesses, local SEO is especially crucial. We help you rank for 
                    searches like "best [your service] in Sydney" and appear in Google's local map pack.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How We Do It */}
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
                Our SEO Process
              </h2>
              <p className="text-lg text-text-medium">
                A comprehensive, data-driven approach to sustainable search visibility.
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

        {/* Benefits */}
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
                  What You Can Expect
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

        {/* FAQs */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-text-medium">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
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
                Ready to Dominate Google Search?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get a free SEO audit and discover your opportunities for growth.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Your Free SEO Audit</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SEOService;
