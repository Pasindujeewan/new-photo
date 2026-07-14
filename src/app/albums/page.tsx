import { AlbumFilterGrid } from "@/components/albums/AlbumFilterGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllAlbums } from "@/lib/albums";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photography Albums",
  description: "Browse wedding, portrait, event, product, fashion, family, and commercial photography albums by Ceylon Frame Studio.",
  path: "/albums"
});

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const albums = await getAllAlbums();
  return (
    <main className="hairline-grid px-4 pb-16 pt-24 sm:px-5 sm:pb-24 sm:pt-32 md:px-8">
      <SectionHeader eyebrow="Albums" title="Stories, campaigns, and portrait sessions" text="Filter by category and open any album for a larger gallery with lightbox viewing." />
      <div className="mx-auto mt-10 max-w-7xl sm:mt-14"><AlbumFilterGrid albums={albums} /></div>
    </main>
  );
}
