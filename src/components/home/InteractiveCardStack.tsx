import React, { useId, useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// --- Matriz de Transformación 3D ---
const MATRIX_TRANSFORM = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.681, 21.2223)";
const MATRIX_TRANSFORM_ALT = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.393, 17.2223)";

/**
 * CAPA SUPERIOR (NodeCardLayer) - DISEÑO TURQUESA
 * Z-Index: 0 (Fondo)
 */
const NodeCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none align-middle">
    <defs>
      <clipPath id={`${idPrefix}clip0`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip1`}>
        <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip2`}>
        <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip3`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip4`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.148 77.691)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip5`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 280.709 101.704)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip6`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.271 125.718)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip7`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 363.832 149.731)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip8`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.23 89.4573)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip9`}>
        <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.042 72.4279)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip10`}>
        <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 28.6738 109.197)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip11`}>
        <rect width="8" height="8" fill="white" transform="matrix(0.865865 0.500278 -0.871576 0.490261 275.411 257.72)" />
      </clipPath>
      <clipPath id={`${idPrefix}clip12`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.557 103.194)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip13`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.118 127.207)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip14`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 192.68 151.22)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip15`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.241 175.234)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip16`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 254.885 211.013)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip17`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.324 187)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip18`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.201 138.973)" fill="white" />
      </clipPath>
    </defs>

    <g>
      <g clipPath={`url(#${idPrefix}clip0)`}>
        {/* FONDO PRINCIPAL (Turquesa Pastel) */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="#8ED4D0" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" fill="#8ED4D0" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" stroke="#2E6B66" />
        
        {/* PANEL CLARO (Menta Muy Claro) */}
        <g clipPath={`url(#${idPrefix}clip1)`}>
          <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="#D4F2F0" />
          
          <g clipPath={`url(#${idPrefix}clip2)`}>
            <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="#D4F2F0" />
            
            <path d="M367.747 214.667C365.34 216.021 361.451 215.999 359.06 214.617C356.669 213.236 356.682 211.018 359.088 209.664C361.495 208.311 365.384 208.333 367.775 209.715C370.167 211.096 370.154 213.313 367.747 214.667ZM360.82 210.665C359.376 211.477 359.368 212.808 360.803 213.637C362.238 214.465 364.571 214.479 366.015 213.667C367.459 212.854 367.467 211.524 366.032 210.695C364.598 209.866 362.264 209.853 360.82 210.665Z" fill="#67BCB7" />
            <path d="M366.904 210.205C367.385 209.934 368.176 209.936 368.549 210.26C368.906 210.572 369.177 210.914 369.348 211.276C369.626 211.864 369.631 212.483 369.362 213.071C369.094 213.659 368.56 214.196 367.815 214.628C367.357 214.894 366.829 215.115 366.251 215.284C365.649 215.46 364.96 215.237 364.773 214.864C364.586 214.492 364.982 214.113 365.537 213.893C365.723 213.819 365.896 213.736 366.056 213.643C366.503 213.384 366.823 213.062 366.984 212.709C367.146 212.356 367.143 211.985 366.976 211.632C366.916 211.506 366.837 211.384 366.738 211.267C366.444 210.917 366.423 210.476 366.904 210.205Z" fill="#2E6B66" />
            
            <rect x="-0.00285524" y="0.495269" width="23" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 335.723 193.684)" fill="#D4F2F0" />
            <rect x="-0.00285524" y="0.495269" width="23" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 335.723 193.684)" stroke="#2E6B66" />
            <rect x="-0.00285524" y="0.495269" width="15" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 316.673 182.678)" fill="#D4F2F0" />
            <rect x="-0.00285524" y="0.495269" width="15" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 316.673 182.678)" stroke="#2E6B66" />
          </g>
          
          <rect x="-0.00285524" y="0.495269" width="307" height="19" transform="matrix(0.865865 0.500278 -0.871576 0.490261 117.134 59.9352)" stroke="#2E6B66" />
          
          {/* Nodos y conexiones */}
          <g clipPath={`url(#${idPrefix}clip3)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198 56.9032)" fill="#67BCB7" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198 56.9032)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198.017 53.9316)" stroke="#2E6B66" />
          
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 223.909 74.415)" fill="#2E6B66" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 265.47 98.4283)" fill="#2E6B66" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 307.032 122.442)" fill="#2E6B66" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 348.593 146.455)" fill="#2E6B66" />
          
          <g clipPath={`url(#${idPrefix}clip4)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.148 77.691)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.562 80.9165)" fill="#67BCB7" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.562 80.9165)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.579 77.9449)" stroke="#2E6B66" />
          
          <g clipPath={`url(#${idPrefix}clip5)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 280.709 101.704)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.123 104.93)" fill="#67BCB7" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.123 104.93)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.141 101.958)" stroke="#2E6B66" />
          
          <g clipPath={`url(#${idPrefix}clip6)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.271 125.718)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.685 128.943)" fill="#D4F2F0" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.685 128.943)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.702 125.972)" stroke="#2E6B66" />
          
          <g clipPath={`url(#${idPrefix}clip7)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 363.832 149.731)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.246 152.956)" fill="#D4F2F0" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.246 152.956)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.264 149.985)" stroke="#2E6B66" />
          
          <g clipPath={`url(#${idPrefix}clip8)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.23 89.4573)" fill="#F0FDFA" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.644 92.6827)" fill="#67BCB7" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.644 92.6827)" stroke="#2E6B66" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.661 89.7112)" stroke="#2E6B66" />
          <rect width="1" height="12" transform="matrix(0.865865 0.500278 -0.871576 0.490261 243.841 92.329)" fill="#2E6B66" />
          
          <path d="M386.91 168.606C385.525 169.385 383.286 169.372 381.91 168.577C380.534 167.782 380.541 166.506 381.926 165.727C383.312 164.948 385.55 164.96 386.926 165.756C388.303 166.551 388.295 167.827 386.91 168.606ZM382.923 166.303C382.092 166.77 382.088 167.536 382.913 168.013C383.739 168.49 385.082 168.498 385.913 168.03C386.744 167.563 386.749 166.797 385.923 166.32C385.097 165.843 383.754 165.835 382.923 166.303Z" fill="#67BCB7" />
          <path d="M386.425 166.038C386.702 165.882 387.157 165.883 387.371 166.07C387.521 166.2 387.645 166.341 387.739 166.488C387.914 166.762 387.984 167.055 387.942 167.345C387.9 167.635 387.748 167.916 387.497 168.169C387.246 168.422 386.901 168.64 386.487 168.809C386.072 168.978 385.598 169.093 385.096 169.147C384.595 169.201 384.078 169.193 383.581 169.122C383.085 169.051 382.62 168.919 382.22 168.737C382.005 168.639 381.811 168.527 381.642 168.404C381.401 168.228 381.545 167.983 381.894 167.884C382.242 167.785 382.662 167.873 382.942 168.029C382.992 168.057 383.045 168.084 383.099 168.109C383.34 168.218 383.618 168.297 383.916 168.34C384.214 168.382 384.524 168.387 384.825 168.355C385.126 168.323 385.411 168.253 385.659 168.152C385.908 168.051 386.115 167.92 386.266 167.768C386.416 167.616 386.507 167.448 386.532 167.274C386.557 167.099 386.516 166.924 386.411 166.759C386.387 166.722 386.36 166.685 386.329 166.649C386.16 166.448 386.148 166.194 386.425 166.038Z" fill="#2E6B66" />
        </g>
        
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.4733 72.6817)" stroke="#2E6B66" />
        
        {/* Sombra base final */}
        <rect x="-0.00285524" y="0.495269" width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 21.2223)" stroke="#2E6B66" />
      </g>
    </g>
  </svg>
);

/**
 * CAPA BASE (WaveCardLayer) - DISEÑO CORAL
 * Z-Index: 30 (Frente, superpuesta a todo)
 */
const WaveCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${idPrefix}_wave_clip`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="white" />
      </clipPath>
    </defs>
    <g>
      {/* Base de la tarjeta (Coral Suave) */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" fill="#E8A288" />
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" stroke="#9A4526" />
      
      {/* Decoración Izquierda */}
      <rect x="9.07227" y="115.314" width="8.50049" height="13.0286" fill="#E8A288" />
      <line x1="9.48145" y1="128.85" x2="9.48145" y2="111.85" stroke="#9A4526" />
      
      {/* Contenido PRINCIPAL */}
      <g clipPath={`url(#${idPrefix}_wave_clip)`}>
        {/* Fondo ondas (Crema/Piel) */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="#F9E2D8" />
        
        {/* --- NUEVA LETRA "C" --- */}
        <g transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)">
            {/* 1. Trazo trasero (Borde Oscuro) */}
            <path 
                d="M 192 80 A 40 40 0 1 0 192 128" 
                stroke="#9A4526" 
                strokeWidth="20" 
                strokeLinecap="round" 
                fill="none" 
            />
            {/* 2. Trazo delantero (Relleno Coral) */}
            <path 
                d="M 192 80 A 40 40 0 1 0 192 128" 
                stroke="#E8A288" 
                strokeWidth="16" 
                strokeLinecap="round" 
                fill="none" 
            />
        </g>
      </g>

      {/* Círculos dispersos */}
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.037 22.855)" fill="#E8A288" stroke="#9A4526" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 433.138 167.936)" fill="#E8A288" stroke="#9A4526" />
      
      {/* Borde Superior */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 11.2224)" stroke="#9A4526" />
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
  const idPrefix = useId().replace(/:/g, '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [stackFactor, setStackFactor] = useState(1); // Empezamos "expanded" por defecto

  // Lógica de scroll basada en la posición del componente (getBoundingClientRect)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Obtenemos la distancia del componente al top de la ventana
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculamos el progreso (0 a 1)
      // Si rect.top es alto (abajo de la pantalla) -> progress ~ 1 (Expandido)
      // Si rect.top es bajo (arriba de la pantalla) -> progress ~ 0 (Colapsado)
      // Usamos 0.8 * windowHeight como punto de referencia para que empiece a colapsar
      const progress = Math.min(Math.max(rect.top / (windowHeight * 0.8), 0), 1);
      
      // Mapeamos el progreso al factor de apilamiento (0.2 a 1)
      const newFactor = 0.2 + (0.8 * progress);
      
      setStackFactor(newFactor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Ejecutar una vez al inicio para determinar posición inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div ref={containerRef} className={cn("relative w-[460px] h-[470px] select-none group mx-auto", className)}>
      <style>{floatKeyframes}</style>

      {/* CAPA 4: FONDO (Wave Card - Diseño Ondas CORAL) - Z-Index 30 (Frente) */}
      <div 
        className="absolute top-0 left-0 z-30 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${-160 * stackFactor}px)` }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0s' }}>
          <WaveCardLayer idPrefix={idPrefix + 'wave'} />
        </div>
      </div>

      {/* CAPA 3: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-10 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${-60 * stackFactor}px)` }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '1.5s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 2: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-20 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${60 * stackFactor}px)` }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '3s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 1: FRENTE (Node Card - Diseño TURQUESA) - Z-Index 0 (Fondo) */}
      <div 
        className="absolute top-0 left-0 z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${180 * stackFactor}px)` }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0.5s' }}>
          <NodeCardLayer idPrefix={idPrefix + 'node'} />
        </div>
      </div>

    </div>
  );
};