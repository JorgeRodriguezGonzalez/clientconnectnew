import React, { useId } from 'react';
import { cn } from '@/lib/utils';

// --- Constantes de Transformación 3D ---
const MATRIX_TRANSFORM = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.681, 21.2223)";
const MATRIX_TRANSFORM_ALT = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.393, 17.2223)";

// --- Sub-componente 1: Tarjeta Principal (Node Design - Frente) ---
const NodeCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none align-middle">
    <defs>
      <clipPath id={`${idPrefix}clip0`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip1`}>
        <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="white" />
      </clipPath>
      {/* Recortes simplificados para los detalles internos */}
      <clipPath id={`${idPrefix}clip2`}>
         <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="white" />
      </clipPath>
    </defs>
    <g>
      <g clipPath={`url(#${idPrefix}clip0)`}>
        {/* Fondo Azul Principal */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="#93c5fd" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" fill="#93c5fd" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" stroke="#3b82f6" />
        
        {/* Panel Superior Claro */}
        <g clipPath={`url(#${idPrefix}clip1)`}>
          <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="#bfdbfe" />
          
          <g clipPath={`url(#${idPrefix}clip2)`}>
             <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="#bfdbfe" />
          </g>

          {/* Gráfico de Nodos y Conexiones */}
          {/* Nodo Grande Derecha */}
          <path d="M367.747 214.667C365.34 216.021 361.451 215.999 359.06 214.617C356.669 213.236 356.682 211.018 359.088 209.664C361.495 208.311 365.384 208.333 367.775 209.715C370.167 211.096 370.154 213.313 367.747 214.667ZM360.82 210.665C359.376 211.477 359.368 212.808 360.803 213.637C362.238 214.465 364.571 214.479 366.015 213.667C367.459 212.854 367.467 211.524 366.032 210.695C364.598 209.866 362.264 209.853 360.82 210.665Z" fill="#60a5fa" />
          
          {/* Nodos Pequeños (Muestra) */}
          <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="#eff6ff" />
          <rect width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198.017 53.9316)" stroke="#3b82f6" />
          
          <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.148 77.691)" fill="#eff6ff" />
          <rect width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.579 77.9449)" stroke="#3b82f6" />

          {/* Líneas de conexión */}
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 223.909 74.415)" fill="#3b82f6" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 265.47 98.4283)" fill="#3b82f6" />
          
          {/* Checkmark Azul */}
          <path d="M386.91 168.606C385.525 169.385 383.286 169.372 381.91 168.577C380.534 167.782 380.541 166.506 381.926 165.727C383.312 164.948 385.55 164.96 386.926 165.756C388.303 166.551 388.295 167.827 386.91 168.606ZM382.923 166.303C382.092 166.77 382.088 167.536 382.913 168.013C383.739 168.49 385.082 168.498 385.913 168.03C386.744 167.563 386.749 166.797 385.923 166.32C385.097 165.843 383.754 165.835 382.923 166.303Z" fill="#60a5fa" />
          <path d="M386.425 166.038C386.702 165.882 387.157 165.883 387.371 166.07C387.521 166.2 387.645 166.341 387.739 166.488C387.914 166.762 387.984 167.055 387.942 167.345C387.9 167.635 387.748 167.916 387.497 168.169C387.246 168.422 386.901 168.64 386.487 168.809C386.072 168.978 385.598 169.093 385.096 169.147C384.595 169.201 384.078 169.193 383.581 169.122C383.085 169.051 382.62 168.919 382.22 168.737C382.005 168.639 381.811 168.527 381.642 168.404C381.401 168.228 381.545 167.983 381.894 167.884C382.242 167.785 382.662 167.873 382.942 168.029C382.992 168.057 383.045 168.084 383.099 168.109C383.34 168.218 383.618 168.297 383.916 168.34C384.214 168.382 384.524 168.387 384.825 168.355C385.126 168.323 385.411 168.253 385.659 168.152C385.908 168.051 386.115 167.92 386.266 167.768C386.416 167.616 386.507 167.448 386.532 167.274C386.557 167.099 386.516 166.924 386.411 166.759C386.387 166.722 386.36 166.685 386.329 166.649C386.16 166.448 386.148 166.194 386.425 166.038Z" fill="#3b82f6" />
        </g>

        {/* Borde Exterior */}
        <rect x="-0.00285524" y="0.495269" width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 21.2223)" stroke="#3b82f6" />
      </g>
    </g>
  </svg>
);

