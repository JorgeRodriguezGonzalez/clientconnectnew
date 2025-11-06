import React from 'react';
import { Send, Calendar } from 'lucide-react';

export const HeroNew = () => {
  return (
    <div className="w-full flex flex-col items-center justify-end px-5" style={{
      maxWidth: '1260px',
      height: '943.4px',
      margin: '0 auto'
    }}>
      <div className="z-[2] flex items-center justify-center gap-6 w-full max-w-[1260px]" style={{
        height: '568.4px',
        minHeight: '568.4px'
      }}>
        <div className="flex-1 flex items-center justify-center gap-2.5 h-[545px]">
          <div className="flex flex-col items-start justify-center gap-4 w-[976px]" style={{
            height: '387.8px'
          }}>
            {/* Badge superior */}
            <div className="flex items-center justify-center gap-1.5 h-[21px] bg-white border border-gray-200 rounded-[2px] px-3 py-0.5" style={{
              width: '296.2px'
            }}>
              <div className="flex-shrink-0 w-4 h-4 rounded-[2px] overflow-hidden p-0.5">
                <div className="w-full h-full bg-green-500 rounded-full" />
              </div>
              <div className="flex items-center justify-center" style={{
                width: '260.2px',
                height: '17px'
              }}>
                <p className="text-[11px] font-medium leading-[16.6px] text-center whitespace-nowrap opacity-80">
                  Sydney's Premier Marketing Agency • 100+ Happy Clients
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-8 w-[976px]" style={{
              height: '350.8px'
            }}>
              <div className="flex flex-col items-start justify-center gap-6 w-[976px]" style={{
                height: '218.8px'
              }}>
                {/* Título principal */}
                <h1 className="text-[64px] font-bold leading-[70.4px] text-left w-[976px]" style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '-1.8px',
                  height: '140.8px'
                }}>
                  Connecting Sydney Businesses with Their Ideal Clients
                </h1>
                
                {/* Subtítulo */}
                <p className="text-[18px] font-normal leading-[27px] text-left text-[#333333] w-[683.2px] h-[54px]" style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '0.2px'
                }}>
                  We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2 w-[976px] h-[42px]">
                {/* CTA Secundario */}
                <a 
                  href="#contact" 
                  className="flex items-center justify-center gap-[7px] h-[42px] bg-[#EDEDED] hover:bg-gray-300 rounded-[50px] px-4 py-2 transition-all cursor-pointer" 
                  style={{
                    width: '114.6px'
                  }}
                >
                  <div className="w-6 h-6 relative overflow-hidden">
                    <Send className="w-6 h-6 text-[#3255D2]" />
                  </div>
                  <p className="text-[14px] font-medium leading-5 text-right whitespace-nowrap" style={{
                    fontFamily: '"Inter Display", sans-serif',
                    letterSpacing: '0.2px',
                    width: '57.6px'
                  }}>
                    Message
                  </p>
                </a>

                {/* CTA Principal */}
                <a 
                  href="#contact" 
                  className="flex items-center justify-center gap-1.5 h-[42px] bg-[#F6941D] hover:bg-[#e58315] rounded-[50px] px-5 py-3 transition-all cursor-pointer shadow-lg" 
                  style={{
                    width: '220px'
                  }}
                >
                  <div className="w-[18px] h-[14px] relative overflow-hidden">
                    <Calendar className="w-[17px] h-[14px] text-white" />
                  </div>
                  <p className="text-[14px] font-medium leading-5 text-right text-white whitespace-nowrap z-[1]" style={{
                    fontFamily: '"Inter Display", sans-serif',
                    letterSpacing: '0.2px'
                  }}>
                    Book Free Consultation →
                  </p>
                </a>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 w-[976px] h-[26px] overflow-hidden">
                <div className="relative h-[23px] flex-shrink-0 bg-white border border-gray-200 rounded-[2px] px-3" style={{
                  width: '117px'
                }}>
                  <p className="flex items-center justify-center h-full text-[11px] font-medium leading-[16.6px] text-center opacity-80">
                    Google Partner
                  </p>
                </div>

                <div className="relative h-[23px] flex-shrink-0 bg-white border border-gray-200 rounded-[2px] px-3" style={{
                  width: '100px'
                }}>
                  <p className="flex items-center justify-center h-full text-[11px] font-medium leading-[16.6px] text-center opacity-80">
                    5★ Rated Agency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de logos de clientes */}
      <div className="z-[1] flex flex-col items-start justify-center gap-8 w-full max-w-[1260px] h-[200px] py-[60px]">
        <p className="text-[11px] font-normal leading-3 text-center uppercase text-[#71717A] w-full" style={{
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: 'normal'
        }}>
          Trusted by 100+ Sydney businesses
        </p>

        {/* Logos placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-[50px] w-full opacity-40">
          {/* Logo 1 */}
          <div className="flex items-center justify-center w-[120px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">COMPANY</span>
          </div>

          {/* Logo 2 */}
          <div className="flex items-center justify-center w-[100px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">BRAND</span>
          </div>

          {/* Logo 3 */}
          <div className="flex items-center justify-center w-[110px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">CLIENT</span>
          </div>

          {/* Logo 4 */}
          <div className="flex items-center justify-center w-[130px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">PARTNER</span>
          </div>

          {/* Logo 5 */}
          <div className="flex items-center justify-center w-[90px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">BUSS</span>
          </div>

          {/* Logo 6 */}
          <div className="flex items-center justify-center w-[115px] h-[40px] bg-gray-300 rounded-md">
            <span className="text-gray-600 font-bold text-sm">STARTUP</span>
          </div>
        </div>
      </div>
    </div>
  );
};