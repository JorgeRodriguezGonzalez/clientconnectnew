import React from 'react';
import { Code, Check, Edit, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const workSteps = [
  {
    id: 's1',
    icon: Code,
    label: 'Discovery',
    title: 'Understand your business and goals',
    description: 'We start with a deep dive into your business, target audience, and competition to create a custom strategy that drives real results.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    top: 126
  },
  {
    id: 's2',
    icon: Check,
    label: 'Strategy',
    title: 'Build your custom marketing plan',
    description: 'We develop a comprehensive roadmap covering SEO, Google Ads, social media, and web design tailored to your specific needs and budget.',
    showTaskCard: true,
    top: 156
  },
  {
    id: 's3',
    icon: Edit,
    label: 'Execution',
    title: 'Launch campaigns across channels',
    description: 'Our team implements your strategy with precision, using best-in-class tools and proven tactics to maximize your marketing ROI.',
    showCarousel: true,
    top: 186
  },
  {
    id: 's4',
    icon: Zap,
    label: 'Optimize',
    title: 'Continuous improvement and reporting',
    description: 'We monitor performance daily, provide transparent monthly reports, and constantly optimize to ensure you get the best results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    top: 216
  }
];

const carouselLogos = [
  'https://cdn.worldvectorlogo.com/logos/google-ads-1.svg',
  'https://cdn.worldvectorlogo.com/logos/meta-1.svg',
  'https://cdn.worldvectorlogo.com/logos/google-analytics-2.svg'
];

const TaskCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-white rounded-xl shadow-lg p-[18px] w-[368px]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button className="bg-[#3255D2]/10 rounded-lg px-2 py-1.5 flex items-center gap-1">
            <span className="text-[#3255D2] text-xs font-medium">SEO Campaign</span>
          </button>
          <button className="bg-[#fafafa] rounded-full w-8 h-[30px] flex items-center justify-center">
            <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="#878689" strokeWidth="2">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#131314] text-base font-medium">Keyword Research & Optimization</p>
          <p className="text-[#878689] text-sm font-medium">Target high-value keywords for Sydney market</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative h-2 bg-[rgba(222,222,222,0.8)] rounded-full overflow-hidden">
            <motion.div
              initial={{ x: -250 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="absolute left-0 top-0 h-full w-[250px] rounded-full bg-gradient-to-r from-[#3255D2] to-[#F6941D]"
            />
          </div>
          <p className="text-[#878689] text-[10px] font-medium">74% completed</p>
        </div>
      </div>
    </motion.div>
  );
};

const AddButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-white rounded-xl shadow-lg p-[18px] w-[368px] h-[68px] flex items-center justify-center"
    >
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 bg-[rgba(222,222,222,0.8)] rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717073">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
        <p className="text-[#717073] text-sm font-medium">Add a new campaign</p>
      </div>
    </motion.div>
  );
};

const InfiniteCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 600 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-full h-[400px] overflow-hidden relative"
      style={{
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex gap-5 absolute"
      >
        {[...carouselLogos, ...carouselLogos, ...carouselLogos, ...carouselLogos].map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[152px] h-[152px] bg-white rounded-3xl shadow-lg flex items-center justify-center p-8"
          >
            <img src={img} alt="" className="w-[88px] h-[88px] object-contain" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Componente separado para la imagen animada con gradiente horizontal
const AnimatedImage = ({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-end overflow-hidden">
      {/* Background con gradiente azul de izquierda (transparente) a derecha (más opaco) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3255D2]/10 to-[#3255D2]/25" />

      {/* Imagen principal animada */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : 300
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-[551px] h-[454px] rounded-l-[12px] overflow-hidden shadow-[0_0_48px_0_rgba(0,0,0,0.02),0_12px_25px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,0,0,0.06)] z-10"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover object-[0%_0%]" />
      </motion.div>
    </div>
  );
};

export const HowWeWork = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-gradient-to-br from-[#3255D2] via-[#5028fa] to-white flex flex-col items-center gap-[100px] px-10 py-40"
    >
      <h3 className="text-center text-[32px] leading-[35.2px] font-medium tracking-[-0.2px] text-gray-200 max-w-[600px]">
        <span className="text-white">How we work? </span>
        We turn marketing complexity into clear, measurable results through proven strategies and transparent reporting.
      </h3>

      <div className="flex flex-col gap-[30px] w-full max-w-[1200px]">
        {workSteps.map((step, index) => {
          const Icon = step.icon;
          const scale = useTransform(
            scrollYProgress,
            [index * 0.2, (index + 1) * 0.2],
            [1, 0.95]
          );

          return (
            <motion.div
              key={step.id}
              style={{
                scale: index < workSteps.length - 1 ? scale : 1,
                position: 'sticky',
                top: `${step.top}px`,
                zIndex: index + 1
              }}
              className="bg-white rounded-[32px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="flex h-[580px]">
                <div className="w-[540px] flex flex-col gap-5 p-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#3255D2]/10 rounded-lg flex items-center justify-center">
                      <Icon size={16} className="text-[#3255D2]" />
                    </div>
                    <h5 className="text-[#717073] text-lg font-medium tracking-[0.2px]">
                      {step.label}
                    </h5>
                  </div>

                  <h2 className="text-[#131314] text-[48px] leading-[57.6px] font-medium tracking-[-1.2px] max-w-[460px]">
                    {step.title}
                  </h2>

                  <p className="text-[#878689] text-base leading-6 font-medium max-w-[460px]">
                    {step.description}
                  </p>
                </div>

                <div className="flex-1 relative overflow-hidden">
                  {step.showTaskCard && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gray-50">
                      <TaskCard />
                      <AddButton />
                    </div>
                  )}

                  {step.showCarousel && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <InfiniteCarousel />
                    </div>
                  )}

                  {/* Imagen animada para la primera tarjeta */}
                  {step.id === 's1' && step.image && (
                    <AnimatedImage 
                      src={step.image} 
                      alt="Discovery process" 
                    />
                  )}

                  {/* Imagen animada para la última tarjeta */}
                  {step.id === 's4' && step.image && (
                    <AnimatedImage 
                      src={step.image}
                      alt="Optimization process" 
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};