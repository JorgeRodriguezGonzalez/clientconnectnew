import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Share2, Calendar, Users, BarChart, TrendingUp, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Content Planning",
    description: "Strategic content calendar aligned with your business goals.",
  },
  {
    icon: MessageSquare,
    title: "Content Creation",
    description: "Engaging posts, graphics, and videos that resonate with your audience.",
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Active engagement with your followers and prompt responses.",
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description: "Monthly reports showing growth, engagement, and insights.",
  },
];

const benefits = [
  "Build authentic relationships with your audience",
  "Increase brand awareness and recognition",
  "Drive website traffic and generate leads",
  "Establish thought leadership in your industry",
  "Stay top-of-mind with potential customers",
  "Gain valuable customer insights and feedback",
];

const SocialMediaManagement = () => {
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
                  <Share2 className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Social Media Management</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Build Meaningful Connections on Social Media
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  We manage your social media presence so you can focus on running your business. 
                  Engage your audience, build your brand, and drive real business results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/contact">Get Started</Link>
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
                    <div className="text-4xl font-bold text-secondary mb-2">+250%</div>
                    <div className="text-text-medium">Average engagement increase</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">20-30</div>
                    <div className="text-text-medium">Posts per month across platforms</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">Daily</div>
                    <div className="text-text-medium">Community engagement and monitoring</div>
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
                  Why Social Media Matters
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    Your customers are on social media every day. Whether it's Facebook, Instagram, 
                    or LinkedIn, they're scrolling, engaging, and making purchasing decisions based 
                    on what they see.
                  </p>
                  <p>
                    But managing social media effectively takes time, strategy, and consistency – 
                    resources many Sydney business owners simply don't have. That's where we come in.
                  </p>
                  <p>
                    We create content that resonates with your Sydney audience, engage with your 
                    followers authentically, and turn your social channels into powerful business tools.
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
                Our Social Media Services
              </h2>
              <p className="text-lg text-text-medium">
                Complete management of your social media presence.
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
                  What You'll Achieve
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
                Ready to Grow Your Social Presence?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let us handle your social media while you focus on what you do best.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90" asChild>
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

export default SocialMediaManagement;
