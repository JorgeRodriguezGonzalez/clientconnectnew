import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Clock, Zap, Mountain, Check } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  badge?: string;
  mainTitle?: string;
  mainTitleHighlight?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  cardTitle?: string;
  cardImages?: string[];
  cardStats?: Array<{ icon: React.ReactNode; label: string }>;
  cardDescription?: string;
  cardHref?: string;
};

// Film grain shader
const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0 },
    grainSize: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    uniform float grainSize;
    varying vec2 vUv;
    
    float random(vec2 p) {
      return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      vec2 grainUV = vUv * grainSize;
      float grain = random(grainUV + time * 0.1);
      grain = (grain - 0.5) * intensity;
      
      color.rgb += grain;
      
      float vignette = 1.0 - length(vUv - 0.5) * 0.3 * intensity;
      color.rgb *= vignette;
      
      gl_FragColor = color;
    }
  `
};

// Gradient distortion shader
const GradientDistortionShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    distortion: { value: 0 },
    mouseX: { value: 0.5 },
    mouseY: { value: 0.5 },
    gradientShift: { value: 0 },
    bloomThreshold: { value: 0.8 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float distortion;
    uniform float mouseX;
    uniform float mouseY;
    uniform float gradientShift;
    uniform float bloomThreshold;
    varying vec2 vUv;
    
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 mouse = vec2(mouseX, mouseY);
      float dist = distance(uv, mouse);
      
      float wave = sin(dist * 10.0 - time * 2.0) * distortion;
      uv += normalize(uv - mouse) * wave * 0.02;
      
      vec4 color = texture2D(tDiffuse, uv);
      
      float gradientAngle = time * 0.5 + gradientShift;
      float gradientPos = uv.x * cos(gradientAngle) + uv.y * sin(gradientAngle);
      vec3 gradientColor = hsv2rgb(vec3(gradientPos + time * 0.1, 0.7, 1.0));
      
      color.rgb = mix(color.rgb, gradientColor, 0.3 * distortion);
      
      float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      if (brightness > bloomThreshold * (1.0 - distortion * 0.3)) {
        color.rgb *= 1.0 + distortion * 0.5;
      }
      
      float r = texture2D(tDiffuse, uv + vec2(0.002, 0.0) * distortion).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - vec2(0.002, 0.0) * distortion).b;
      
      vec3 finalColor = vec3(r, g, b);
      finalColor = mix(finalColor, gradientColor, 0.2 * distortion);
      
      gl_FragColor = vec4(finalColor, color.a);
    }
  `
};

