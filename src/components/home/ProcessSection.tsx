import { motion } from "framer-motion";
import { MessageSquare, Search, Rocket, TrendingUp, BarChart } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery Call",
    description: "We learn about your business, goals, and challenges in a free consultation.",
  },
  {
    icon: Search,
    title: "Strategy Development",
    description: "Our team creates a customized digital marketing strategy for your business.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description: "We launch your campaigns with precision and continuous optimization.",
  },
  {
    icon: BarChart,
    title: "Transparent Reporting",
    description: "Receive detailed monthly reports showing exactly what we're achieving.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We refine and scale your campaigns to maximize ROI month after month.",
  },
];

const ProcessSection = () => {
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
            How We Work
          </h2>
          <p className="text-lg text-text-medium">
            Our proven process ensures your success from day one.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2"></div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-text-medium">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
