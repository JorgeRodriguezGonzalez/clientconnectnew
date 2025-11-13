import React from "react";

export default function HeroVideoSection() {
  return (
    <section className="flex items-center justify-between w-full h-screen bg-white overflow-hidden">
      {/* Texto a la izquierda */}
      <div className="w-1/2 p-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenido a Nuestra Plataforma
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Descubre una experiencia visual única con nuestro contenido dinámico.
          Este espacio combina diseño moderno y funcionalidad perfecta para tu marca.
        </p>
      </div>

      {/* Círculo ovalado con video a la derecha */}
      <div className="relative w-1/2 h-full flex items-center justify-end pr-8 md:pr-16">
        <div
          className="relative w-[1000px] h-[800px] rounded-full overflow-hidden"
          style={{
            borderRadius: "50%",
            transform: "translateX(20%)", // Empuja más a la derecha
          }}
        >
          {/* Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay azul oscuro */}
          <div className="absolute inset-0 bg-[#0b2b57] opacity-50" />
        </div>
      </div>
    </section>
  );
}