import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Rocket, ShieldCheck, Wallet, Check, ChevronRight } from 'lucide-react';

// --- Types ---

type Feature = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  lightColor: string;
  graphicContent: React.ReactNode;
};

// --- Data ---

const features: Feature[] = [{
  id: 'fast',
  title: 'Fast 10DLC Approvals',
  subtitle: 'Get verified and live in days instead of waiting months.',
  description: 'Launch campaigns in days, not months. Automate outreach, stay compliant, and convert more leads, all at the lowest SMS rates.',
  icon: Rocket,
  color: '#0ea5e9',
  // Sky blue
  bgColor: 'bg-sky-50',
  lightColor: 'bg-sky-100',
  graphicContent: <div className="relative w-full h-full flex items-center justify-center p-8">
    <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-sky-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
          <Rocket className="w-6 h-6 text-sky-600" />
        </div>
        <div>
          <div className="h-2 w-24 bg-sky-100 rounded mb-2" />
          <div className="h-2 w-16 bg-sky-50 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full bg-slate-100 rounded" />
        <div className="h-2 w-full bg-slate-100 rounded" />
        <div className="h-2 w-2/3 bg-slate-100 rounded" />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded">Approved</div>
        <div className="text-xs text-slate-400">2 mins ago</div>
      </div>
    </motion.div>
    {/* Decorative elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-200/20 blur-3xl rounded-full -z-0" />
  </div>
}, {
  id: 'compliant',
  title: 'Built-In Compliance',
  subtitle: 'Stay TCPA-friendly with real-time checks while you draft and send bulk SMS.',
  description: 'Our system automatically handles opt-outs, delivery windows, and frequency capping to keep your domain reputation pristine.',
  icon: ShieldCheck,
  color: '#8b5cf6',
  // Violet
  bgColor: 'bg-violet-50',
  lightColor: 'bg-violet-100',
  graphicContent: <div className="relative w-full h-full flex items-center justify-center p-8">
    <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-violet-100">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-violet-600" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-violet-200" />)}
        </div>
      </div>
      <div className="space-y-3">
        {[{
          text: 'TCPA Verified',
          checked: true
        }, {
          text: 'Opt-out Handling',
          checked: true
        }, {
          text: 'Daily Limits',
          checked: true
        }].map((item, idx) => <div key={idx} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-green-600" />
          </div>
          <span className="text-sm text-slate-600 font-medium">{item.text}</span>
        </div>)}
      </div>
    </motion.div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-200/20 blur-3xl rounded-full -z-0" />
  </div>
}, {
  id: 'affordable',
  title: 'Affordable & Scalable',
  subtitle: '$0.007 per text, 14-day free trial, and no setup fees.',
  description: 'Scale your outreach without breaking the bank. Pay only for what you use with our transparent, volume-based pricing model.',
  icon: Wallet,
  color: '#f59e0b',
  // Amber
  bgColor: 'bg-amber-50',
  lightColor: 'bg-amber-100',
  graphicContent: <div className="relative w-full h-full flex items-center justify-center p-8">
    <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-medium text-slate-500">Cost per SMS</div>
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Wallet className="w-4 h-4 text-amber-600" />
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-bold text-slate-900">$0.007</span>
        <span className="text-sm text-slate-500">/ msg</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
        <motion.div initial={{
          width: 0
        }} animate={{
          width: '80%'
        }} transition={{
          delay: 0.5,
          duration: 1
        }} className="h-full bg-amber-500 rounded-full" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
          No Setup Fees
        </div>
        <div className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
          14-Day Trial
        </div>
      </div>
    </motion.div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-200/20 blur-3xl rounded-full -z-0" />
  </div>
}];

// --- Sub-components ---

const FeatureTextBlock = ({
  feature,
  onInView
}: {
  feature: Feature;
  onInView: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px"
  });
  useEffect(() => {
    if (isInView) {
      onInView(feature.id);
    }
  }, [isInView, feature.id, onInView]);
  return <div ref={ref} className="min-h-[80vh] flex flex-col justify-center py-20 px-4 md:px-0">
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${feature.lightColor}`}>
        <feature.icon className="w-6 h-6" style={{
          color: feature.color
        }} />
      </div>
    </div>

    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
      {feature.title}
    </h3>

    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light mb-4">
      {feature.subtitle}
    </p>

    <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
      {feature.description}
    </p>
  </div>;
};
const StickyGraphic = ({
  activeFeatureId
}: {
  activeFeatureId: string;
}) => {
  return <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center p-8 lg:p-12 xl:p-20 overflow-hidden">
    <div className="relative w-full max-w-2xl aspect-square bg-slate-50/50 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 backdrop-blur-sm">
      {features.map(feature => <motion.div key={feature.id} className={`absolute inset-0 flex items-center justify-center ${feature.bgColor}`} initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: activeFeatureId === feature.id ? 1 : 0,
        scale: activeFeatureId === feature.id ? 1 : 0.95,
        zIndex: activeFeatureId === feature.id ? 10 : 0
      }} transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}>
        {feature.graphicContent}
      </motion.div>)}

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20" style={{
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
    </div>
  </div>;
};

// --- Main Component ---

const OurSteps = () => {
  const [activeFeatureId, setActiveFeatureId] = useState(features[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress bar logic
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // @return
  return <div className="bg-white min-h-screen font-sans selection:bg-sky-100 selection:text-sky-900">

    {/* Header Section */}
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[rgb(30,97,134)] text-white text-sm font-medium mb-8 shadow-sm">
          Key benefits
        </motion.div>

        <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          Fast, Compliant, and Affordable <span className="text-[rgb(30,97,134)]">SMS Campaigns</span>
        </motion.h2>

        <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-light">
          The fastest way to close deals with SMS. Everything you need to scale your outreach engine.
        </motion.p>

      </div>

      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-sky-50/50 to-transparent -z-0 pointer-events-none" />
    </section>

    {/* Sticky Content Section */}
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 md:px-8 pb-32">
      <div className="flex flex-col lg:flex-row">

        {/* Left Column: Scrolling Text */}
        <div className="w-full lg:w-1/2 relative">

          {/* Progress Line */}
          <div className="absolute left-4 md:left-0 top-0 bottom-0 w-px bg-slate-100 hidden md:block">
            <motion.div className="w-full bg-[rgb(30,97,134)] origin-top" style={{
              scaleY,
              height: '100%'
            }} />
          </div>

          <div className="md:pl-12 lg:pl-16">
            {features.map(feature => <FeatureTextBlock key={feature.id} feature={feature} onInView={setActiveFeatureId} />)}
          </div>
        </div>

        {/* Right Column: Sticky Visuals */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <StickyGraphic activeFeatureId={activeFeatureId} />
        </div>

        {/* Mobile Visuals (Interleaved) - Visible only on small screens */}
      </div>
    </div>

    {/* CTA Section */}
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Ready to start sending?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses sending millions of texts every month. Get started with our 14-day free trial.
        </p>
        <button className="bg-[rgb(30,97,134)] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[rgb(24,78,108)] transition-all shadow-lg shadow-sky-900/10 active:scale-95 flex items-center gap-2 mx-auto group">
          Start Free Trial
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>

  </div>;
};

export default OurSteps;