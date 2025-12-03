import React, { useId } from 'react';
import { cn } from '@/lib/utils';

// --- Matriz de Transformación 3D ---
const MATRIX_TRANSFORM = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.681, 21.2223)";
const MATRIX_TRANSFORM_ALT = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.393, 17.2223)";

// --- Paleta de Colores Tierra ---
// Stroke (Bordes) -> #9A4526 (Marrón Rojizo)
// Fill Principal -> #E8A288 (Coral Suave)
// Fill Secundario -> #F4D3C6 (Coral Pastel)
// Fill Claro (Fondo) -> #F9E2D8 (Piel / Crema)
// Acentos -> #DE8363 (Coral Base)
// Highlights -> #FFF5F2 (Blanco Cálido)

/**
 * CAPA SUPERIOR (WaveformCardLayer)
 * Esta es la COPIA EXACTA del diseño "Main Blue Card" del componente original,
 * pero con los colores sustituidos por la paleta Tierra.
 * No falta ningún elemento (círculos dispersos, líneas laterales, barras, etc.)
 */
const WaveformCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${idPrefix}clip0`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip1`}>
        <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="white" />
      </clipPath>
    </defs>

    <g className="transition-all duration-300">
      {/* Card Base */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" fill="#E8A288" />
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" stroke="#9A4526" />
      
      {/* Left Side Decorative Elements */}
      <rect x="9.07227" y="115.314" width="8.50049" height="13.0286" fill="#E8A288" />
      <line x1="9.48145" y1="128.85" x2="9.48145" y2="111.85" stroke="#9A4526" />
      <circle cx="17.9814" cy="128.109" r="8" fill="#E8A288" />
      <line x1="14.3179" y1="135.984" x2="14.3179" y2="118.984" stroke="#9A4526" />
      
      {/* Bottom Lines */}
      <line x1="285.318" y1="283.121" x2="285.318" y2="266.121" stroke="#9A4526" />
      <line x1="268.318" y1="282.629" x2="268.318" y2="265.629" stroke="#9A4526" />
      
      {/* Right Side Decorative Elements */}
      <circle cx="441.981" cy="186.136" r="8" fill="#E8A288" />
      <rect x="443.774" y="173.07" width="6.25879" height="12.8606" fill="#E8A288" />
      <line x1="450.535" y1="187.25" x2="450.535" y2="170.25" stroke="#9A4526" />
      <line x1="445.291" y1="194.431" x2="445.291" y2="177.431" stroke="#9A4526" />

      {/* Main Content Area (Background + Waveform) */}
      <g clipPath={`url(#${idPrefix}clip0)`}>
        {/* Fondo del área de contenido */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="#F9E2D8" />
        
        {/* Waveform Path Principal */}
        <path d="M267.32 145.001L267.037 145.188L267.254 145.403C272.754 150.884 271.48 157.941 263.28 162.554C253.493 168.059 237.675 167.968 227.952 162.35L190.672 140.81C182.94 136.343 182.981 129.174 190.764 124.797C198.337 120.537 210.434 120.525 218.202 124.654L218.744 124.942L219.139 124.588C220.344 123.504 221.707 122.475 223.361 121.545C235.153 114.912 254.213 115.022 265.928 121.79C277.059 128.222 277.426 138.316 267.32 145.001Z" fill="#E8A288" stroke="#9A4526" />
        <path d="M243.874 138.037C250.893 137.857 258.027 139.312 263.372 142.4C264.974 143.326 266.246 144.387 267.326 145.464" stroke="#9A4526" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Secondary Waveform Layer */}
        <path d="M267.32 143.001L267.037 143.188L267.254 143.403C272.754 148.884 271.48 155.941 263.28 160.554C253.493 166.059 237.675 165.968 227.952 160.35L190.672 138.81C182.94 134.343 182.981 127.174 190.764 122.797C198.337 118.537 210.434 118.525 218.202 122.654L218.744 122.942L219.139 122.588C220.344 121.504 221.707 120.475 223.361 119.545C235.153 112.912 254.213 113.022 265.928 119.79C277.059 126.222 277.426 136.316 267.32 143.001Z" fill="#F4D3C6" stroke="#9A4526" />
        <path d="M243.874 136.037C250.893 135.857 258.027 137.312 263.372 140.4C264.974 141.326 266.246 142.387 267.326 143.464" stroke="#9A4526" strokeLinecap="round" strokeLinejoin="round" />

        {/* Progress Bar Area */}
        <g clipPath={`url(#${idPrefix}clip1)`}>
          <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#F4D3C6" />
          <rect width="32" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#DE8363" />
        </g>
        <rect width="47" height="5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 177.402 148.387)" stroke="#9A4526" />
      </g>

      {/* Scattered Circles */}
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.037 22.855)" fill="#E8A288" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 433.138 167.936)" fill="#E8A288" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 26.8965 110.122)" fill="#E8A288" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 277.998 255.202)" fill="#E8A288" stroke="#9A4526" />
      
      {/* Lighter Circles */}
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.037 21.855)" fill="#F4D3C6" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 433.138 166.935)" fill="#F4D3C6" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 26.8965 109.122)" fill="#F4D3C6" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 277.998 254.202)" fill="#F4D3C6" stroke="#9A4526" />

      {/* Top Border Highlight */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 11.2224)" stroke="#9A4526" />
    </g>
  </svg>
);

