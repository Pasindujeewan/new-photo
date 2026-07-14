export const contactDetails = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+94 77 000 0000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@ceylonframestudio.test",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+94770000000",
  address: "Studio address placeholder, Colombo, Sri Lanka",
  hours: ["Monday - Friday: 9:30 AM - 6:00 PM", "Saturday: By appointment", "Sunday: Closed"],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Pinterest", href: "https://pinterest.com" }
  ]
};
