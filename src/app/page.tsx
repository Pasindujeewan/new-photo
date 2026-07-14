import { Aperture, ArrowRight, Camera, CalendarCheck, CheckCircle2, Images, Quote } from "lucide-react";
import Image from "next/image";
import { AlbumCard } from "@/components/albums/AlbumCard";
import { LinkButton } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { albums } from "@/data/albums";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ceylon Frame Studio",
  description: "Ceylon Frame Studio creates refined wedding, portrait, event, fashion, product, and commercial photography.",
  keywords: ["photography studio", "wedding photography", "commercial photography", "Colombo photographer"]
});

const stats = [
  ["420+", "completed sessions"],
  ["310+", "happy clients"],
  ["9", "years of experience"],
  ["68k+", "edited photographs"]
];

const process = [
  ["01", "Shape the brief", "We map the mood, timings, locations, shot priorities, and delivery needs before anyone steps on set."],
  ["02", "Guide the room", "Direction stays calm and useful, so portraits feel composed while the day still moves naturally."],
  ["03", "Finish with care", "Every gallery is color-managed, backed up, edited for consistency, and delivered with simple download options."]
];

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[86svh] overflow-hidden bg-ink text-white md:min-h-[92vh]">
        <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85" alt="Elegant wedding photography hero scene" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-end gap-8 px-4 pb-10 pt-24 sm:px-5 sm:pt-32 md:min-h-[92vh] md:px-8 lg:grid-cols-[1fr_0.72fr]">
          <Reveal>
            <div className="max-w-3xl pb-6">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.32em]">Colombo editorial photography</p>
              <h1 className="font-serif text-5xl leading-none sm:text-6xl md:text-8xl">
                <BrandLogo textClassName="whitespace-normal" markClassName="hidden" />
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">Cinematic wedding, portrait, event, and commercial photography for stories that deserve a quieter kind of luxury.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/albums" variant="light">View Our Work <ArrowRight size={18} /></LinkButton>
                <LinkButton href="/contact" className="bg-gold hover:bg-[#9c773c]">Book a Session</LinkButton>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-2 border-y border-white/15 py-4 text-center text-[11px] leading-tight text-white/70 sm:mt-10 sm:max-w-xl sm:gap-4 sm:py-5 sm:text-left sm:text-sm">
                <span className="min-w-0 rounded-md bg-white/5 px-2 py-3 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0"><strong className="block font-serif text-2xl leading-none text-white sm:text-2xl">09</strong> years</span>
                <span className="min-w-0 rounded-md bg-white/5 px-2 py-3 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0"><strong className="block font-serif text-2xl leading-none text-white sm:text-2xl">68k</strong> frames delivered</span>
                <span className="min-w-0 rounded-md bg-white/5 px-2 py-3 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0"><strong className="block font-serif text-2xl leading-none text-white sm:text-2xl">LK</strong> island-wide</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="hidden pb-8 lg:block">
              <div className="ml-auto max-w-sm rounded-lg border border-white/20 bg-white/10 p-5 shadow-soft backdrop-blur-xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                  <Image src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=82" alt="Coastal pre-wedding portrait" fill sizes="380px" className="object-cover" />
                </div>
                <div className="mt-5 grid gap-3 text-sm text-white/75">
                  <p className="flex items-center gap-3"><Aperture className="text-gold" size={18} /> Natural light, shaped with intention</p>
                  <p className="flex items-center gap-3"><CalendarCheck className="text-gold" size={18} /> 2026 wedding dates now booking</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-5 sm:py-20 md:px-8">
        <SectionHeader eyebrow="Featured albums" title="Recent stories with atmosphere" text="A curated look at weddings, campaigns, portraits, and gatherings photographed with editorial restraint." />
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 sm:mt-14 md:grid-cols-3 md:gap-8">
          {albums.slice(0, 3).map((album) => <Reveal key={album.slug}><AlbumCard album={album} /></Reveal>)}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1600&q=82" alt="Photographer working in a warm studio" width={1600} height={1100} className="editorial-frame aspect-[5/4] w-full rounded-lg object-cover" />
              <div className="absolute -bottom-6 right-6 hidden rounded-lg bg-bone p-5 shadow-soft ring-1 ring-ink/10 md:block">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Signature look</p>
                <p className="mt-2 font-serif text-3xl">Warm, clean, human.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Studio philosophy</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">A calm process for photographs that still feel alive.</h2>
            <p className="mt-5 text-base leading-7 text-charcoal/75 sm:mt-6 sm:text-lg sm:leading-8">We build each shoot around real people, honest light, and precise editing. The result is polished enough for publication and personal enough to keep.</p>
            <div className="mt-8 grid gap-4">
              {["Direction without stiffness", "Color-managed editing", "Clear planning and delivery timelines"].map((item) => <span key={item} className="flex gap-3 text-sm font-semibold"><CheckCircle2 className="text-gold" /> {item}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-grid px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <SectionHeader eyebrow="Services" title="Photography for personal milestones and brand work" />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <article className="h-full rounded-lg border border-ink/10 bg-white/80 p-6 shadow-[0_16px_50px_rgba(17,16,14,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold"><Camera /></span>
                <h3 className="mt-5 font-serif text-3xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/70">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-gold">Working method</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Thoughtful before the shutter, precise after it.</h2>
          </div>
          <div className="grid gap-4">
            {process.map(([number, title, text]) => (
              <Reveal key={number}>
                <article className="grid gap-5 rounded-lg border border-ink/10 bg-bone/60 p-6 md:grid-cols-[84px_1fr]">
                  <span className="font-serif text-4xl text-gold sm:text-5xl">{number}</span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-charcoal/70">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-white sm:px-5 sm:py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(([value, label]) => <div key={label} className="border-l border-white/10 pl-5"><p className="font-serif text-5xl text-gold sm:text-6xl">{value}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/60 sm:text-sm sm:tracking-[0.18em]">{label}</p></div>)}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <SectionHeader eyebrow="Kind words" title="Clients remember how the room felt" />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {testimonials.map((item) => <blockquote key={item.name} className="rounded-lg bg-white p-6 shadow-[0_18px_60px_rgba(17,16,14,0.08)] ring-1 ring-ink/10 sm:p-8"><Quote className="mb-5 text-gold" /><p className="font-serif text-xl leading-8 sm:text-2xl sm:leading-9"><span aria-hidden>&ldquo;</span>{item.quote}<span aria-hidden>&rdquo;</span></p><footer className="mt-5 text-sm font-semibold text-gold">{item.name} - {item.role}</footer></blockquote>)}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-lg bg-ink p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-gold">Start planning</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Tell us what you are making room to remember.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Share the date, location, and kind of story you want to preserve. We will reply with availability and a clear next step.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <LinkButton href="/contact" variant="light">Contact the Studio</LinkButton>
            <LinkButton href="/albums" className="border border-white/20 bg-transparent hover:border-gold hover:bg-white/10"><Images size={18} /> Browse Albums</LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