// Advanced Badge Component
const AdvancedBadge = ({ children }: { children: React.ReactNode }) => {
  const badgeRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const gradientRef = useRef(null);
  const filmGrainRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const distortionPassRef = useRef(null);
  const bloomPassRef = useRef(null);
  const filmGrainPassRef = useRef(null);
  const meshRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.0,
      0.6,
      0.7
    );
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const distortionPass = new ShaderPass(GradientDistortionShader);
    distortionPassRef.current = distortionPass;
    composer.addPass(distortionPass);

    const filmGrainPass = new ShaderPass(FilmGrainShader);
    filmGrainPassRef.current = filmGrainPass;
    composer.addPass(filmGrainPass);

    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0xedbf86) },
        color2: { value: new THREE.Color(0xde8363) },
        color3: { value: new THREE.Color(0x67bcb7) },
        time: { value: 0 },
        mouseX: { value: 0.5 },
        mouseY: { value: 0.5 },
        hover: { value: 0 },
        bloomStrength: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float hover;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float displacement = sin(pos.x * 10.0 + time) * sin(pos.y * 10.0 + time) * 0.02 * hover;
          pos.z += displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        uniform float hover;
        uniform float bloomStrength;
        varying vec2 vUv;
        
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 mouse = vec2(mouseX, mouseY);
          
          float mouseDist = distance(uv, mouse);
          float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDist);
          
          float noise = snoise(uv * 3.0 + time * 0.2) * 0.5 + 0.5;
          float gradientNoise = snoise(uv * 2.0 - time * 0.1) * 0.5 + 0.5;
          
          vec3 gradient = mix(color1, color2, uv.x + sin(time * 0.5) * 0.2);
          gradient = mix(gradient, color3, uv.y + cos(time * 0.3) * 0.2);
          
          gradient = mix(gradient, color3, noise * 0.3);
          
          vec3 mouseGradient = mix(color2, color3, mouseInfluence);
          gradient = mix(gradient, mouseGradient, hover * 0.5);
          
          float radial = 1.0 - length(uv - 0.5) * 2.0;
          radial = smoothstep(0.0, 1.0, radial);
          gradient *= 0.8 + radial * 0.2;
          
          float shimmer = sin(uv.x * 20.0 - time * 3.0) * sin(uv.y * 20.0 + time * 2.0);
          shimmer = shimmer * 0.05 * hover;
          gradient += shimmer;
          
          float bloomBoost = 1.0 + bloomStrength * mouseInfluence * 2.0;
          gradient *= bloomBoost;
          
          float hotSpot = smoothstep(0.3, 0.0, mouseDist) * hover;
          gradient += vec3(hotSpot * 0.5);
          
          gl_FragColor = vec4(gradient, 1.0);
        }
      `,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const time = performance.now() * 0.001;
      
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.uniforms.time.value = time;
        meshRef.current.material.uniforms.hover.value = gsap.utils.interpolate(
          meshRef.current.material.uniforms.hover.value,
          isHovered ? 1 : 0,
          0.1
        );
        meshRef.current.material.uniforms.bloomStrength.value = gsap.utils.interpolate(
          meshRef.current.material.uniforms.bloomStrength.value,
          isHovered ? 1 : 0,
          0.1
        );
      }
      
      if (bloomPassRef.current) {
        bloomPassRef.current.strength = gsap.utils.interpolate(
          bloomPassRef.current.strength,
          isHovered ? 1.5 : 0,
          0.1
        );
      }
      
      if (filmGrainPassRef.current && filmGrainPassRef.current.uniforms) {
        filmGrainPassRef.current.uniforms.time.value = time;
        filmGrainPassRef.current.uniforms.intensity.value = gsap.utils.interpolate(
          filmGrainPassRef.current.uniforms.intensity.value,
          isHovered ? 0.3 : 0,
          0.1
        );
      }
      
      if (distortionPassRef.current && distortionPassRef.current.uniforms) {
        distortionPassRef.current.uniforms.time.value = time;
        distortionPassRef.current.uniforms.distortion.value = gsap.utils.interpolate(
          distortionPassRef.current.uniforms.distortion.value,
          isHovered ? 1 : 0,
          0.1
        );
        distortionPassRef.current.uniforms.gradientShift.value = mousePos.x * Math.PI * 2;
      }
      
      if (composerRef.current) {
        composerRef.current.render();
      }
    };

    const handleResize = () => {
      const rect = badgeRef.current?.getBoundingClientRect();
      if (rect) {
        renderer.setSize(rect.width, rect.height);
        composer.setSize(rect.width, rect.height);
      }
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [isHovered, mousePos]);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(badgeRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(textRef.current, {
      letterSpacing: '0.05em',
      duration: 0.3,
      ease: 'power2.out'
    }, 0)
    .to(glowRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.out'
    }, 0)
    .to(gradientRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0);

    if (filmGrainRef.current) {
      tl.to(filmGrainRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);
    }

    if (badgeRef.current) {
      badgeRef.current._timeline = tl;
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (badgeRef.current && badgeRef.current._timeline) {
      badgeRef.current._timeline.play();
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        filter: 'blur(40px)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (badgeRef.current && badgeRef.current._timeline) {
      badgeRef.current._timeline.reverse();
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        filter: 'blur(20px)',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!badgeRef.current) return;
    
    const rect = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
    
    if (distortionPassRef.current && distortionPassRef.current.uniforms) {
      distortionPassRef.current.uniforms.mouseX.value = x;
      distortionPassRef.current.uniforms.mouseY.value = y;
    }

    if (meshRef.current && meshRef.current.material && meshRef.current.material.uniforms) {
      meshRef.current.material.uniforms.mouseX.value = x;
      meshRef.current.material.uniforms.mouseY.value = y;
    }

    badgeRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
    badgeRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
  };

  return (
    <div
      ref={badgeRef}
      className="advanced-badge"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      } as React.CSSProperties}
    >
      <style>{`
        .advanced-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 12px;
          cursor: pointer;
          overflow: hidden;
          background: linear-gradient(135deg, #edbf86 0%, #de8363 50%, #67bcb7 100%);
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.07), 0 8px 8px 0 rgba(0,0,0,0.06);
        }

        .badge-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .film-grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 3px
          );
          mix-blend-mode: overlay;
        }

        .badge-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .badge-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(237, 191, 134, 0.6) 0%, transparent 70%);
          opacity: 0;
          filter: blur(20px);
          pointer-events: none;
        }

        .badge-text {
          position: relative;
          z-index: 1;
          color: white;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: -0.3px;
          text-transform: capitalize;
        }

        .badge-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <canvas ref={canvasRef} className="badge-canvas" />
      
      <div ref={filmGrainRef} className="film-grain-overlay" />
      
      <div ref={gradientRef} className="badge-gradient" />
      
      <div ref={glowRef} className="badge-glow" />
      
      <div className="badge-icon">
        <svg width="16" height="16" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M14.5 0L17.5 5L23 6L18.5 10.5L19.5 16L14.5 13L9.5 16L10.5 10.5L6 6L11.5 5L14.5 0Z" 
            fill="white"
          />
        </svg>
      </div>
      
      <span ref={textRef} className="badge-text">
        {children}
      </span>
    </div>
  );
};

