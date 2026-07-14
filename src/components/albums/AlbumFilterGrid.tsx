"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AlbumCard } from "@/components/albums/AlbumCard";
import { albumCategories } from "@/data/albums";
import { cn } from "@/lib/utils";
import type { Album } from "@/types";

export function AlbumFilterGrid({ albums }: { albums: Album[] }) {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => (category === "All" ? albums : albums.filter((album) => album.category === category)), [albums, category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {albumCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn("rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition", category === item ? "border-ink bg-ink text-white" : "border-ink/15 bg-white/70 text-ink hover:border-gold hover:bg-white")}
          >
            {item}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((album) => (
              <motion.div key={album.slug} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
                <AlbumCard album={album} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-lg border border-ink/10 bg-white/70 p-10 text-center text-charcoal/70">No albums match this category yet.</div>
      )}
    </div>
  );
}
