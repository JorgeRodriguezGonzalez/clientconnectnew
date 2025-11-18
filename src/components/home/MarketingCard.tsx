import React from 'react';
import { motion, useInView, animate } from 'framer-motion';

type MarketingCardProps = {
  title?: string;
  bulletPoints?: string[];
};

export const MarketingCard = ({
  title = 'Digital Marketing Excellence',
  bulletPoints = [
    'Data-driven strategies that amplify your brand',
    'Targeted campaigns for your ideal audience',
    'Measurable results across all digital channels',
    'Continuous optimization for maximum ROI'
  ]
}: MarketingCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-row items-center justify-between gap-8 w-[685.2px] h-[310px] rounded-[16px] p-8 overflow-hidden shadow-lg bg-white"
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} 
      transition={{
        duration: 0.5
      }}
    >
      {/* Contenido izquierdo */}
      <div className="flex flex-col items-start justify-center gap-6 flex-1">
        <h2 className="font-semibold text-black text-[22px] leading-[28px] tracking-[-1px] m-0 text-left" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          fontStyle: 'normal'
        }}>
          {title}
        </h2>

        <ul className="flex flex-col gap-3 m-0 p-0 list-none">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-black/40 font-bold">✓</span>
              <p className="font-normal text-black/40 text-[14px] leading-[19.6px] tracking-[-0.4px] m-0" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontStyle: 'normal'
              }}>
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Logos animados derecha */}
      <div className="w-[200px] h-full">
        <AnimatedLogos />
      </div>
    </motion.div>
  );
};

// Componente de logos animados
function AnimatedLogos() {
  const icons = [
    { icon: <MetaIconOutline className="h-6 w-6" />, size: "md" as const },
    { icon: <GoogleAdsLogo className="h-8 w-8" />, size: "lg" as const },
    { icon: <LinkedInLogo className="h-6 w-6" />, size: "md" as const },
    { icon: <InstagramLogo className="h-5 w-5" />, size: "sm" as const },
  ];

  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  
  const sequence = icons.flatMap((_, index) => [
    [
      `.circle-${index + 1}`,
      { scale, transform },
      { duration: 0.8 }
    ]
  ]);

  React.useEffect(() => {
    const controls = animate(sequence as any, {
      repeat: Infinity,
      repeatDelay: 1,
    } as any);

    return () => controls.stop();
  }, []);

  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-4">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`${sizeMap[icon.size]} circle-${index + 1} rounded-full flex items-center justify-center bg-gray-50 shadow-md`}
          >
            {icon.icon}
          </div>
        ))}
      </div>
      
      {/* Línea vertical animada */}
      <div className="h-40 w-px absolute top-1/2 -translate-y-1/2 m-auto z-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-5">
          <Sparkles />
        </div>
      </div>
    </div>
  );
}

// Componente de sparkles
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-blue-400"
        />
      ))}
    </div>
  );
};

// Logos de redes sociales
const MetaIconOutline = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 287.56 191"
      className={className}
      fill="currentColor"
    >
      <path d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z" />
    </svg>
  );
};

const GoogleAdsLogo = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <path fill="#4285f4" d="M24,10c7.732,0,14,6.268,14,14s-6.268,14-14,14s-14-6.268-14-14S16.268,10,24,10z"/>
      <path fill="#fbbc04" d="M24,10l-8,24h16L24,10z"/>
      <path fill="#34a853" d="M10,24l14,14V24H10z"/>
      <path fill="#ea4335" d="M24,24v14l14-14H24z"/>
    </svg>
  );
};

const LinkedInLogo = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"/>
      <path fill="#fff" d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364 c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274 L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479 C18,16.523,16.521,18,14.485,18H18v19H11z"/>
    </svg>
  );
};

const InstagramLogo = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <radialGradient id="igGrad" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fd5"/>
        <stop offset=".328" stopColor="#ff543f"/>
        <stop offset=".348" stopColor="#fc5245"/>
        <stop offset=".504" stopColor="#e64771"/>
        <stop offset=".643" stopColor="#d53e91"/>
        <stop offset=".761" stopColor="#cc39a4"/>
        <stop offset=".841" stopColor="#c837ab"/>
      </radialGradient>
      <path fill="url(#igGrad)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"/>
      <radialGradient id="igGrad2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4168c9"/>
        <stop offset=".999" stopColor="#4168c9" stopOpacity="0"/>
      </radialGradient>
      <path fill="url(#igGrad2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"/>
      <path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"/>
      <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/>
      <path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12 C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"/>
    </svg>
  );
};