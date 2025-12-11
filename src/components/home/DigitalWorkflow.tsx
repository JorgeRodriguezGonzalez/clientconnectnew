import React, { useEffect, useState } from 'react';
import { Code, Box, BarChart, Activity, CheckCircle, Image as ImageIcon, Settings } from 'lucide-react';

const DigitalWorkflow = () => {
  // Generamos "partículas" estáticas iniciales para evitar errores de hidratación, 
  // luego las animamos con CSS.
  const [codeLines, setCodeLines] = useState([]);
  const [uiWidgets, setUiWidgets] = useState([]);

  useEffect(() => {
    // Generador de líneas de código aleatorias
    const syntaxColors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-orange-400', 'text-pink-400'];
    const snippets = ['const data = await fetch()', 'import { useState } from "react"', '<div className="flex">', 'if (process.env.NODE_ENV)', 'return response.json()', 'array.map(item => item.id)', 'export default Component'];
    
    const lines = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      color: syntaxColors[Math.floor(Math.random() * syntaxColors.length)],
      top: `${Math.random() * 90}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setCodeLines(lines);

    // Generador de componentes UI aleatorios
    const widgets = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      type: Math.floor(Math.random() * 4), // 0: Card, 1: Chart, 2: Button, 3: Image
      top: `${10 + Math.random() * 80}%`, // Evitamos los bordes extremos
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`
    }));
    setUiWidgets(widgets);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center font-sans">
      
      {/* --- ZONA 1: TÚNEL IZQUIERDO (Entrada de Código) --- */}
      <div className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-black via-gray-900 to-transparent z-0 overflow-hidden">
        {/* Efecto de viñeta y profundidad */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black opacity-80"></div>
        
        {/* Líneas de código moviéndose */}
        {codeLines.map((line) => (
          <div
            key={line.id}
            className={`absolute left-0 whitespace-nowrap font-mono text-sm ${line.color} opacity-0`}
            style={{
              top: line.top,
              animation: `codeFlow ${line.duration} linear infinite`,
              animationDelay: line.delay,
              textShadow: '0 0 5px currentColor'
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* --- ZONA 2: DISPOSITIVO CENTRAL (Procesamiento) --- */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* El Tablet */}
        <div className="w-[300px] h-[220px] bg-gray-900 rounded-[2rem] border-4 border-gray-700 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
          {/* Brillo interno */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
          
          {/* Pantalla */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Logo Placeholder */}
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Indicador de proceso */}
            <div className="flex flex-col items-center gap-2">
              <Settings className="w-8 h-8 text-blue-400 animate-spin-slow" />
              <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-progress w-full origin-left"></div>
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Processing</span>
            </div>
          </div>

          {/* Reflejo en pantalla */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Luz ambiental debajo del tablet */}
        <div className="absolute -bottom-10 w-40 h-10 bg-blue-500/30 blur-3xl rounded-full"></div>
      </div>

      {/* --- ZONA 3: TÚNEL DERECHO (Salida de UI) --- */}
      <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-[#0f172a] via-[#1e293b] to-transparent z-10 overflow-hidden">
        {/* Fondo sutilmente azulado */}
        <div className="absolute inset-0 bg-slate-900/20"></div>

        {/* Componentes UI saliendo */}
        {uiWidgets.map((widget) => (
          <div
            key={widget.id}
            className="absolute opacity-0"
            style={{
              top: widget.top,
              left: '0%', // Empiezan pegados al centro (donde está el iPad)
              animation: `uiFlow ${widget.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: widget.delay,
            }}
          >
            {/* Renderizado condicional de "Widgets" visuales */}
            {widget.type === 0 && (
              <div className="w-32 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 shadow-lg flex flex-col gap-2 transform rotate-y-12 hover:scale-105 transition-transform">
                <div className="w-1/3 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-full h-8 bg-white/5 rounded"></div>
              </div>
            )}
            {widget.type === 1 && (
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md">
                <BarChart className="text-indigo-300 w-10 h-10" />
              </div>
            )}
            {widget.type === 2 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full shadow-emerald-500/10 shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-100 font-medium">Done</span>
              </div>
            )}
            {widget.type === 3 && (
              <div className="w-28 h-28 bg-slate-800 border border-slate-600 rounded-lg p-1 shadow-2xl rotate-3">
                <div className="w-full h-full bg-slate-700/50 rounded flex items-center justify-center">
                  <ImageIcon className="text-slate-500" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estilos CSS globales para las animaciones (inyectados para simplicidad) */}
      <style>{`
        @keyframes codeFlow {
          0% { transform: translateX(-50px) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(50vw) scale(1); opacity: 0; } /* Termina en el centro */
        }

        @keyframes uiFlow {
          0% { transform: translateX(0) scale(0.5) perspective(500px) rotateY(10deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(50vw) scale(1.1) perspective(500px) rotateY(0deg); opacity: 0; }
        }

        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(0); margin-left: 100%; }
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DigitalWorkflow;