import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MousePointerClick, Globe, Share2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "SEO",
    description: "Rank higher on Google and drive organic traffic that converts into customers.",
    link: "/services/seo",
  },
  {
    icon: MousePointerClick,
    title: "Google Ads",
    description: "Get instant visibility with targeted campaigns that maximize your ROI.",
    link: "/services/google-ads",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Beautiful, conversion-focused websites that represent your brand perfectly.",
    link: "/services/web-design",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Build authentic connections with your audience through strategic social content.",
    link: "/services/social-media-management",
  },
  {
    icon: TrendingUp,
    title: "Social Media Advertising",
    description: "Reach your ideal customers on Facebook, Instagram, and LinkedIn with precision.",
    link: "/services/social-media-ads",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Digital Marketing Services
          </h2>
          <p className="text-lg text-text-medium">
            Everything you need to grow your business online, all under one roof.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group" asChild>
                      <Link to={service.link}>
                        Learn More
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
