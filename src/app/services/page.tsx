import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photography Services",
  description: "Wedding, event, portrait, fashion, product, and commercial photography services from Ceylon Frame Studio.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <main className="pb-16 pt-24 sm:pb-20 sm:pt-32">
      <section className="px-4 sm:px-5 md:px-8"><SectionHeader eyebrow="Services" title="Measured production, expressive photographs" text="Every service can be shaped around your schedule, usage needs, and preferred level of creative direction." /></section>
      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:px-5 md:px-8 lg:mt-16 lg:gap-10">
        {services.map((service, index) => (
          <article key={service.slug} className="grid items-center gap-8 rounded-lg border border-ink/10 bg-white/70 p-5 shadow-[0_18px_70px_rgba(17,16,14,0.07)] lg:grid-cols-2 lg:p-7">
            <div className={index % 2 ? "lg:order-2" : ""}>
              <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} className="aspect-[4/3] w-full rounded-md object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">{service.clientType}</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{service.title}</h2>
              <p className="mt-4 text-base leading-7 text-charcoal/75 sm:mt-5 sm:text-lg sm:leading-8">{service.description}</p>
              <div className="mt-6 grid gap-3">
                {service.features.map((feature) => <span key={feature} className="flex gap-3 text-sm font-semibold"><Check className="text-gold" size={18} /> {feature}</span>)}
              </div>
              <p className="mt-6 text-sm text-charcoal/65">Starting price: <strong className="text-ink">{service.startingPrice}</strong></p>
              <div className="mt-8"><LinkButton href={`/contact?service=${service.slug}`}>Inquire <ArrowRight size={18} /></LinkButton></div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
