import { useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { Send, Calendar } from 'lucide-react';
import { motion } from "framer-motion";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0.4, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.4, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0.4, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.4, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.4, 0.8], [0, 1.2]);

  // Transformaciones para el gradiente: Azul espacial casi negro → Azul oscuro → Azul medio
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgb(10, 15, 35)",       // Azul espacial casi negro (inicio)
      "rgb(20, 35, 90)",       // Azul oscuro (medio)
      "rgb(35, 55, 140)"       // Azul medio oscuro (final)
    ]
  );

  // Transform para el overlay glassmorphism
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [0, 0.3, 0.6]
  );

  const overlayBlur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [0, 8, 16]
  );

  // WebGL Shader Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported.');
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment shader
    const fsSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      const float overallSpeed = 0.2;
      const float gridSmoothWidth = 0.015;
      const float axisWidth = 0.05;
      const float majorLineWidth = 0.025;
      const float minorLineWidth = 0.0125;
      const float majorLineFrequency = 5.0;
      const float minorLineFrequency = 1.0;
      const vec4 gridColor = vec4(0.5);
      const float scale = 5.0;
      const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);
      const float minLineWidth = 0.01;
      const float maxLineWidth = 0.2;
      const float lineSpeed = 1.0 * overallSpeed;
      const float lineAmplitude = 1.0;
      const float lineFrequency = 0.2;
      const float warpSpeed = 0.2 * overallSpeed;
      const float warpFrequency = 0.5;
      const float warpAmplitude = 1.0;
      const float offsetFrequency = 0.5;
      const float offsetSpeed = 1.33 * overallSpeed;
      const float minOffsetSpread = 0.6;
      const float maxOffsetSpread = 2.0;
      const int linesPerGroup = 16;

      #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
      #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
      #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
      #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

      float drawGridLines(float axis) {
        return drawCrispLine(0.0, axisWidth, axis)
              + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
              + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
      }

      float drawGrid(vec2 space) {
        return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
      }

      float random(float t) {
        return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
      }

      float getPlasmaY(float x, float horizontalFade, float offset) {
        return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec4 fragColor;
        vec2 uv = fragCoord.xy / iResolution.xy;
        vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

        float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
        float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

        space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
        space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

        vec4 lines = vec4(0.0);
        vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);
        vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);

        for(int l = 0; l < linesPerGroup; l++) {
          float normalizedLineIndex = float(l) / float(linesPerGroup);
          float offsetTime = iTime * offsetSpeed;
          float offsetPosition = float(l) + space.x * offsetFrequency;
          float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
          float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
          float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
          float linePosition = getPlasmaY(space.x, horizontalFade, offset);
          float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

          float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
          vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
          float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

          line = line + circle;
          lines += line * lineColor * rand;
        }

        fragColor = mix(bgColor1, bgColor2, uv.x);
        fragColor *= verticalFade;
        fragColor.a = 1.0;
        fragColor += lines;

        gl_FragColor = fragColor;
      }
    `;

    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const initShaderProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      if (!vertexShader || !fragmentShader) return null;

      const shaderProgram = gl.createProgram();
      if (!shaderProgram) return null;

      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Shader program link error: ', gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    };

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
      },
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let startTime = Date.now();
    let animationId: number;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ 
        backgroundColor 
      }}
      className="h-[300vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
    >
      {/* Canvas con Shader de líneas animadas - sticky para que esté visible desde el inicio */}
      <div className="sticky top-0 h-screen w-full pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full opacity-40"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Contenido con texto y CTAs */}
      <div className="sticky top-0 h-screen flex items-start justify-center pt-32 md:pt-40">
        <div className="z-10 flex flex-col items-center justify-center gap-6 max-w-[976px] px-5">
          {/* Badge superior */}
          <div className="flex items-center justify-center gap-1.5 h-[21px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 py-0.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-[2px] overflow-hidden p-0.5">
              <div className="w-full h-full bg-green-500 rounded-full" />
            </div>
            <p className="text-[11px] font-medium leading-[16.6px] text-center whitespace-nowrap text-white/80">
              Sydney's Premier Marketing Agency • 100+ Happy Clients
            </p>
          </div>

          {/* Título principal */}
          <h1 
            className="text-4xl md:text-[64px] font-bold leading-tight md:leading-[70.4px] text-center text-white"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '-1.8px',
            }}
          >
            Connecting Sydney Businesses with Their Ideal Clients
          </h1>
          
          {/* Subtítulo */}
          <p 
            className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[27px] text-center text-white/80 max-w-[683px]"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '0.2px'
            }}
          >
            We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {/* CTA Secundario */}
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-[7px] h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-4 py-2 transition-all cursor-pointer w-full sm:w-auto" 
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <Send className="w-6 h-6 text-white" />
              </div>
              <p 
                className="text-[14px] font-medium leading-5 text-white whitespace-nowrap"
                style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '0.2px',
                }}
              >
                Message
              </p>
            </a>

            {/* CTA Principal */}
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-1.5 h-[42px] bg-[#F6941D] hover:bg-[#e58315] rounded-[50px] px-5 py-3 transition-all cursor-pointer shadow-lg w-full sm:w-auto" 
            >
              <div className="w-[18px] h-[14px] relative overflow-hidden">
                <Calendar className="w-[17px] h-[14px] text-white" />
              </div>
              <p 
                className="text-[14px] font-medium leading-5 text-white whitespace-nowrap z-[1]"
                style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '0.2px'
                }}
              >
                Book Free Consultation →
              </p>
            </a>
          </div>

          {/* Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                Google Partner
              </p>
            </div>

            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                5★ Rated Agency
              </p>
            </div>
          </div>

        </div>

        {/* Overlay glassmorphism que difumina el contenido del hero */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundColor: useTransform(
              overlayOpacity,
              (value) => `rgba(255, 255, 255, ${value * 0.1})`
            ),
            backdropFilter: useTransform(
              overlayBlur,
              (value) => `blur(${value}px)`
            ),
            WebkitBackdropFilter: useTransform(
              overlayBlur,
              (value) => `blur(${value}px)`
            ),
          }}
        />
      </div>

      {/* Efecto SVG de fondo */}
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        scrollYProgress={scrollYProgress}
      />
    </motion.div>
  );
}