// --- Sub-componente 2: Tarjeta Base (Wave Design - Fondo) ---
const WaveCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${idPrefix}_wave_clip`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}_bar_clip`}>
         <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="white" />
      </clipPath>
    </defs>
    <g>
      {/* Base de la tarjeta */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" fill="#93c5fd" />
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" stroke="#3b82f6" />
      
      {/* Decoración Izquierda */}
      <rect x="9.07227" y="115.314" width="8.50049" height="13.0286" fill="#93c5fd" />
      <line x1="9.48145" y1="128.85" x2="9.48145" y2="111.85" stroke="#3b82f6" />
      
      {/* Contenido de Ondas */}
      <g clipPath={`url(#${idPrefix}_wave_clip)`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="#eff6ff" />
        <path d="M267.32 145.001L267.037 145.188L267.254 145.403C272.754 150.884 271.48 157.941 263.28 162.554C253.493 168.059 237.675 167.968 227.952 162.35L190.672 140.81C182.94 136.343 182.981 129.174 190.764 124.797C198.337 120.537 210.434 120.525 218.202 124.654L218.744 124.942L219.139 124.588C220.344 123.504 221.707 122.475 223.361 121.545C235.153 114.912 254.213 115.022 265.928 121.79C277.059 128.222 277.426 138.316 267.32 145.001Z" fill="#93c5fd" stroke="#3b82f6" />
        <path d="M243.874 138.037C250.893 137.857 258.027 139.312 263.372 142.4C264.974 143.326 266.246 144.387 267.326 145.464" stroke="#3b82f6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M267.32 143.001L267.037 143.188L267.254 143.403C272.754 148.884 271.48 155.941 263.28 160.554C253.493 166.059 237.675 165.968 227.952 160.35L190.672 138.81C182.94 134.343 182.981 127.174 190.764 122.797C198.337 118.537 210.434 118.525 218.202 122.654L218.744 122.942L219.139 122.588C220.344 121.504 221.707 120.475 223.361 119.545C235.153 112.912 254.213 113.022 265.928 119.79C277.059 126.222 277.426 136.316 267.32 143.001Z" fill="#bfdbfe" stroke="#3b82f6" />
        
        {/* Barra de Progreso */}
         <g clipPath={`url(#${idPrefix}_bar_clip)`}>
            <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#dbeafe" />
            <rect width="32" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#60a5fa" />
         </g>
        <rect width="47" height="5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 177.402 148.387)" stroke="#3b82f6" />
      </g>

      {/* Círculos dispersos */}
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.037 22.855)" fill="#93c5fd" stroke="#3b82f6" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 433.138 167.936)" fill="#93c5fd" stroke="#3b82f6" />
      
      {/* Borde Superior */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 11.2224)" stroke="#3b82f6" />
    </g>
  </svg>
);

// --- Sub-componente 3: Tarjeta Fantasma (Relleno) ---
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
  const idPrefix = useId().replace(/:/g, ''); // Sanitizar ID para asegurar compatibilidad en selectores SVG

  // Definimos la animación de flotación en una etiqueta style local para no depender de tailwind.config
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

      {/* CAPA 4: FONDO (Wave Card) 
          Orden de Z-index: 0 (Fondo).
          Comportamiento Hover: Se mueve hacia arriba para asomarse.
          Animación Idle: Flota con un retraso.
      */}
      <div 
        className="absolute top-0 left-0 z-0 transition-transform duration-500 ease-out group-hover:-translate-y-[100px]"
        style={{ transform: 'translateY(-80px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0s' }}>
          <WaveCardLayer idPrefix={idPrefix + 'wave'} />
        </div>
      </div>

      {/* CAPA 3: FANTASMA 
          Orden de Z-index: 10.
          Comportamiento Hover: Se expande ligeramente hacia arriba.
      */}
      <div 
        className="absolute top-0 left-0 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[35px]"
        style={{ transform: 'translateY(-20px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '1.5s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 2: FANTASMA 
          Orden de Z-index: 20.
          Comportamiento Hover: Se expande hacia abajo.
      */}
      <div 
        className="absolute top-0 left-0 z-20 transition-transform duration-500 ease-out group-hover:translate-y-[30px]"
        style={{ transform: 'translateY(40px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '3s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 1: FRENTE (Node Card) 
          Orden de Z-index: 30 (Tope).
          Comportamiento Hover: Se desplaza hacia abajo para dar espacio al stack.
          Animación Idle: Flota.
      */}
      <div 
        className="absolute top-0 left-0 z-30 transition-transform duration-500 ease-out group-hover:translate-y-[100px] cursor-pointer"
        style={{ transform: 'translateY(100px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0.5s' }}>
          <NodeCardLayer idPrefix={idPrefix + 'node'} />
        </div>
      </div>

    </div>
  );
};