import type { ContactFormValues } from "@/lib/validations/contact";

export async function sendContactEmail(payload: ContactFormValues) {
  // Future integration point for Resend, Postmark, SendGrid, or SMTP.
  return { ok: true, reference: `mock-${Date.now()}`, payload };
}
