import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Add a reachable phone number.").max(30),
  service: z.string().min(1, "Choose a service."),
  preferredDate: z.string().min(1, "Select a preferred date."),
  location: z.string().trim().min(2, "Add the shoot or event location.").max(120),
  budget: z.string().trim().max(60),
  message: z.string().trim().min(20, "Tell us a little more about the session.").max(1200),
  consent: z.boolean().refine(Boolean, "Consent is required.")
});

export type ContactFormValues = z.infer<typeof contactSchema>;