// Componente FadeInText con glass blur
const FadeInText = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const directionOffset = {
    up: { y: 10, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: "blur(10px)",
        ...directionOffset[direction]
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        filter: isInView ? "blur(0px)" : "blur(10px)",
        y: isInView ? 0 : directionOffset[direction].y,
        x: isInView ? 0 : directionOffset[direction].x
      }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Componente TaskTimeline integrado con fade in glass blur
const TaskTimeline = () => {
  type TaskStatus = 'pending' | 'active' | 'complete';
  type TaskItem = {
    id: string;
    title: string;
    time: string;
    status: TaskStatus;
    actions: string;
  };

  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const timelineRef = React.useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.3 });
  
  const tasksData: TaskItem[] = [
    {
      id: '1',
      title: 'Planning Design',
      time: 'Jan 15',
      status: 'pending',
      actions: '1 more action'
    },
    {
      id: '2',
      title: 'Designing...',
      time: '',
      status: 'pending',
      actions: '2 more action'
    },
    {
      id: '3',
      title: 'Complete Design',
      time: 'Feb 28',
      status: 'pending',
      actions: ''
    }
  ];

  const [tasks, setTasks] = React.useState<TaskItem[]>(tasksData);

  React.useEffect(() => {
    if (currentTaskIndex >= tasks.length) {
      const resetTimer = setTimeout(() => {
        setTasks(tasksData);
        setCurrentTaskIndex(0);
        setProgress(0);
      }, 1000);
      return () => clearTimeout(resetTimer);
    }

    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration * 100, 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setTasks(prev => prev.map((task, idx) => idx === currentTaskIndex ? {
            ...task,
            status: 'complete' as TaskStatus
          } : task));
          setCurrentTaskIndex(prev => prev + 1);
          setProgress(0);
        }, 300);
      }
    };

    setTasks(prev => prev.map((task, idx) => idx === currentTaskIndex ? {
      ...task,
      status: 'active' as TaskStatus
    } : task));
    requestAnimationFrame(animate);
  }, [currentTaskIndex, tasks.length]);

  const circumference = 2 * Math.PI * 12;

  return (
    <div 
      ref={timelineRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-[340px] rounded-2xl border p-6 transition-all duration-300 ${
        isHovered 
          ? 'bg-white border-gray-200 shadow-lg' 
          : 'bg-black border-gray-800 shadow-sm'
      }`}
      style={{
        opacity: isTimelineInView ? 1 : 0,
        filter: isTimelineInView ? 'blur(0px)' : 'blur(10px)',
        transform: 'translateZ(0)',
        transition: 'opacity 0.8s ease-out 1.0s, filter 0.8s ease-out 1.0s'
      }}
    >
      <div className="space-y-0">
        {tasks.map((task, index) => (
          <div key={task.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-500 relative">
                {task.status === 'complete' && (
                  <div className={`w-full h-full rounded-full border-[3px] flex items-center justify-center transition-colors duration-300 ${
                    isHovered 
                      ? 'border-[#de8363] bg-[#de8363]'
                      : 'border-white bg-white' 
                  }`}>
                    <Check className={`w-4 h-4 stroke-[3] transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-black'
                    }`} />
                  </div>
                )}
                {task.status === 'active' && (
                  <div className="w-full h-full relative">
                    <div className={`w-full h-full rounded-full border-[3px] absolute inset-0 transition-colors duration-300 ${
                      isHovered 
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-700 bg-black' 
                    }`} />
                    <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 40 40">
                      <circle 
                        cx="20" 
                        cy="20" 
                        r="12" 
                        fill="none" 
                        stroke={isHovered ? '#de8363' : 'white'}
                        strokeWidth="3" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={circumference - progress / 100 * circumference} 
                        strokeLinecap="round" 
                        className="transition-all duration-300" 
                      />
                    </svg>
                  </div>
                )}
                {task.status === 'pending' && (
                  <div className={`w-full h-full rounded-full border-[3px] transition-colors duration-300 ${
                    isHovered 
                      ? 'border-gray-300 bg-white'
                      : 'border-gray-700 bg-black' 
                  }`} />
                )}
              </div>
              {index < tasks.length - 1 && (
                <div className={`w-0.5 h-8 my-1 transition-all duration-500 ${
                  task.status === 'complete' 
                    ? (isHovered ? 'bg-[#de8363]' : 'bg-white')
                    : (isHovered ? 'bg-gray-300' : 'bg-gray-700')
                }`} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-sm font-medium transition-colors duration-300 ${
                  task.status === 'active' || task.status === 'complete' 
                    ? (isHovered ? 'text-[#de8363]' : 'text-white')
                    : (isHovered ? 'text-gray-400' : 'text-gray-500')
                }`}>
                  {task.title}
                </h3>
                {task.time && (
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    task.status === 'active' || task.status === 'complete' 
                      ? (isHovered ? 'text-[#de8363]' : 'text-white')
                      : (isHovered ? 'text-gray-400' : 'text-gray-500')
                  }`}>
                    {task.time}
                  </span>
                )}
              </div>
              {task.actions && (
                <p className={`text-xs transition-colors duration-300 ${
                  isHovered ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {task.actions}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente AnimatedHikeCard integrado con glass blur
const AnimatedHikeCard = ({ 
  title, 
  images, 
  stats, 
  description, 
  href
}: {
  title: string;
  images: string[];
  stats: Array<{ icon: React.ReactNode; label: string }>;
  description: string;
  href: string;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ 
        opacity: 0, 
        x: -50,
        filter: "blur(10px)"
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : -50,
        filter: isInView ? "blur(0px)" : "blur(10px)"
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.3, 
        ease: "easeOut" 
      }}
      className="group relative block w-full max-w-sm cursor-pointer rounded-2xl border bg-white p-6 shadow-lg hover:translate-y-0 hover:shadow-sm lg:max-w-md"
      style={{
        transform: isHovered ? 'translateY(0)' : 'translateY(-4px)'
      }}
    >
      <div className="flex flex-col">
        
        {/* Card Header: Title */}
        <div className="mb-3">
          <h2 className="text-[2px] md:text-[8px] lg:text-[18px] font-[500] leading-[1.1] tracking-tight text-gray-900">{title}</h2>
        </div>

        {/* Stats Section - Moved here */}
        <div className="mb-6 flex items-center space-x-4 text-sm text-gray-600">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1.5">
              {stat.icon}
              <span className="font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
        
        {/* Stacked Images with Hover Animation */}
        <div className="relative mb-6 h-32">
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute h-full w-[40%] overflow-hidden rounded-lg border-2 border-white shadow-md transition-all duration-300 ease-in-out"
              style={{
                transform: isHovered 
                  ? `translateX(${index * 32}px)`
                  : `translateX(${index * 80}px) rotate(${index * 5 - 5}deg)`,
                zIndex: images.length - index,
              }}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Description */}
        <p className="text-[12px] md:text-[14px] font-normal leading-relaxed text-gray-600 tracking-tight">
          {description}
        </p>
      </div>
    </motion.a>
  );
};

