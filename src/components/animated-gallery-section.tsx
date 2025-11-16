import {
  ContainerScroll,
  ContainerSticky,
  GalleryCol,
  GalleryContainer
} from "@/components/ui/animated-gallery"

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
  return (
    <div className="relative -mt-10 bg-transparent">
      <ContainerScroll className="relative h-[300vh] bg-transparent">
        <ContainerSticky className="h-svh bg-transparent">
          <GalleryContainer className="bg-transparent gap-[10px]">
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2 gap-[10px]">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[10px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%] gap-[10px]" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[10px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2 gap-[10px]">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow mb-[10px]"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}