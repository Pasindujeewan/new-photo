export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Album = {
  slug: string;
  title: string;
  category: string;
  year: string;
  date: string;
  location: string;
  description: string;
  story: string;
  photographCount: number;
  cover: ImageAsset;
  images: ImageAsset[];
};

export type Service = {
  slug: string;
  title: string;
  clientType: string;
  description: string;
  features: string[];
  startingPrice: string;
  image: ImageAsset;
};