const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    badge = 'Digital Marketing Excellence',
    mainTitle = 'Elevate Your Brand with',
    mainTitleHighlight = 'Data-Driven Marketing',
    subtitle = 'Strategic marketing solutions that drive growth, build brands, and deliver measurable results for your business.',
    ctaText = 'Book a Call',
    ctaHref = '#',
    cardTitle = 'Subject: Q4 Strategy Update',
    cardImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    ],
    cardStats = [
      { icon: <Clock className="h-4 w-4" />, label: 'Next 30 Days' },
      { icon: <Mountain className="h-4 w-4" />, label: '3 Phases' },
      { icon: <Zap className="h-4 w-4" />, label: 'High Priority' },
    ],
    cardDescription = 'We\'re implementing your new SEO strategy starting next week. We\'ll optimize 15 key pages, enhance site speed, and launch targeted content campaigns. Timeline: 30 days. Let\'s drive measurable growth!',
    cardHref = '#',
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  const { scrollYProgress: scrollYProgressBorderRadius } = useScroll({
    target: ref,
    offset: ["start 130vh", "start 100vh"]
  });

  const { scrollYProgress: scrollYProgressEllipse } = useScroll({
    target: ref,
    offset: ["start 120vh", "start 80vh"]
  });

  const { scrollYProgress: scrollYProgressBorder } = useScroll({
    target: ref,
    offset: ["start 120vh", "start center"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#000000", "#1a1a1a", "#ffffff"]
  );

  const borderColor = useTransform(
    scrollYProgressBorder,
    [0, 0.15, 0.15, 0.151],
    ["#e5e7eb", "#000000", "#1a1a1a", "#ffffff"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#ffffff", "#ffffff", "#000000"]
  );

  const subtitleColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#d1d5db", "#d1d5db", "#6b7280"]
  );

  const borderRadius = useTransform(
    scrollYProgressBorderRadius,
    [0, 0.2925],
    ["100%", "0%"]
  );

  const ellipseWidth = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [40, 100]
  );

  const fadeStart = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [40, 100]
  );

  const fadeEnd = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [90, 100]
  );

  const maskImage = useTransform(
    [ellipseWidth, fadeStart, fadeEnd],
    ([width, start, end]) => 
      `radial-gradient(ellipse ${width}% 100% at center, black 0%, black ${start}%, transparent ${end}%, transparent 100%)`
  );

  return (
    <motion.div className="pt-16" style={{ backgroundColor }}>
      <section ref={ref} className="relative">
        {/* ARCO */}
        <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none">
          <motion.div
            className="w-full h-full border-t-[1px]"
            style={{
              transform: 'translateY(-65%)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderRadius: borderRadius,
              borderTopColor: borderColor,
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              backgroundColor: backgroundColor,
            }}
          />
        </div>

        {/* TÍTULO ESTILO SHOPIFY */}
        <div className="absolute -top-[254px] left-0 right-0 z-50">
          <div className="max-w-[1225px] mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Badge */}
              <FadeInText delay={1.2}>
                <AdvancedBadge>{badge}</AdvancedBadge>
              </FadeInText>

              {/* Main Title */}
              <FadeInText delay={0.3}>
                <div className="w-full max-w-[600px] mx-auto">
                  <motion.h1 
                    className="text-[32px] md:text-[38px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-center"
                    style={{ color: textColor }}
                  >
                    {mainTitle}{' '}
                    <motion.span style={{ color: textColor }}>
                      {mainTitleHighlight}
                    </motion.span>
                    <motion.span
                      style={{
                        display: "inline-block",
                        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(237,191,134,0.2) 15%, rgba(237,191,134,0.5) 25%, rgb(237,191,134) 35%, rgb(222,131,99) 50%, rgb(103,188,183) 65%, rgba(103,188,183,0.5) 75%, rgba(103,188,183,0.2) 85%, rgba(255,255,255,0) 100%)",
                        backgroundSize: "300% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                      animate={{
                        backgroundPosition: ["200% 50%", "-100% 50%"]
                      }}
                      transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity
                      }}
                    >
                      .
                    </motion.span>
                  </motion.h1>
                </div>
              </FadeInText>

              {/* Subtitle */}
              <FadeInText delay={0.4}>
                <div className="w-full max-w-[500px]">
                  <motion.p 
                    className="text-base md:text-lg font-medium leading-relaxed tracking-tight text-center"
                    style={{ color: subtitleColor }}
                  >
                    {subtitle}
                  </motion.p>
                </div>
              </FadeInText>

              {/* CTA Button */}
              <FadeInText delay={0.5}>
                <a 
                  href={ctaHref} 
                  onClick={e => e.preventDefault()} 
                  className="relative inline-flex items-center justify-center gap-2.5 px-5 py-[14px] bg-black rounded-xl shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] overflow-hidden group hover:bg-gray-900 transition-colors"
                >
                  <span className="text-base font-medium leading-6 tracking-[-0.5px] text-white z-10">
                    {ctaText}
                  </span>
                  
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center z-10">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>
                </a>
              </FadeInText>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative pt-48 pb-32 px-4">
          <div className="max-w-[1225px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-20">

              {/* COLUMNA IZQUIERDA - AnimatedHikeCard */}
              <div className="relative flex-1 max-w-[495px] flex items-center justify-center">
                <AnimatedHikeCard
                  title={cardTitle}
                  images={cardImages}
                  stats={cardStats}
                  description={cardDescription}
                  href={cardHref}
                />
                
                {/* TaskTimeline superpuesta - fuera del AnimatedHikeCard */}
                <div className="absolute -bottom-8 -right-24 z-10" style={{ transform: 'translate(40px, 30px)' }}>
                  <TaskTimeline />
                </div>
              </div>

              {/* COLUMNA DERECHA - Texto */}
              <div className="flex-1 max-w-[520px]">
                <FadeInText delay={0.5} direction="up">
                  <div className="text-sm font-medium tracking-[2.2px] uppercase mb-2.5 text-gray-500">
                    {subText}
                  </div>
                </FadeInText>

                <FadeInText delay={0.6} direction="up">
                  <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
                    {heading}{' '}
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
                      {highlightText}
                    </motion.span>
                  </h2>
                </FadeInText>

                <FadeInText delay={0.7} direction="up">
                  <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                    {description}
                  </p>
                </FadeInText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export { UseCasesShowcase };
export default UseCasesShowcase;