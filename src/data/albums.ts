import type { Album } from "@/types";

const galleryBase = [
  "photo-1519741497674-611481863552",
  "photo-1520854221256-17451cc331bf",
  "photo-1511285560929-80b456fea0bc",
  "photo-1523438885200-e635ba2c371e",
  "photo-1492684223066-81342ee5ff30",
  "photo-1519225421980-715cb0215aed"
];

function unsplash(id: string, w = 1400, h = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
}

function images(seed: number) {
  return galleryBase.map((id, index) => ({
    src: unsplash(id, index % 2 ? 1200 : 1400, index % 2 ? 1600 : 1000),
    alt: "Editorial photography frame from a Ceylon Frame Studio album",
    width: index % 2 ? 1200 : 1400,
    height: index % 2 ? 1600 : 1000
  })).sort((a, b) => ((seed + a.width) % 7) - ((seed + b.width) % 7));
}

export const albumCategories = [
  "All",
  "Weddings",
  "Pre-shoots",
  "Portraits",
  "Fashion",
  "Events",
  "Family",
  "Product Photography",
  "Commercial Photography"
];

export const albums: Album[] = [
  {
    slug: "amara-julian-garden-wedding",
    title: "Amara & Julian",
    category: "Weddings",
    year: "2025",
    date: "May 2025",
    location: "Galle Face Hotel, Colombo",
    description: "A warm city wedding shaped by candlelight, silk textures, and unguarded family moments.",
    story: "The day moved with an intimate rhythm: quiet portraits before the ceremony, a golden-hour walk through the garden, and a reception filled with handwritten details.",
    photographCount: 184,
    cover: { src: unsplash("photo-1519741497674-611481863552", 1800, 1200), alt: "Bride and groom walking through a garden wedding", width: 1800, height: 1200 },
    images: images(1)
  },
  {
    slug: "mirissa-coastal-preshoot",
    title: "Mirissa Coastline",
    category: "Pre-shoots",
    year: "2025",
    date: "February 2025",
    location: "Mirissa, Sri Lanka",
    description: "A breezy pre-shoot with soft shoreline portraits and relaxed movement.",
    story: "We kept the direction minimal and let the couple move naturally through the changing coastal light.",
    photographCount: 96,
    cover: { src: unsplash("photo-1520854221256-17451cc331bf", 1800, 1200), alt: "Couple portrait near coastal cliffs", width: 1800, height: 1200 },
    images: images(2)
  },
  {
    slug: "naya-editorial-portraits",
    title: "Naya Editorials",
    category: "Portraits",
    year: "2024",
    date: "November 2024",
    location: "Studio One, Colombo",
    description: "Clean portrait work with sculpted light, confident styling, and quiet intensity.",
    story: "The set used simple backdrops and precise light shaping to keep attention on expression and posture.",
    photographCount: 72,
    cover: { src: unsplash("photo-1508214751196-bcfd4ca60f91", 1600, 1200), alt: "Editorial studio portrait of a woman", width: 1600, height: 1200 },
    images: images(3)
  },
  {
    slug: "atelier-noir-fashion-story",
    title: "Atelier Noir",
    category: "Fashion",
    year: "2024",
    date: "October 2024",
    location: "Fort, Colombo",
    description: "A monochrome fashion story built around texture, movement, and architectural lines.",
    story: "We matched strong garments with restrained direction, keeping the frames crisp and editorial.",
    photographCount: 118,
    cover: { src: unsplash("photo-1487412720507-e7ab37603c6f", 1600, 1200), alt: "Fashion portrait in dramatic black styling", width: 1600, height: 1200 },
    images: images(4)
  },
  {
    slug: "halcyon-gala-evening",
    title: "Halcyon Gala",
    category: "Events",
    year: "2025",
    date: "January 2025",
    location: "Nelum Pokuna, Colombo",
    description: "Polished event coverage balancing atmosphere, speakers, guests, and brand moments.",
    story: "The brief called for documentary coverage with a premium finish suitable for press and internal campaigns.",
    photographCount: 246,
    cover: { src: unsplash("photo-1492684223066-81342ee5ff30", 1800, 1200), alt: "Elegant evening event with stage lighting", width: 1800, height: 1200 },
    images: images(5)
  },
  {
    slug: "perera-family-home-session",
    title: "The Perera Home Session",
    category: "Family",
    year: "2024",
    date: "August 2024",
    location: "Nawala",
    description: "Tender family photographs made at home with gentle direction and natural light.",
    story: "We photographed small rituals: breakfast, garden play, and portraits in the parents' favorite room.",
    photographCount: 84,
    cover: { src: unsplash("photo-1511895426328-dc8714191300", 1600, 1200), alt: "Family sitting together in soft home light", width: 1600, height: 1200 },
    images: images(6)
  },
  {
    slug: "citrine-skincare-products",
    title: "Citrine Skincare",
    category: "Product Photography",
    year: "2025",
    date: "March 2025",
    location: "Ceylon Frame Studio",
    description: "Minimal product imagery for a skincare launch across web, social, and retail.",
    story: "The art direction used polished surfaces, warm highlights, and tightly controlled reflections.",
    photographCount: 64,
    cover: { src: unsplash("photo-1556228720-195a672e8a03", 1600, 1200), alt: "Skincare product arrangement in warm studio light", width: 1600, height: 1200 },
    images: images(7)
  },
  {
    slug: "atlas-hotel-commercial",
    title: "Atlas Hotel Campaign",
    category: "Commercial Photography",
    year: "2024",
    date: "June 2024",
    location: "Bentota",
    description: "Hospitality campaign images covering rooms, dining, interiors, and lifestyle moments.",
    story: "We built a two-day shot list around the guest experience, from first light in the suites to dinner service.",
    photographCount: 132,
    cover: { src: unsplash("photo-1566073771259-6a8506099945", 1800, 1200), alt: "Luxury hotel pool and hospitality scene", width: 1800, height: 1200 },
    images: images(8)
  }
];

export function getAlbum(slug: string) {
  return albums.find((album) => album.slug === slug);
}

export function getAdjacentAlbums(slug: string) {
  const index = albums.findIndex((album) => album.slug === slug);
  return {
    previous: albums[(index - 1 + albums.length) % albums.length],
    next: albums[(index + 1) % albums.length]
  };
}
