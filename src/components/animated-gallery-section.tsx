import {
    ContainerScroll,
    ContainerSticky,
    GalleryCol,
    GalleryContainer
  } from "@/components/ui/animated-gallery"
  
  const IMAGES_1 = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
  ]
  const IMAGES_2 = [
    "/images/5.png",
    "/images/6.png",
    "/lovable-uploads/bd7a31ea-72e3-4ba4-9f93-00ba3f6bc43e.png",
    "/lovable-uploads/8f2bb631-9f79-45d4-bfd5-65d57179aa91.png",
  ]
  const IMAGES_3 = [
    "/lovable-uploads/9f96d878-2f42-4f3f-9c8c-54b90b54a4e7.png",
    "/lovable-uploads/e3118069-484b-4605-a1e1-2da88f4e4230.png",
    "/lovable-uploads/ae4e2c3b-76b3-4743-a685-daa06511529e.png",
    "/lovable-uploads/98d69262-4c1c-46b7-b307-b0569c06b499.png",
  ]
  
  export const AnimatedGallerySection = () => {
    return (
      <div className="relative -mt-10 bg-transparent">
        <ContainerScroll className="relative h-[300vh] bg-transparent">
          <ContainerSticky className="h-svh bg-transparent">
            <GalleryContainer className="bg-transparent">
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {IMAGES_1.map((imageUrl, index) => (
                  <img
                    key={index}
                    className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                    src={imageUrl}
                    alt="gallery item"
                  />
                ))}
              </GalleryCol>
              <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
                {IMAGES_2.map((imageUrl, index) => (
                  <img
                    key={index}
                    className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                    src={imageUrl}
                    alt="gallery item"
                  />
                ))}
              </GalleryCol>
              <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
                {IMAGES_3.map((imageUrl, index) => (
                  <img
                    key={index}
                    className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
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