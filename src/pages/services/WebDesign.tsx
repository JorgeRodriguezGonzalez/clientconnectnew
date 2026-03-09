import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Rocket, Palette, TrendingUp, Code } from "lucide-react";

const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanLight: "#67e8f9",
  greenLight: "#6ee7b7",
  cyanBg: "rgba(6,182,212,0.15)",
  greenBg: "rgba(52,211,153,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
  text: "#a1a1aa",
  cardBorder: "rgba(255,255,255,0.06)",
};

const carouselImages = {
  row1: [
    { id: 1, src: "/images/brisbane.png" },
    { id: 2, src: "/images/premierwebsite.png" },
    { id: 3, src: "/images/assetwebsite.png" },
    { id: 4, src: "/images/turnbullwebsite.png" },
    { id: 5, src: "/images/nanotisewebsite.png" },
    { id: 6, src: "/images/prolexwebsite.png" },
  ],
  row2: [
    { id: 7, src: "/images/commercialstratawebsite.png" },
    { id: 8, src: "/images/pioneerwebsite.png" },
    { id: 9, src: "/images/LCLwebsite.png" },
    { id: 10, src: "/images/YLRwebsite.png" },
    { id: 11, src: "/images/LCDwebsite.png" },
  ],
};

const ImageCard = ({ item }) => (
  <div style={{
    width: 220, height: 150, borderRadius: 16, flexShrink: 0,
    overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    background: "#111",
  }}>
    <img
      src={item.src}
      alt=""
      style={{
        width: "100%", height: "100%", objectFit: "cover",
        display: "block",
      }}
    />
  </div>
);

const InfiniteRow = ({ items, direction = "left", speed = 30 }) => {
  const [offset, setOffset] = useState(0);
  const animRef = useRef(null);
  const lastTime = useRef(null);
  const gap = 16;
  const cardW = 220 + gap;
  const totalW = items.length * cardW;

  useEffect(() => {
    const animate = (ts) => {
      if (!lastTime.current) lastTime.current = ts;
      const dt = (ts - lastTime.current) / 1000;
      lastTime.current = ts;
      setOffset((prev) => {
        const next = prev + speed * dt;
        return next >= totalW ? next - totalW : next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, totalW]);

  const translateX = direction === "left" ? -offset : offset - totalW;
  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{
        display: "flex", gap, transform: `translateX(${translateX}px)`, willChange: "transform",
      }}>
        {tripled.map((item, i) => (
          <ImageCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const features = [
  { icon: Palette, title: "Custom Design", description: "Unique designs that reflect your brand and stand out from competitors." },
  { icon: Smartphone, title: "Mobile-First", description: "Perfectly optimized for mobile devices where most traffic comes from." },
  { icon: Rocket, title: "Conversion Focused", description: "Every element designed to turn visitors into customers." },
  { icon: Code, title: "Clean Code", description: "Fast-loading, SEO-friendly, and easy to maintain." },
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

        {/* HERO */}
        <section className="section-padding bg-black" style={{ overflow: "hidden" }}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ background: C.cyanBg }}>
                  <Globe className="h-4 w-4" style={{ color: C.cyan }} />
                  <span className="text-sm font-medium" style={{ color: C.cyan }}>Web Design & Development</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Websites That Turn{" "}
                  <span style={{
                    background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>Visitors</span>{" "}
                  Into Customers
                </h1>
                <p className="text-xl text-text-medium mb-8">
                  We create beautiful, high-converting websites that represent your Sydney business
                  perfectly and drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild style={{ background: C.gradient, border: "none", boxShadow: "0 4px 24px rgba(6,182,212,0.35)" }}>
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
                style={{
                  display: "flex", flexDirection: "column", gap: 16,
                  borderRadius: 24, overflow: "hidden", padding: "24px 0",
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <InfiniteRow items={carouselImages.row1} direction="left" speed={25} />
                <InfiniteRow items={carouselImages.row2} direction="right" speed={20} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* YOUR WEBSITE IS YOUR BEST SALESPERSON */}
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
                  Your Website is Your{" "}
                  <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Best Salesperson
                  </span>
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

        {/* WHAT WE DELIVER */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
              <p className="text-lg text-text-medium">Premium websites built for performance and results.</p>
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
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: C.cyanBg }}>
                      <Icon className="h-6 w-6" style={{ color: C.cyan }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-medium">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PACKAGE INCLUDES */}
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
                      <TrendingUp className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: C.green }} />
                      <span className="text-lg text-text-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: C.gradient }}>
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