import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Globe, MapPin, Search, 
  Zap, BarChart3, Repeat, Laptop, 
  Construction, PlusIcon, ArrowRight
} from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
`;

const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
};

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- REUSED COMPONENTS FROM YOUR BASE ---
const GlowingEffect = ({ glow, className, disabled }: any) => (
  <div className={cn(
    "absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500",
    glow ? "opacity-100" : "opacity-0",
    className
  )}>
    <div className="absolute inset-0 rounded-[inherit] border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]" />
  </div>
);

const TiltCard = ({ children, className, innerClassName }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={cn("relative rounded-none p-[1px] transition-all duration-300", className)}
  >
    <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>
      {children}
    </div>
  </motion.div>
);

// --- LOGO CLOUD (Mantenida como pediste) ---
function LogoCard({ logo, isLightMode, className }: any) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 border-r border-b transition-colors duration-500", className)}>
      <img alt={logo.alt} src={logo.src} className={cn("h-4 md:h-5 transition-all", !isLightMode && "brightness-0 invert")} />
    </div>
  );
}

export function LogoCloud({ isLightMode }: { isLightMode: boolean }) {
  const borderColor = isLightMode ? "border-zinc-200" : "border-white/10";
  return (
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500", borderColor)}>
      <LogoCard isLightMode={isLightMode} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" }} />
      <LogoCard isLightMode={isLightMode} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" }} />
      <LogoCard isLightMode={isLightMode} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" }} />
      <LogoCard isLightMode={isLightMode} logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" }} />
    </div>
  );
}

// --- MAIN COMPONENT ---
export const WhatWeDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.15 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.15 && isLightMode) setIsLightMode(false);
  });

  return (
    <section ref={containerRef} className={cn("relative w-full pb-24 transition-colors duration-500 font-sans", isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]")}>
      <style>{fontStyles}</style>
      
      {/* 1. LOGOS */}
      <LogoCloud isLightMode={isLightMode} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pt-20">
        
        {/* 2. HEADLINE GENERAL */}
        <div className="max-w-4xl mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-6 border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-[10px] font-bold tracking-[2px] uppercase"
          >
            What we do differently
          </motion.div>
          
          <h2 className={cn("text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-8 transition-colors duration-500", isLightMode ? "text-zinc-900" : "text-white")}>
            We Handle Everything. Because We've Been <span className="text-emerald-500">Burned By Agencies</span> That Don't.
          </h2>
          
          <p className={cn("text-lg md:text-xl font-medium max-w-2xl mb-12", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
            Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. We do. <span className={isLightMode ? "text-zinc-900" : "text-white"}>Because we ARE tradies.</span>
          </p>

          {/* INTRO COPY / STORIES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "01", title: "Agency #1", desc: "Built a beautiful $8K website. Zero leads. No ads, no SEO, just a pretty brochure no one saw." },
              { id: "02", title: "Agency #2", desc: "$12K in Google Ads. Traffic but no calls. They blamed our 'brand' instead of their slow site." },
              { id: "03", title: "Agency #3", desc: "SEO 'experts' ranking us for keywords no one searches. Vanity metrics, zero jobs." }
            ].map((story, i) => (
              <div key={i} className={cn("p-6 border transition-all", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <span className="text-[10px] font-bold text-emerald-500 mb-2 block">{story.title}</span>
                <p className={cn("text-sm leading-relaxed", isLightMode ? "text-zinc-600" : "text-zinc-400")}>{story.desc}</p>
              </div>
            ))}
          </div>
          
          <div className={cn("mt-10 p-6 border-l-2 border-emerald-500 italic text-lg", isLightMode ? "text-zinc-800 bg-zinc-100" : "text-zinc-200 bg-white/5")}>
            "We learned the hard way: You need BOTH the foundation AND the fuel. And someone who understands the tools, not marketing jargon."
          </div>
        </div>

        {/* 3. BLOQUE 1: THE FOUNDATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-5">
            <h3 className={cn("text-3xl font-bold mb-4", isLightMode ? "text-zinc-900" : "text-white")}>
              First, We Fix What's Broken
            </h3>
            <p className="text-emerald-500 font-bold mb-6 text-sm uppercase tracking-wider">The Stuff Agencies Ignore</p>
            <p className={cn("mb-8 leading-relaxed", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
              Most tradies have the same problems. We know, because we HAD them. Agencies love 'brand awareness'—we care about <span className="font-bold underline">CALLS</span>.
            </p>
            
            <div className="space-y-4">
              {[
                "Website loads slower than council approvals",
                "Invisible on Google Maps",
                "Mobile site is a total disaster",
                "No tracking: where are the calls coming from?"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                  <X className="text-red-500 shrink-0" size={16} />
                  <span className={isLightMode ? "text-zinc-700" : "text-zinc-300"}>{item}</span>
                </div>
              ))}
            </div>

            <div className={cn("mt-10 p-8 border", isLightMode ? "bg-zinc-900 text-white border-zinc-900" : "bg-emerald-500 text-black border-emerald-500")}>
              <h4 className="text-xl font-bold mb-2">The Foundation Takes 1-2 Weeks</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Not 3 months. Week 1, you're live. Week 2, people find you. We don't have time for agency timelines, and neither do you.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Globe size={24}/>}
              title="Conversion Websites"
              isLightMode={isLightMode}
              desc="Built in 48h. Fast (under 2s), mobile-first, and CTA on every section. Not a portfolio, a lead machine."
            />
            <FeatureCard 
              icon={<MapPin size={24}/>}
              title="GMB Domination"
              isLightMode={isLightMode}
              desc="We optimize every field Google looks at. Photos of actual jobs, not stock images. Review generation system."
            />
            <FeatureCard 
              icon={<Search size={24}/>}
              title="Technical SEO"
              isLightMode={isLightMode}
              desc="The boring stuff: Schema, citations, meta tags. We track how many people found you, not vanity graphs."
            />
            <div className={cn("p-6 flex flex-col justify-center border border-dashed", isLightMode ? "border-zinc-300" : "border-white/20")}>
              <p className={cn("text-xs uppercase font-bold mb-2 tracking-widest", isLightMode ? "text-zinc-400" : "text-white/40")}>Why this first?</p>
              <p className={cn("text-sm italic", isLightMode ? "text-zinc-500" : "text-zinc-400")}>"Because running ads to a broken website is like pouring water into a leaky bucket."</p>
            </div>
          </div>
        </div>

        {/* 4. BLOQUE 2: THE FUEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Zap size={24}/>}
              title="High-Intent Google Ads"
              isLightMode={isLightMode}
              desc="Daily optimization. We test 'Emergency Plumber' vs 'Same-Day' to see what makes your phone ring."
            />
            <FeatureCard 
              icon={<BarChart3 size={24}/>}
              title="Real Numbers Only"
              isLightMode={isLightMode}
              desc="No impressions or reach. We track: How many calls? How many forms? What's the cost per lead?"
            />
            <FeatureCard 
              icon={<Repeat size={24}/>}
              title="Continuous Testing"
              isLightMode={isLightMode}
              desc="New landing pages every 2 weeks. We pause low-performing keywords immediately. We don't wait."
            />
            <div className={cn("p-8 border flex flex-col justify-center", isLightMode ? "bg-emerald-500 text-black border-emerald-500" : "bg-white text-black border-white")}>
              <p className="text-xs uppercase font-bold mb-1">Our Guarantee</p>
              <p className="text-2xl font-black">30 DAYS</p>
              <p className="text-xs font-medium leading-tight mt-2">If we can't get you leads in 30 days, we're not the right fit. No 6-month contracts.</p>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <h3 className={cn("text-3xl font-bold mb-4", isLightMode ? "text-zinc-900" : "text-white")}>
              Then, We Turn That Into Leads
            </h3>
            <p className="text-cyan-500 font-bold mb-6 text-sm uppercase tracking-wider">The Fuel (Vitamin)</p>
            <p className={cn("mb-8 leading-relaxed", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
              Agencies love 'set and forget'. We run ads for our OWN roofing business every day. If our ads don't work, we don't eat. 
            </p>
            
            <div className="space-y-6">
              <div className={cn("p-4 border", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <p className="text-[10px] font-bold uppercase mb-2 opacity-50">Vanity Metrics we ignore:</p>
                <div className="flex flex-wrap gap-2">
                  {["Impressions", "Reach", "Clicks", "Engagement"].map((v) => (
                    <span key={v} className="text-xs px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20">❌ {v}</span>
                  ))}
                </div>
              </div>
              <div className={cn("p-4 border", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <p className="text-[10px] font-bold uppercase mb-2 text-emerald-500">Real Metrics we track:</p>
                <div className="flex flex-wrap gap-2">
                  {["Phone Calls", "Quoted Jobs", "Cost Per Lead", "ROI"].map((v) => (
                    <span key={v} className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">✅ {v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CIERRE FINAL SECCIÓN */}
        <div className="relative mt-20">
          <div className={cn(
            "p-10 md:p-16 border rounded-none relative overflow-hidden",
            isLightMode ? "bg-zinc-900 text-white border-zinc-900" : "bg-gradient-to-br from-emerald-600 to-cyan-700 text-white border-none"
          )}>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-6">Why Other Agencies Fail Tradies:</h3>
                <div className="space-y-4 mb-8">
                  {[
                    "They do ONE thing (only web or only ads)",
                    "They hide behind jargon and vanity metrics",
                    "They don't understand your margins or timelines",
                    "They don't optimize daily"
                  ].map((text, i) => (
                    <div key={i} className="flex gap-3">
                      <X className="text-white/40 shrink-0" size={20} />
                      <p className="font-medium">{text}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px w-full bg-white/20 my-8" />
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-black">
                    <Construction size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/60">The $90K Lesson</p>
                    <p className="text-lg">We built this for ourselves first. Our business runs on this.</p>
                  </div>
                </div>
              </div>

              {/* SPLIT SCREEN IMAGE VISUAL */}
              <div className="relative h-[400px] group">
                <div className="absolute inset-0 grid grid-cols-2 gap-2">
                  <div className="relative overflow-hidden h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1638302302196-039158399581?q=80&w=1470&auto=format&fit=crop" 
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt="Tradie on roof"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <p className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-tighter bg-black px-2 py-1">Morning: Roof</p>
                  </div>
                  <div className="relative overflow-hidden h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=1470&auto=format&fit=crop" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      alt="Google ads dashboard"
                    />
                    <div className="absolute inset-0 bg-cyan-900/20" />
                    <p className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-tighter bg-cyan-600 px-2 py-1">Afternoon: 12 New Leads</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 p-6 shadow-2xl hidden md:block">
                   <p className="text-black font-black text-xl italic uppercase leading-none">We do it for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---
const FeatureCard = ({ icon, title, desc, isLightMode }: any) => (
  <TiltCard className="h-full" innerClassName={cn("p-8 border group", isLightMode ? "bg-white border-zinc-200 hover:border-emerald-500" : "bg-white/5 border-white/10 hover:border-emerald-500/50")}>
    <div className={cn("mb-6 transition-transform group-hover:scale-110 duration-300", isLightMode ? "text-zinc-900" : "text-emerald-500")}>
      {icon}
    </div>
    <h4 className={cn("text-lg font-bold mb-3", isLightMode ? "text-zinc-900" : "text-white")}>{title}</h4>
    <p className={cn("text-sm leading-relaxed", isLightMode ? "text-zinc-500" : "text-zinc-400")}>{desc}</p>
  </TiltCard>
);

export default WhatWeDoSection;