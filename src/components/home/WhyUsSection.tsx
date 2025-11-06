import { motion } from "framer-motion";
import { Award, BarChart3, Users, Target } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Sydney Local Experts",
    description: "Deep understanding of the Sydney market and local business landscape.",
  },
  {
    icon: BarChart3,
    title: "Results That Matter",
    description: "We focus on metrics that impact your bottom line, not vanity numbers.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "You get a dedicated account manager who knows your business inside out.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "6+ years delivering exceptional results for Sydney businesses.",
  },
];

const WhyUsSection = () => {
  return (
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
            Why Choose Client Connect Australia?
          </h2>
          <p className="text-lg text-text-medium">
            We're not just another marketing agency. We're your growth partner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mb-4">
                  <Icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-text-medium">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
