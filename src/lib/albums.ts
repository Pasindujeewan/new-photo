import { albums as baseAlbums } from "@/data/albums";
import { getAdminAlbums } from "@/lib/services/admin-store";
import type { Album } from "@/types";
import type { StoredAdminAlbum } from "@/types/admin";

function adminAlbumToAlbum(album: StoredAdminAlbum): Album {
  const imageUrls = album.imageUrls?.length ? album.imageUrls : [album.coverImageUrl];
  return {
    slug: album.slug,
    title: album.title,
    category: album.category,
    year: new Date(album.createdAt).getFullYear().toString(),
    date: album.date,
    location: album.location,
    description: album.description,
    story: album.description,
    photographCount: album.photographCount,
    cover: {
      src: album.coverImageUrl,
      alt: `${album.title} album cover`,
      width: 1600,
      height: 1200
    },
    images: imageUrls.map((src, index) => ({
      src,
      alt: `${album.title} gallery image ${index + 1}`,
      width: 1600,
      height: 1200
    }))
  };
}

export async function getAllAlbums() {
  const adminAlbums = await getAdminAlbums();
  return [...adminAlbums.map(adminAlbumToAlbum), ...baseAlbums];
}

export async function getAlbumBySlug(slug: string) {
  const allAlbums = await getAllAlbums();
  return allAlbums.find((album) => album.slug === slug);
}

export async function getAdjacentAlbumsBySlug(slug: string) {
  const allAlbums = await getAllAlbums();
  const index = allAlbums.findIndex((album) => album.slug === slug);
  if (index < 0) return { previous: allAlbums[0], next: allAlbums[0] };
  return {
    previous: allAlbums[(index - 1 + allAlbums.length) % allAlbums.length],
    next: allAlbums[(index + 1) % allAlbums.length]
  };
}
