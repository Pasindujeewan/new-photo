"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ImageAsset } from "@/types";

export function LightboxGallery({ images }: { images: ImageAsset[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const previous = useCallback(() => setActive((value) => (value === null ? value : (value - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setActive((value) => (value === null ? value : (value + 1) % images.length)), [images.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, next, previous]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button key={`${image.src}-${index}`} type="button" onClick={() => setActive(index)} className="mb-5 block w-full overflow-hidden bg-mist text-left">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full object-cover transition duration-700 hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null ? (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image lightbox">
            <button type="button" onClick={close} aria-label="Close lightbox" className="absolute right-4 top-4 rounded-full bg-white/10 p-3"><X /></button>
            <button type="button" onClick={previous} aria-label="Previous image" className="absolute left-4 top-1/2 rounded-full bg-white/10 p-3"><ChevronLeft /></button>
            <button type="button" onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 rounded-full bg-white/10 p-3"><ChevronRight /></button>
            <div className="relative h-[82vh] w-[88vw] max-w-6xl">
              <Image src={images[active].src} alt={images[active].alt} fill sizes="90vw" className="object-contain" priority />
            </div>
            <p className="absolute bottom-5 text-sm text-white/70">{active + 1} / {images.length}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
