import {
    ContainerScroll,
    ContainerSticky,
    GalleryCol,
    GalleryContainer
  } from "@/components/ui/animated-gallery"
  
  const IMAGES_1 = [
    "/lovable-uploads/5582f858-af9c-47da-8522-4916485aba3d.png",
    "/lovable-uploads/99b7543a-d759-4c7d-99bb-31eaea2d11d7.png",
    "/lovable-uploads/d0915efc-ea6b-4ec2-94fe-e15a16392d1c.png",
    "/lovable-uploads/41a9e9a3-4a7a-4ab9-9d0b-e0f775d0190a.png",
  ]
  const IMAGES_2 = [
    "/lovable-uploads/a524300c-6025-4637-8d0d-a8f01d43aa71.png",
    "/lovable-uploads/bf578457-09f8-4047-abd0-4a57a933f2c7.png",
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