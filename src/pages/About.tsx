import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Award, Heart, Target, Users } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We're obsessed with delivering measurable results that impact your bottom line.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your success is our success. We treat your business like our own.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as an extension of your team, not just another vendor.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We constantly learn and adapt to stay ahead in the ever-changing digital landscape.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We're More Than a Marketing Agency
              </h1>
              <p className="text-xl text-text-medium">
                We're your dedicated growth partner, committed to helping Sydney businesses thrive in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-text-medium">
                  <p>
                    Client Connect Australia was founded in 2018 with a simple mission: help Sydney businesses 
                    connect with their ideal clients through strategic digital marketing.
                  </p>
                  <p>
                    What started as a two-person operation has grown into a full-service digital marketing agency 
                    serving over 150 businesses across Sydney and New South Wales.
                  </p>
                  <p>
                    We've helped businesses in every industry imaginable – from local cafes to law firms, 
                    dental practices to e-commerce stores. The common thread? They all wanted real results, 
                    transparent communication, and a partner who genuinely cared about their success.
                  </p>
                  <p>
                    That's exactly what we deliver, every single day.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src={aboutTeam}
                  alt="Client Connect Australia team collaborating"
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-text-medium">
                These principles guide everything we do.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-text-medium">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Sydney */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why We Focus on Sydney Businesses
                </h2>
                <div className="space-y-4 text-lg text-text-medium text-left">
                  <p>
                    Sydney is one of the most competitive business environments in Australia. 
                    That's exactly why we specialize here.
                  </p>
                  <p>
                    We understand the local market dynamics, the seasonal trends, and what makes 
                    Sydney customers tick. This local expertise means we can create campaigns that 
                    resonate with your target audience and deliver better results than generic, 
                    one-size-fits-all approaches.
                  </p>
                  <p>
                    Whether you're in Bondi, Parramatta, or anywhere in between, we speak your 
                    customers' language and know how to reach them effectively.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary/5 rounded-2xl p-8 md:p-12"
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Our Certifications & Partnerships</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl mb-2">🎖️</div>
                    <div className="font-semibold">Google Partner</div>
                  </div>
                  <div>
                    <div className="text-4xl mb-2">📱</div>
                    <div className="font-semibold">Meta Business Partner</div>
                  </div>
                  <div>
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="font-semibold">Best Digital Agency 2023</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