/**
 * CAPA INFERIOR (NodeCardLayer)
 * Esta es la "base" del stack. He aplicado la paleta tierra a los nodos
 * para que haga juego con la tarjeta superior.
 */
const NodeCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${idPrefix}clip0`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="white" />
      </clipPath>
    </defs>
    <g>
      <g clipPath={`url(#${idPrefix}clip0)`}>
        {/* Fondo Principal */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="#F9E2D8" />
        
        {/* Elementos simulados de Nodos (simplificados para el fondo) */}
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" fill="#E8A288" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" stroke="#9A4526" />
        
        {/* Detalles sutiles del fondo */}
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="#FFF5F2" />
        <rect width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198.017 53.9316)" stroke="#9A4526" />
        
        {/* Borde exterior */}
        <rect x="-0.00285524" y="0.495269" width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 21.2223)" stroke="#9A4526" />
      </g>
    </g>
  </svg>
);

/**
 * CAPA FANTASMA (GhostCardLayer)
 * Tarjeta genérica gris
 */
const GhostCardLayer = () => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4">
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM} fill="#E4E4E7" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM} stroke="#A1A1AA" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM_ALT} fill="#FAFAFA" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM_ALT} stroke="#A1A1AA" />
    </g>
  </svg>
);

// --- COMPONENTE PRINCIPAL EXPORTADO ---
export const InteractiveCardStack = ({ className }: { className?: string }) => {
  const idPrefix = useId().replace(/:/g, ''); // Sanitizar ID

  // Animación de flotación suave
  const floatKeyframes = `
    @keyframes subtle-float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-subtle-float {
      animation: subtle-float 6s ease-in-out infinite;
    }
  `;

  return (
    <div className={cn("relative w-[460px] h-[470px] select-none group mx-auto", className)}>
      <style>{floatKeyframes}</style>

      {/* CAPA 4: FONDO (Node Card - Base) */}
      <div 
        className="absolute top-0 left-0 z-0 transition-transform duration-500 ease-out group-hover:-translate-y-[100px]"
        style={{ transform: 'translateY(-80px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0s' }}>
          <NodeCardLayer idPrefix={idPrefix + 'node'} />
        </div>
      </div>

      {/* CAPA 3: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[35px]"
        style={{ transform: 'translateY(-20px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '1.5s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 2: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-20 transition-transform duration-500 ease-out group-hover:translate-y-[30px]"
        style={{ transform: 'translateY(40px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '3s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 1: FRENTE (Waveform Card - Top) */}
      <div 
        className="absolute top-0 left-0 z-30 transition-transform duration-500 ease-out group-hover:translate-y-[100px] cursor-pointer"
        style={{ transform: 'translateY(100px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0.5s' }}>
          <WaveformCardLayer idPrefix={idPrefix + 'wave'} />
        </div>
      </div>

    </div>
  );
};