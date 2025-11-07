import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
type WhySubscribeBentoProps = Record<string, never>;

// @component: WhySubscribeBento
export const WhySubscribeBento = (_props: WhySubscribeBentoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.2
  });
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const checkboxInView = useInView(checkboxRef, {
    once: true,
    amount: 0.5
  });
  useEffect(() => {
    if (checkboxInView) {
      const timer = setTimeout(() => {
        setIsCheckboxVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [checkboxInView]);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const messageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // @return
  return <div ref={containerRef} className="w-full min-h-screen bg-gradient-radial from-[#fafafa] to-white flex flex-col items-center justify-center gap-24 px-10 py-32" style={{
    background: 'radial-gradient(50% 35.3%, rgb(250, 250, 250) 0%, rgb(255, 255, 255) 100%)'
  }}>
      {/* Title */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.6
    }} className="max-w-[600px] w-full text-center">
        <h3 className="text-[32px] leading-[35.2px] font-medium text-[#717073] -tracking-[0.2px]">
          <span className="text-[#131314]">Why subscribe? </span>
          By the end you'll have a full working product ready to launch to the world.
        </h3>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-[1200px]">
        {/* Card 1: AI Native */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="relative bg-white rounded-[32px] p-10 flex flex-col justify-end gap-10 h-[475px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col items-center gap-4 z-10">
            <h4 className="text-2xl leading-[28.8px] font-medium text-[#131314] text-center">
              AI Native
            </h4>
            <p className="text-base leading-6 font-medium text-[#717073] text-center">
              AI isn't just a tool — it's a multiplier. We use it to remove friction, accelerate creation, and free you to focus on vision, not code.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-[282px] pointer-events-none">
            <div className="absolute top-[34.6px] left-[80.2px] w-[214px] h-[214px] rounded-full opacity-40" style={{
            background: 'linear-gradient(rgb(174, 48, 211) 0%, rgb(246, 74, 78) 100%)',
            filter: 'blur(64px)'
          }} />
            <motion.div animate={{
            rotate: [0, 2, -2, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }} className="absolute top-[65px] left-[111.2px] w-[152px] h-[152px] bg-white rounded-[32px] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <Sparkles className="w-[52px] h-[52px] text-[#ae30d3]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Card 2: Clear, async collaboration */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="relative bg-gradient-to-b from-[#fafafa] to-white rounded-[32px] p-10 flex flex-col justify-end items-center gap-10 h-[475px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.08)] md:col-span-2">
          <div className="flex flex-col items-center gap-4 z-10">
            <h4 className="text-2xl leading-[28.8px] font-medium text-[#131314] text-center">
              Clear, async collaboration
            </h4>
            <p className="text-base leading-6 font-medium text-[#717073] text-center max-w-[410px]">
              Stay in sync through weekly calls and async updates. No endless meetings, no micromanagement — just progress.
            </p>
          </div>

          {/* Message Cards */}
          <MessageCard delay={0.3} top="13px" left="39px" opacity={0.4} author="You" time="1:22 PM" message="Hey!" profileImage="https://framerusercontent.com/images/Pu4wY54YKH21O3nnTskY5QWyes4.png?width=175&height=175" />
          <MessageCard delay={0.4} top="34px" left="422px" opacity={0.2} author="You" time="1:23 PM" message="How are you?" profileImage="https://framerusercontent.com/images/Pu4wY54YKH21O3nnTskY5QWyes4.png?width=175&height=175" />
          <MessageCard delay={0.5} top="101px" left="-21px" opacity={0.3} author="Creme" time="1:26 PM" message="Hey! what can we do for you today?" profileImage="https://framerusercontent.com/images/7aynxsYtM39HrWSNshpPjJOkQ.svg?width=32&height=32" tall />
          <motion.div style={{
          y: messageY
        }} className="absolute top-[71px] left-[393.4px] z-20">
            <MessageCard delay={0.6} opacity={1} author="You" time="1:32 PM" message="I would like to request a design for a landing page" profileImage="https://framerusercontent.com/images/Pu4wY54YKH21O3nnTskY5QWyes4.png?width=175&height=175" tall floating />
          </motion.div>
          <MessageCard delay={0.7} bottom="214px" left="442px" opacity={1} author="Creme Digital" time="1:33 PM" message="Sure! We will get back to you by the end of tomorrow 😉" profileImage="https://framerusercontent.com/images/7aynxsYtM39HrWSNshpPjJOkQ.svg?width=32&height=32" tall />
        </motion.div>

        {/* Card 3: Design matters */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="relative bg-white rounded-[32px] p-10 flex flex-col justify-end items-center gap-8 h-[475px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.08)] md:col-span-2">
          <div className="relative z-10 w-full flex-1 flex flex-col justify-end items-center">
            <div className="absolute top-[35.2px] left-1/2 -translate-x-1/2 w-[487px] h-[214px] rounded-full opacity-24 z-0" style={{
            background: 'linear-gradient(rgb(174, 48, 211) 0%, rgb(246, 74, 78) 100%)',
            filter: 'blur(64px)'
          }} />
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white to-transparent z-10" />
          </div>

          <div className="flex flex-col items-center gap-4 px-10 pb-10 z-20">
            <h4 className="text-2xl leading-[28.8px] font-medium text-[#131314] text-center">
              Design matters
            </h4>
            <p className="text-base leading-6 font-medium text-[#717073] text-center max-w-[460px]">
              In a world filled with AI clones, user experience matters more than ever. Design is what makes technology feel human — and that's where we obsess.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Operate with freedom */}
        <motion.div ref={checkboxRef} initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="relative bg-white rounded-[32px] p-10 flex flex-col justify-end gap-10 h-[475px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col items-center gap-4 z-10">
            <h4 className="text-2xl leading-[28.8px] font-medium text-[#131314] text-center">
              Operate with freedom
            </h4>
            <p className="text-base leading-6 font-medium text-[#717073] text-center">
              No rigid contracts. Just an open, flexible process that adapts to how you work — not the other way around.
            </p>
          </div>

          {/* Checkbox Card */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8,
          y: 500
        }} animate={isCheckboxVisible ? {
          opacity: 1,
          scale: 1,
          y: 0
        } : {
          opacity: 0,
          scale: 0.8,
          y: 500
        }} transition={{
          duration: 0.6,
          ease: "easeOut"
        }} className="absolute top-0 right-0 w-[309px] h-[310px] bg-[#fafafa] rounded-bl-[20px] shadow-[-0.6px_0.2px_0.6px_-0.4px_rgba(0,0,0,0.02),-1.6px_0.8px_1.8px_-0.6px_rgba(0,0,0,0.02),-3.6px_1.8px_4px_-1px_rgba(0,0,0,0.02),-7.8px_4px_8.8px_-1.4px_rgba(0,0,0,0.02),-20px_10px_22.4px_-1.8px_rgba(0,0,0,0.03)]">
            <div className="absolute bottom-[30px] left-[30px]">
              <h4 className="text-2xl leading-[28.8px] font-medium text-[#131314] mb-5">
                Say no more to
              </h4>
              <CheckItem delay={0.8} text="Long contracts" visible={isCheckboxVisible} />
              <CheckItem delay={1.0} text="Long meetings" visible={isCheckboxVisible} />
              <CheckItem delay={1.2} text="High cost hiring full-time" visible={isCheckboxVisible} />
              <CheckItem delay={1.4} text="Micromanagement" visible={isCheckboxVisible} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>;
};
const MessageCard = ({
  delay,
  top,
  bottom,
  left,
  opacity,
  author,
  time,
  message,
  profileImage,
  tall,
  floating
}: {
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  opacity: number;
  author: string;
  time: string;
  message: string;
  profileImage: string;
  tall?: boolean;
  floating?: boolean;
}) => {
  const height = tall ? 'h-[88.8px]' : 'h-[72px]';
  const contentHeight = tall ? 'h-[64.8px]' : 'h-[48px]';
  const messageHeight = tall ? 'h-[39.2px]' : 'h-[19.6px]';
  const cardContent = <div className={`bg-white rounded-[14px] p-3 flex flex-col justify-center items-center ${height} w-[300px] shadow-[0_0.8px_0.8px_-0.4px_rgba(0,0,0,0.02),0_2.4px_2.4px_-0.8px_rgba(0,0,0,0.02),0_6.4px_6.4px_-1.4px_rgba(0,0,0,0.02),0_20px_20px_-1.8px_rgba(0,0,0,0.03)]`} style={{
    opacity
  }}>
      <div className={`flex gap-4 w-[276px] ${contentHeight}`}>
        <img src={profileImage} alt={author} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 h-[19.6px]">
            <p className="text-sm leading-[19.6px] font-semibold text-[#131314]">
              {author}
            </p>
            <p className="text-[10px] leading-[14px] font-normal text-[#87868a]">
              {time}
            </p>
          </div>
          <p className={`text-sm leading-[19.6px] font-normal text-[#3d3d3d] -tracking-[0.2px] ${messageHeight}`}>
            {message}
          </p>
        </div>
      </div>
    </div>;
  if (floating) {
    return cardContent;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay
  }} className="absolute z-10" style={{
    top,
    bottom,
    left
  }}>
      {cardContent}
    </motion.div>;
};
const CheckItem = ({
  delay,
  text,
  visible
}: {
  delay: number;
  text: string;
  visible: boolean;
}) => {
  // @return
  return <motion.div initial={{
    opacity: 0,
    x: visible ? -800 : 0
  }} animate={visible ? {
    opacity: 1,
    x: 0
  } : {
    opacity: 0,
    x: -800
  }} transition={{
    duration: 0.5,
    delay
  }} className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 bg-[#f52230] rounded-lg flex items-center justify-center flex-shrink-0">
        <X className="w-4 h-5 text-white" strokeWidth={2} />
      </div>
      <p className="text-base leading-6 font-medium text-[#454545]">{text}</p>
    </motion.div>;
};