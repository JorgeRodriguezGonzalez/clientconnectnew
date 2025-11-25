import React from 'react';
import { ArrowRight, Cloud } from 'lucide-react';

// Background pattern from the original design
const BACKGROUND_PATTERN = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC`;

// @component: CloudHero
const CloudHero = () => {
  return (
    <section id="cloud" className="grow relative w-full overflow-hidden bg-white flex flex-col">
      {/* Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] w-full h-full object-none" 
        style={{
          backgroundImage: `url("${BACKGROUND_PATTERN}")`,
          backgroundRepeat: 'repeat'
        }} 
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-[1] max-w-[1280px]">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          
          {/* Left Column: Content */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-1/2 shrink-0 lg:pr-16 relative z-10">
            <div className="flex flex-col gap-3 max-w-[640px]">
              {/* Badge */}
              <div className="flex gap-2 items-center text-sm font-medium text-zinc-900">
                <div className="w-4 h-4 text-blue-500 flex items-center justify-center">
                  <Cloud size={16} fill="currentColor" className="text-blue-100" stroke="currentColor" strokeWidth={2} />
                </div>
                <p>Cloud</p>
              </div>

              {/* Header */}
              <h2 className="text-[40px] leading-[46px] font-medium tracking-tight text-zinc-900">
                Tailored infrastructure
                <br />
                for your project
              </h2>
            </div>

            {/* Description */}
            <div className="max-w-[640px] text-base lg:text-lg leading-6 text-zinc-500 font-normal mt-2">
              <p>
                Pre-configured infrastructure to launch and operate your Medusa applications. 
                Link with GitHub to automatically build and deploy on push and access 
                instant preview environments for every PR.
              </p>
            </div>

            {/* CTA Link */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium transition-colors group text-base">
                Get started with Cloud
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Vertical Divider (Desktop only) */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10" />

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen -ml-6 h-[1px] bg-zinc-200 mb-0" />

          {/* Right Column: Empty */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[640px] lg:min-h-auto flex items-center justify-center overflow-hidden self-stretch">
            {/* Vacío - solo mantiene el espacio */}
          </div>

        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default CloudHero;