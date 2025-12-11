import {
  ContainerScroll,
  ContainerSticky,
  GalleryCol,
  GalleryContainer
} from "@/components/ui/animated-gallery"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar } from 'lucide-react'
import { useRef } from "react"

const IMAGES_1 = [
  "/images/1.png",
  "/images/7.jpg",
  "/images/12.jpg",
  "/images/4.png",
]
const IMAGES_2 = [
  "/images/6.jpg",
  "/images/5.jpg",
  "/images/2.png",
  "/images/8.jpg",
]
const IMAGES_3 = [
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/3.png",
]

export const AnimatedGallerySection = () => {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Overlay aparece cuando la rotación termina (entre 0.3 y 0.5 de scrollYProgress)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [0, 0, 1, 1]
  )

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.6],
    [0, 0, 1]
  )

  const contentY = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    [50, 0]
  )

  return (
    <div ref={ref} className="relative -mt-32 bg-transparent">
      <ContainerScroll className="relative h-[300vh] bg-transparent">
        <ContainerSticky className="h-svh bg-transparent">
          <GalleryContainer className="bg-transparent gap-[30px]">
            <GalleryCol yRange={["-5%", "2%"]} className="-mt-2 gap-[10px]">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[20px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%] gap-[10px]" yRange={["10%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[20px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-5%", "2%"]} className="-mt-2 gap-[10px]">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[20px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>

          {/* Overlay con glassmorphism */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md z-10 pointer-events-none"
          />

          {/* Contenido sobre el overlay */}
          <motion.div
            style={{ 
              opacity: contentOpacity,
              y: contentY
            }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 pointer-events-none"
          >
            {/* Título */}
            <h2
              className="text-3xl md:text-[50px] font-light leading-tight md:leading-[60px] text-center text-white px-8"
              style={{ fontFamily: '"Satoshi", sans-serif', letterSpacing: '-1.5px' }}
            >
              We have been doing this for +12 years
            </h2>

            {/* CTA Button */}
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-1.5 h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-cyan-300/80 rounded-[50px] px-5 py-3 transition-[background-color,box-shadow] duration-[500ms] cursor-pointer hover:shadow-[0_0_20px_rgba(103,232,249,0.5)] pointer-events-auto"
            >
              <div className="w-[18px] h-[14px] relative overflow-hidden">
                <Calendar className="w-[17px] h-[14px] text-cyan-300" />
              </div>
              <p 
                className="text-[14px] font-medium leading-5 text-cyan-300 whitespace-nowrap" 
                style={{ fontFamily: '"Satoshi", sans-serif', letterSpacing: '0.2px' }}
              >
                Book Free Consultation
              </p>
            </a>
          </motion.div>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}