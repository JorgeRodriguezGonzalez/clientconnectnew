import React, { useId } from 'react';
import { cn } from '../../lib/utils';

// === Componentes de capas (sin cambios, solo añadimos className) ===

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-[-1] h-full w-full overflow-hidden opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const LayerBlueTop = ({ idPrefix, className }: { idPrefix: string; className?: string }) => (
  <div className={cn("absolute", className)} style={{ zIndex: 5, transform: 'matrix(1, 0, 0, 1, 0, -1.6404)' }}>
    <div style={{ transform: 'matrix(1, 0, 0, 1, 0, 68.5242)' }}>
      {/* Todo el SVG de LayerBlueTop que ya tenías... (lo dejo igual) */}
      <svg width="700" height="480" viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
        {/* ... todo tu SVG original ... */}
        <path d="M311.16 31.0619L560.529 175.142C565.072 177.767 565.048 181.98 560.475 184.552L504.258 216.174L238.438 62.5886L294.654 30.9667C299.227 28.3945 306.617 28.4371 311.16 31.0619Z" fill="#93C5FD" stroke="#2563EB" />
        {/* ... resto del SVG igual ... */}
      </svg>
    </div>
  </div>
);

const LayerZinc = ({ className }: { className?: string }) => (
  <div className={cn("absolute", className)} style={{ zIndex: 4, transform: 'matrix(1, 0, 0, 1, 0, -2.62899)' }}>
    <div style={{ transform: 'matrix(1, 0, 0, 1, 0, 34.2621)' }}>
      <svg width="700" height="480" viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
        {/* SVG original de LayerZinc */}
      </svg>
    </div>
  </div>
);

const LayerMiddle = ({ className }: { className?: string }) => (
  <div className={cn("absolute", className)} style={{ zIndex: 3 }}>
    <svg width="700" height="480" viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
      {/* SVG original de LayerMiddle */}
    </svg>
  </div>
);

const LayerBlueBottom = ({ className }: { className?: string }) => (
  <div className={cn("absolute", className)} style={{ zIndex: 2, transform: 'matrix(1, 0, 0, 1, 0, 2.62899)' }}>
    <div style={{ transform: 'matrix(1, 0, 0, 1, 0, -34.2621)' }}>
      <svg width="700" height="480" viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
        {/* SVG original de LayerBlueBottom */}
      </svg>
    </div>
  </div>
);

const LayerBlueBase = ({ idPrefix, className }: { idPrefix: string; className?: string }) => (
  <div className={cn("absolute", className)} style={{ zIndex: 1, transform: 'matrix(1, 0, 0, 1, 0, 1.6404)' }}>
    <div style={{ transform: 'matrix(1, 0, 0, 1, 0, -68.5242)' }}>
      <svg width="700" height="480" viewBox="0 0 700 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
        {/* SVG original de LayerBlueBase */}
      </svg>
    </div>
  </div>
);

// === COMPONENTE PRINCIPAL CON EFECTO HOVER 3D ===

export const BlueprintVisualization = () => {
  const idPrefix = useId().replace(/:/g, '');

  return (
    <div className={cn(
      "relative w-[720px] max-w-full overflow-hidden flex shrink-0 self-center",
      "lg:self-stretch min-h-[480px] md:min-h-[640px]",
      "group cursor-pointer" // <-- el group es clave
    )}>
      {/* Contenedor de las capas */}
      <div className="absolute inset-4 flex items-center justify-center lg:justify-end">
        <div className="hidden md:flex absolute inset-0 items-center justify-center lg:justify-end">
          {/* Cada capa con su movimiento sutil al hover */}
          <LayerBlueTop
            idPrefix={idPrefix}
            className="transition-all duration-700 ease-out group-hover:-translate-y-6 group-hover:translate-x-4"
          />
          <LayerZinc
            className="transition-all duration-700 ease-out group-hover:translate-y-2 group-hover:translate-x-2"
          />
          <LayerMiddle
            className="transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:-translate-x-3"
          />
          <LayerBlueBottom
            className="transition-all duration-700 ease-out group-hover:translate-y-2 group-hover:-translate-x-2"
          />
          <LayerBlueBase
            idPrefix={idPrefix}
            className="transition-all duration-700 ease-out group-hover:translate-y-6 group-hover:-translate-x-6"
          />
        </div>
      </div>

      <BackgroundStripes />
    </div>
  );
};