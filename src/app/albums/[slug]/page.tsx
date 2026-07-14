import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LightboxGallery } from "@/components/gallery/LightboxGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { albums } from "@/data/albums";
import { getAdjacentAlbumsBySlug, getAlbumBySlug } from "@/lib/albums";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

type AlbumParams = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: AlbumParams }): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) return {};
  return {
    title: album.title,
    description: album.description,
    alternates: { canonical: absoluteUrl(`/albums/${album.slug}`) },
    openGraph: { title: album.title, description: album.description, images: [album.cover.src] }
  };
}

export default async function AlbumDetailsPage({ params }: { params: AlbumParams }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) notFound();
  const adjacent = await getAdjacentAlbumsBySlug(album.slug);

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ImageGallery", name: album.title, url: absoluteUrl(`/albums/${album.slug}`), image: album.images.map((image) => image.src) }} />
      <section className="relative min-h-[70svh] bg-ink text-white sm:min-h-[78vh]">
        <Image src={album.cover.src} alt={album.cover.alt} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/20" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl items-end px-4 pb-12 pt-24 sm:min-h-[78vh] sm:px-5 sm:pb-16 sm:pt-32 md:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">{album.category} - {album.date}</p>
            <h1 className="mt-4 font-serif text-5xl leading-none sm:text-6xl md:text-8xl">{album.title}</h1>
            <p className="mt-5 text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">{album.description}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-5 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <aside className="grid gap-4 text-sm text-charcoal/70">
          <p><strong className="text-ink">Location:</strong> {album.location}</p>
          <p><strong className="text-ink">Photographs:</strong> {album.photographCount}</p>
          <p><strong className="text-ink">Year:</strong> {album.year}</p>
        </aside>
        <p className="font-serif text-2xl leading-9 text-ink sm:text-3xl sm:leading-10">{album.story}</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-5 sm:pb-20 md:px-8"><LightboxGallery images={album.images} /></section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-14 sm:px-5 sm:pb-20 md:grid-cols-2 md:px-8">
        <Link href={`/albums/${adjacent.previous.slug}`} className="flex items-center gap-3 rounded-lg border border-ink/10 bg-white p-5 text-sm font-semibold sm:p-6 sm:text-base"><ChevronLeft className="shrink-0" /> Previous: {adjacent.previous.title}</Link>
        <Link href={`/albums/${adjacent.next.slug}`} className="flex items-center justify-start gap-3 rounded-lg border border-ink/10 bg-white p-5 text-left text-sm font-semibold sm:justify-end sm:p-6 sm:text-right sm:text-base">Next: {adjacent.next.title}<ChevronRight className="shrink-0" /></Link>
      </section>
      <section className="bg-white px-4 py-16 text-center sm:px-5 sm:py-20 md:px-8">
        <h2 className="font-serif text-4xl sm:text-5xl">Planning a session with this feeling?</h2>
        <div className="mt-8"><LinkButton href="/contact">Book a Session</LinkButton></div>
      </section>
    </main>
  );
}
