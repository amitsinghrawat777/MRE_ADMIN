"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface PropertyImageCarouselProps {
  images: string[];
  showThumbnails?: boolean;
}

export default function PropertyImageCarousel({ images, showThumbnails = true }: PropertyImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative group h-[400px]">
          <div
            className="h-full relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setOpen(true)}
          >
        <Image
          src={images[currentIndex]}
          alt="Property image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
          priority
        />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-opacity z-10 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Click to view</p>
            </div>
      </div>

      {/* Navigation buttons */}
          {images.length > 1 && (
            <>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="secondary" 
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="secondary" 
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
            </>
          )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-4" 
                  : "bg-white/60 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative aspect-square rounded-md overflow-hidden cursor-pointer ring-2 ring-transparent transition-all",
                  index === currentIndex && "ring-primary"
                )}
              >
                <Image
                  src={image}
                  alt={`Property thumbnail ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        on={{ view: ({ index }) => setCurrentIndex(index) }}
        plugins={[Zoom]}
      />
    </>
  );
}