import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/types";

export function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/albums/${album.slug}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-lg bg-white shadow-[0_18px_60px_rgba(17,16,14,0.08)] ring-1 ring-ink/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_26px_80px_rgba(17,16,14,0.14)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <Image src={album.cover.src} alt={album.cover.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-90" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">{album.category}</span>
          <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-[0.22em] text-white/75">{album.location}</span>
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <h3 className="font-serif text-2xl text-ink">{album.title}</h3>
            <p className="mt-1 text-sm text-charcoal/65">{album.date} - {album.photographCount} photographs</p>
            <p className="mt-3 text-sm leading-6 text-charcoal/75">{album.description}</p>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-gold transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
        </div>
      </article>
    </Link>
  );
}
