import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "wedding-photography",
    title: "Wedding Photography",
    clientType: "Couples planning intimate or full-day celebrations",
    description: "Story-led wedding coverage with calm direction, refined portraits, and emotional documentary frames.",
    features: ["Pre-wedding planning call", "Full-day or half-day coverage", "Online edited gallery", "Album design options"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=82", alt: "Wedding couple in elegant ceremony setting", width: 1400, height: 1000 }
  },
  {
    slug: "event-photography",
    title: "Event Photography",
    clientType: "Brands, venues, conferences, and private hosts",
    description: "Professional event imagery that captures the room, the people, and the moments that matter.",
    features: ["Shot-list planning", "Speaker and guest coverage", "Fast preview delivery", "Press-ready selections"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=82", alt: "Professional evening event with lights and guests", width: 1400, height: 1000 }
  },
  {
    slug: "portrait-photography",
    title: "Portrait Photography",
    clientType: "Individuals, founders, artists, and professionals",
    description: "Modern portraits shaped with flattering light, thoughtful styling, and relaxed direction.",
    features: ["Studio or location session", "Wardrobe guidance", "Retouched hero portraits", "LinkedIn and press-ready crops"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=82", alt: "Elegant studio portrait session", width: 1400, height: 1000 }
  },
  {
    slug: "fashion-photography",
    title: "Fashion Photography",
    clientType: "Designers, boutiques, stylists, and model portfolios",
    description: "Editorial fashion sessions with art direction, movement, and detail-focused garment coverage.",
    features: ["Moodboard development", "Look sequencing", "Editorial and e-commerce crops", "Creative direction support"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=82", alt: "Fashion editorial portrait", width: 1400, height: 1000 }
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    clientType: "DTC brands, makers, beauty, food, and retail teams",
    description: "Clean product imagery designed for launches, catalogues, campaigns, and conversion-focused product pages.",
    features: ["Art direction", "White-background sets", "Lifestyle arrangements", "Retouching and color consistency"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=82", alt: "Premium skincare product photography", width: 1400, height: 1000 }
  },
  {
    slug: "commercial-photography",
    title: "Commercial Photography",
    clientType: "Hotels, restaurants, agencies, and growing brands",
    description: "Campaign-ready visuals that translate a brand's atmosphere into polished, useful image libraries.",
    features: ["Creative brief support", "Location scouting", "Usage-aware delivery", "Team and interior coverage"],
    startingPrice: "Custom quote",
    image: { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=82", alt: "Luxury hospitality commercial photography", width: 1400, height: 1000 }
  }
];
