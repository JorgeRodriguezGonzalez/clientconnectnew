import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
type ServiceTag = string;
type ServiceItem = {
  id: string;
  title: string;
  description: string;
  capabilityCount: number;
  tags: ServiceTag[];
  imageUrl: string;
  bgSize: string;
  bgPosition: string;
};

const PANORAMIC_IMAGES = {
  strategy: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2600&auto=format&fit=crop",
  traffic: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop",
  creative: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2600&auto=format&fit=crop",
  data: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2600&auto=format&fit=crop", 
};

const SERVICES: ServiceItem[] = [
  // --- GROUP 1 ---
  {
    id: 'digital-strategy',
    title: 'Digital Strategy',
    description: 'Build a roadmap for growth with data-driven market analysis and competitive positioning.',
    capabilityCount: 4,
    tags: ['Market Analysis', 'Competitor Research', 'KPI Definition', 'Growth Roadmap'],
    imageUrl: PANORAMIC_IMAGES.strategy,
    bgSize: "200% 100%", bgPosition: "0% 50%"
  }, {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Define your visual language and voice to create a lasting impression in the market.',
    capabilityCount: 4,
    tags: ['Logo Design', 'Visual Guidelines', 'Tone of Voice', 'Brand Assets'],
    imageUrl: PANORAMIC_IMAGES.strategy,
    bgSize: "200% 100%", bgPosition: "100% 50%"
  }, 
  // --- GROUP 2 ---
  {
    id: 'seo',
    title: 'SEO',
    description: 'Dominate search results and drive organic traffic with technical and on-page optimization.',
    capabilityCount: 4,
    tags: ['Technical Audit', 'Keyword Strategy', 'Link Building', 'Local SEO'],
    imageUrl: PANORAMIC_IMAGES.traffic,
    bgSize: "300% 100%", bgPosition: "0% 50%"
  }, {
    id: 'paid-media',
    title: 'Paid Media',
    description: 'Accelerate acquisition through targeted campaigns across Google, Meta, and LinkedIn.',
    capabilityCount: 4,
    tags: ['Google Ads', 'Social Ads', 'Retargeting', 'Display Network'],
    imageUrl: PANORAMIC_IMAGES.traffic,
    bgSize: "300% 100%", bgPosition: "50% 50%"
  }, {
    id: 'social-media',
    title: 'Social Media',
    description: 'Build community and engagement with strategic content calendars and management.',
    capabilityCount: 4,
    tags: ['Content Strategy', 'Community Mgmt', 'Influencer Marketing', 'Trend Analysis'],
    imageUrl: PANORAMIC_IMAGES.traffic,
    bgSize: "300% 100%", bgPosition: "100% 50%"
  }, 
  // --- GROUP 3 ---
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    description: 'Attract and convert your audience with value-driven storytelling and copywriting.',
    capabilityCount: 4,
    tags: ['Blog Writing', 'Whitepapers', 'Case Studies', 'Copywriting'],
    imageUrl: PANORAMIC_IMAGES.creative,
    bgSize: "200% 100%", bgPosition: "0% 50%"
  }, {
    id: 'video-production',
    title: 'Video Production',
    description: 'Captivate your audience with high-end motion graphics and video storytelling.',
    capabilityCount: 4,
    tags: ['Motion Graphics', 'Video Editing', 'Scriptwriting', 'Post-Production'],
    imageUrl: PANORAMIC_IMAGES.creative,
    bgSize: "200% 100%", bgPosition: "100% 50%"
  }, 
  // --- GROUP 4 ---
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    description: 'Nurture leads and retain customers with personalized automated email flows.',
    capabilityCount: 4,
    tags: ['Automation Flows', 'Newsletter', 'List Segmentation', 'A/B Testing'],
    imageUrl: PANORAMIC_IMAGES.data,
    bgSize: "300% 100%", bgPosition: "0% 50%"
  }, {
    id: 'cro',
    title: 'CRO',
    description: 'Maximize the value of every visitor by optimizing your conversion funnels.',
    capabilityCount: 4,
    tags: ['User Testing', 'Heatmaps', 'Funnel Analysis', 'UX Optimization'],
    imageUrl: PANORAMIC_IMAGES.data,
    bgSize: "300% 100%", bgPosition: "50% 50%"
  }, {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Make informed decisions with custom reporting and real-time performance tracking.',
    capabilityCount: 4,
    tags: ['GA4 Setup', 'Looker Studio', 'Attribution Models', 'ROI Tracking'],
    imageUrl: PANORAMIC_IMAGES.data,
    bgSize: "300% 100%", bgPosition: "100% 50%"
  }
];

