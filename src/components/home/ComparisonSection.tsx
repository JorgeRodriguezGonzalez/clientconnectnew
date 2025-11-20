import { X, Check } from "lucide-react";

const comparison = [
  {
    category: "Speed",
    traditional: "30-60 minutes per prompt",
    promptgenius: "2-3 seconds",
  },
  {
    category: "Quality",
    traditional: "Inconsistent results",
    promptgenius: "98.7% accuracy rate",
  },
  {
    category: "Expertise Required",
    traditional: "Advanced prompt engineering",
    promptgenius: "Zero learning curve",
  },
  {
    category: "Variations",
    traditional: "Manual iteration",
    promptgenius: "Multiple options instantly",
  },
  {
    category: "Best Practices",
    traditional: "Self-research needed",
    promptgenius: "Built-in automatically",
  },
  {
    category: "Cost",
    traditional: "Wasted API tokens",
    promptgenius: "Optimized efficiency",
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a0e1a]">
      {/* Animated background */}
      <div className="absolute inset-0">
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Why Switch to <span className="gradient-text">PromptGenius</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            See the dramatic difference between traditional prompt engineering and our AI-powered solution.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-4 mb-4 animate-fade-in">
            <div></div>
            <div className="text-center p-6 rounded-t-2xl bg-destructive/10 border-2 border-destructive/30">
              <X className="h-8 w-8 mx-auto mb-2 text-destructive" />
              <h3 className="font-bold text-lg text-white">Traditional Way</h3>
              <p className="text-sm text-muted-foreground mt-1">Manual & Time-Consuming</p>
            </div>
            <div className="text-center p-6 rounded-t-2xl glass-card border-2 border-primary glow-primary">
              <Check className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-bold text-lg gradient-text">PromptGenius</h3>
              <p className="text-sm text-muted-foreground mt-1">AI-Powered & Instant</p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-2">
            {comparison.map((item, index) => (
              <div 
                key={index}
                className="grid grid-cols-3 gap-4 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category */}
                <div className="flex items-center p-4 rounded-lg glass-card border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <span className="font-semibold text-white">{item.category}</span>
                </div>

                {/* Traditional */}
                <div className="flex items-center p-4 rounded-lg bg-destructive/5 border border-destructive/20 group-hover:border-destructive/40 transition-all duration-300">
                  <div className="flex items-center gap-3 w-full">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item.traditional}</span>
                  </div>
                </div>

                {/* PromptGenius */}
                <div className="flex items-center p-4 rounded-lg glass-card border border-primary/30 group-hover:border-primary group-hover:glow-primary transition-all duration-300">
                  <div className="flex items-center gap-3 w-full">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{item.promptgenius}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom glow effect */}
          <div className="mt-8 p-8 rounded-b-2xl glass-card text-center border-2 border-primary/30 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg font-semibold gradient-text mb-2">
              10x Faster. 100x Easier. Infinitely Better.
            </p>
            <p className="text-sm text-muted-foreground">
              Join 500,000+ professionals who've made the switch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;