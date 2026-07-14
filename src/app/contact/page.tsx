import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactDetails } from "@/data/contact";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact and Book a Session",
  description: "Contact Ceylon Frame Studio to inquire about wedding, portrait, event, product, fashion, and commercial photography.",
  path: "/contact"
});

const faqs = [
  ["How soon should we inquire?", "For weddings and larger campaigns, six to twelve months is ideal. Portrait and product sessions can often be scheduled sooner."],
  ["Do you travel?", "Yes. We photograph across Sri Lanka and can quote travel for destination work."],
  ["When will we receive images?", "Delivery depends on scope. Most portrait and product previews arrive within one week, with full galleries following the agreed timeline."]
];

export default function ContactPage() {
  return (
    <main className="px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contact"), name: "Contact Ceylon Frame Studio" }} />
      <SectionHeader eyebrow="Contact" title="Tell us about the photographs you need" text="Share the practical details and the feeling you want. We will respond with availability, next steps, and a custom quote." />
      <section className="mx-auto mt-12 grid max-w-7xl gap-8 lg:mt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div className="rounded-lg bg-white p-4 shadow-[0_18px_70px_rgba(17,16,14,0.08)] ring-1 ring-ink/10 sm:p-6 md:p-10"><ContactForm /></div>
        <aside className="grid content-start gap-6">
          <div className="rounded-lg bg-ink p-6 text-bone shadow-soft sm:p-8">
            <h2 className="font-serif text-3xl sm:text-4xl">Studio details</h2>
            <div className="mt-6 grid gap-4 text-sm text-bone/80">
              <p className="flex min-w-0 gap-3 break-words"><Phone className="shrink-0 text-gold" /> {contactDetails.phone}</p>
              <p className="flex min-w-0 gap-3 break-words"><Mail className="shrink-0 text-gold" /> {contactDetails.email}</p>
              <p className="flex min-w-0 gap-3 break-words"><MapPin className="shrink-0 text-gold" /> {contactDetails.address}</p>
            </div>
            <a className="mt-6 inline-block text-sm font-semibold text-gold" href={`https://wa.me/${contactDetails.whatsapp.replace(/\D/g, "")}`}>Message on WhatsApp</a>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-8">
            <h2 className="font-serif text-3xl">Business hours</h2>
            <div className="mt-4 grid gap-2 text-sm text-charcoal/70">{contactDetails.hours.map((hour) => <p key={hour}>{hour}</p>)}</div>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-lg bg-mist">
            <Image src="https://images.unsplash.com/photo-1588416499018-d8c6219d1d4d?auto=format&fit=crop&w=1000&q=82" alt="Colombo city street near the studio" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-bone">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Studio base</p>
              <p className="mt-2 font-serif text-3xl">Colombo, Sri Lanka</p>
            </div>
          </div>
        </aside>
      </section>
      <section className="mx-auto mt-12 max-w-4xl sm:mt-16">
        <h2 className="font-serif text-3xl sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-ink/10"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-sm leading-6 text-charcoal/70">{a}</p></details>)}</div>
      </section>
    </main>
  );
}