export const Services = () => {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);
  const [paddingLeft, setPaddingLeft] = useState(20); // Valor inicial seguro
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const alignmentMarkerRef = useRef<HTMLDivElement>(null); // EL MARCADOR INVISIBLE

  // 1. LÓGICA DE ALINEACIÓN INFALIBLE
  useEffect(() => {
    const calculateAlignment = () => {
      if (alignmentMarkerRef.current) {
        // Obtenemos la distancia exacta desde el borde izquierdo de la pantalla hasta nuestro marcador
        const rect = alignmentMarkerRef.current.getBoundingClientRect();
        // Si el valor es razonable (>0), lo aplicamos
        if (rect.left > 0) {
          setPaddingLeft(rect.left);
        }
      }
    };

    // Calcular inmediatamente
    calculateAlignment();
    
    // Calcular cuando se redimensiona la ventana
    window.addEventListener('resize', calculateAlignment);
    
    // Calcular un poco después por si la fuente o el layout tarda en cargar
    const timeout = setTimeout(calculateAlignment, 100);

    return () => {
      window.removeEventListener('resize', calculateAlignment);
      clearTimeout(timeout);
    };
  }, []);

  // 2. ESTILOS GLOBALES (Bento + Scrollbar Hide Force)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento-services-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-gradient-fade1 { 0%, 10% { opacity: 0.5; } 26.67%, 73.33% { opacity: 0.5; } 88.1%, 100% { opacity: 0.5; } }
      @keyframes bento2-gradient-fade2 { 0%, 10% { opacity: 0; } 26.67%, 50% { opacity: 0.5; } 69.05%, 100% { opacity: 0; } }
      @keyframes bento2-gradient-fade3 { 0%, 50% { opacity: 0; } 69.05%, 73.81% { opacity: 0.5; } 88.1%, 100% { opacity: 0.5; } }
      
      /* FORZAR ocultar barra de scroll */
      .no-scrollbar::-webkit-scrollbar {
          display: none !important;
      }
      .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const scrollToCard = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`card-${id}`);
    if (element && scrollContainerRef.current) {
      const elementLeft = element.getBoundingClientRect().left;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      // Ajuste: Posición actual + (Distancia elemento - Padding deseado)
      const offset = currentScroll + (elementLeft - paddingLeft);
      
      scrollContainerRef.current.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  };

  // Scroll Sync Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const containerCenter = paddingLeft + (container.offsetWidth - paddingLeft) / 2;

      let closestCardId = activeTab;
      let minDistance = Infinity;
      SERVICES.forEach(service => {
        const card = document.getElementById(`card-${service.id}`);
        if (card) {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < minDistance && distance < rect.width) {
            minDistance = distance;
            closestCardId = service.id;
          }
        }
      });
      if (closestCardId !== activeTab) {
        setActiveTab(closestCardId);
        const tabBtn = document.getElementById(`tab-${closestCardId}`);
        if (tabBtn && tabsContainerRef.current) {
          tabBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab, paddingLeft]);

  return (
    <div className="w-full bg-white min-h-screen py-20 font-sans text-neutral-900 selection:bg-neutral-200 overflow-hidden">
      
      {/* HEADER & TABS CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        
        {/* --- MARCADOR INVISIBLE --- 
            Este div de 1px de altura no se ve, pero está alineado 
            exactamente donde empieza el contenido. Usamos su posición 
            para alinear el carrusel.
        */}
        <div ref={alignmentMarkerRef} className="absolute left-4 md:left-8 top-0 w-px h-px opacity-0 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 pb-6 border-b border-neutral-900/10">
          <div className="lg:w-1/2 flex flex-col gap-2">
             <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">
               Digital Ecosystem
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
              Specialized in <br />
              <motion.span
                initial={{ backgroundPosition: "400% 50%" }}
                animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                transition={{
                  duration: 12,
                  ease: "linear",
                  repeat: Infinity
                }}
                style={{
                  display: "inline-block",
                  backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0), rgb(237, 191, 134), rgb(222, 131, 99), rgb(103, 188, 183), rgba(255, 255, 255, 0))",
                  backgroundSize: "400% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                10 vital services
              </motion.span>
              {" "}
            </h2>
          </div>
          <div className="lg:w-[427px] lg:ml-auto lg:pb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-900 mb-2">
              Transform your business.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
              From initial strategy to final conversion, we cover every aspect of the digital landscape to ensure sustainable growth and measurable results.
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="relative mb-12">
          <div 
            ref={tabsContainerRef} 
            className="flex overflow-x-auto gap-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 mask-gradient-right no-scrollbar"
          >
            {SERVICES.map(service => (
              <button key={service.id} id={`tab-${service.id}`} onClick={() => scrollToCard(service.id)} className={cn("relative px-4 py-3 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-200 flex-shrink-0 z-10", activeTab === service.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900")}>
                
                {activeTab === service.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-white" />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 120% at 20% 50%, rgb(237,191,134), transparent 72%)", animation: "bento2-gradient-fade1 10.5s ease-in-out infinite" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 120% at 20% 50%, rgb(103,188,183), transparent 72%)", animation: "bento2-gradient-fade2 10.5s ease-in-out infinite" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 120% at 20% 50%, rgb(148,163,184), transparent 72%)", animation: "bento2-gradient-fade3 10.5s ease-in-out infinite" }} />
                    <div className="absolute inset-0 rounded-full border border-neutral-200/50" />
                  </motion.div>
                )}
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 
          CAROUSEL
          Aquí aplicamos el padding calculado dinámicamente con JS.
          Al usar inline styles para paddingLeft, nos aseguramos de que coincida
          exactamente con el marcador invisible.
      */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory w-full no-scrollbar"
        style={{
          paddingLeft: `${paddingLeft}px`,
          paddingRight: '2rem'
        }}
      >
        {SERVICES.map((service, index) => (
          <div key={service.id} id={`card-${service.id}`} className="flex-shrink-0 snap-start w-[280px] sm:w-[305px] md:w-[350px]">
            <div className="group relative h-[420px] w-full overflow-hidden rounded-2xl bg-neutral-900 text-white transition-transform duration-500">
              
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105" 
                style={{
                  backgroundImage: `url('${service.imageUrl}')`,
                  backgroundSize: service.bgSize,
                  backgroundPosition: service.bgPosition,
                  backgroundRepeat: 'no-repeat'
                }} 
              />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
              
              <div className="relative h-full flex flex-col justify-between p-5 z-10">
                <div className="space-y-2 pt-1">
                  <h3 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90 max-w-[95%] drop-shadow-sm">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 pb-1">
                  <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/90 px-1 drop-shadow-sm">
                    Includes {service.capabilityCount} capabilities
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    <div className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center mr-1 border border-white/20">
                      <Check className="w-3 h-3 text-white" strokeWidth={2} />
                    </div>
                    
                    {service.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md border border-white/10 text-white shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Espaciador final */}
        <div className="flex-shrink-0 w-4 md:w-8" /> 
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-center mt-4 md:mt-8 border-t border-neutral-900/10 pt-8">
          <a href="#" className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200" onClick={e => e.preventDefault()}>
            <span className="text-xs font-semibold uppercase tracking-wide">Explore services</span>
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};