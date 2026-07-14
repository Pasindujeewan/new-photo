import { z } from "zod";

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Enter the admin password.")
});

export const adminAlbumSchema = z.object({
  title: z.string().trim().min(2, "Album title is required.").max(100),
  category: z.string().trim().min(2, "Category is required.").max(80),
  date: z.string().trim().min(2, "Date or year is required.").max(40),
  location: z.string().trim().min(2, "Location is required.").max(120),
  description: z.string().trim().min(20, "Write a short album description.").max(500),
  coverImageUrl: z
    .string()
    .trim()
    .url("Use a valid image URL.")
    .refine((value) => {
      const host = new URL(value).hostname;
      return host === "images.unsplash.com" || host === "images.pexels.com" || host === "res.cloudinary.com";
    }, "Use an image URL from images.unsplash.com, images.pexels.com, or Cloudinary."),
  imageUrls: z
    .array(
      z.string().trim().url().refine((value) => {
        const host = new URL(value).hostname;
        return host === "images.unsplash.com" || host === "images.pexels.com" || host === "res.cloudinary.com";
      }, "Gallery images must be from Unsplash, Pexels, or Cloudinary.")
    )
    .default([]),
  photographCount: z.coerce.number().int().min(1).max(5000)
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
export type AdminAlbumValues = z.infer<typeof adminAlbumSchema>;
