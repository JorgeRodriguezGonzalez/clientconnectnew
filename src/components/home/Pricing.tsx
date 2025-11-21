import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for individuals and small projects",
    features: [
      "100 prompts per month",
      "Basic templates",
      "Email support",
      "API access",
      "Usage analytics",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "For teams and growing businesses",
    features: [
      "Unlimited prompts",
      "Advanced templates",
      "Priority support",
      "Advanced API access",
      "Team collaboration",
      "Custom integrations",
      "Advanced analytics",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom AI training",
      "SLA guarantee",
      "Advanced security",
      "Custom deployment",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative bg-[#0a0e1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl relative cursor-pointer animate-scale-in transition-all duration-300 hover:scale-105 hover-glow ${
                plan.highlighted ? 'border-2 border-primary scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-semibold text-primary-foreground animate-bounce-slow">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </div>

              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className={`w-full mb-8 group ${
                  plan.highlighted 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0' 
                    : 'bg-transparent hover:bg-transparent'
                }`}
                size="lg"
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <ul className="space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 group/item">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 mt-0.5 group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;