import type { ContactFormValues } from "@/lib/validations/contact";

export type StoredMessage = ContactFormValues & {
  id: string;
  createdAt: string;
  status: "new" | "read";
};

export type StoredAdminAlbum = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  coverImageUrl: string;
  imageUrls: string[];
  photographCount: number;
  createdAt: string;
};
