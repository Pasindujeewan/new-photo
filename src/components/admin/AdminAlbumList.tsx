import { ImagePlus, Plus } from "lucide-react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import type { StoredAdminAlbum } from "@/types/admin";

export function AdminAlbumList({ albums }: { albums: StoredAdminAlbum[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">Album management</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Current Albums</h1>
          <p className="mt-4 max-w-2xl text-charcoal/70">Review albums added from the admin area. New albums are created on a separate page so this list stays easy to scan.</p>
        </div>
        <LinkButton href="/admin/albums/new"><Plus size={18} /> Add Album</LinkButton>
      </div>

      {albums.length ? (
        <section className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {albums.map((album) => (
            <article key={album.id} className="overflow-hidden rounded-lg bg-white shadow-[0_18px_70px_rgba(17,16,14,0.08)] ring-1 ring-ink/10">
              <div className="relative aspect-[4/3] bg-mist">
                <Image src={album.coverImageUrl} alt={`${album.title} cover`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">{album.category}</span>
              </div>
              <div className="p-5">
                <h2 className="font-serif text-2xl sm:text-3xl">{album.title}</h2>
                <p className="mt-1 text-sm text-charcoal/60">{album.date} - {album.photographCount} photographs</p>
                <p className="mt-1 text-sm font-semibold text-gold">{album.location}</p>
                <p className="mt-3 text-sm leading-6 text-charcoal/72">{album.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-charcoal/45">Added {new Date(album.createdAt).toLocaleDateString()}</p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-10 grid min-h-72 place-items-center rounded-lg border border-dashed border-ink/20 bg-white/70 p-6 text-center sm:mt-12 sm:min-h-80 sm:p-10">
          <div>
            <ImagePlus className="mx-auto text-gold" size={42} />
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">No admin albums yet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-charcoal/70">Create the first album from the form page, then it will appear here as a visual card.</p>
            <div className="mt-6"><LinkButton href="/admin/albums/new"><Plus size={18} /> Add Album</LinkButton></div>
          </div>
        </section>
      )}
    </div>
  );
}
