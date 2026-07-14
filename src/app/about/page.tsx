import { Award, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { team } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Studio",
  description: "Meet Ceylon Frame Studio and learn about our creative philosophy, process, team, and approach to photography.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="pb-16 pt-24 sm:pb-20 sm:pt-32">
      <section className="px-4 sm:px-5 md:px-8"><SectionHeader eyebrow="About" title="A studio built around attention" text="We photograph with a small team, careful preparation, and enough calm on set for honest moments to appear." /></section>
      <section className="mx-auto mt-12 grid max-w-7xl items-center gap-8 px-4 sm:px-5 md:px-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
        <Image src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1600&q=82" alt="Behind the scenes in a photography studio" width={1600} height={1100} className="editorial-frame aspect-[5/4] w-full rounded-lg object-cover" />
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl">Our story</h2>
          <p className="mt-4 text-base leading-7 text-charcoal/75 sm:mt-5 sm:text-lg sm:leading-8">Ceylon Frame Studio began as a portrait practice and grew into a full-service studio for weddings, editorial work, events, and commercial campaigns. Our work is polished, but the process is human: clear communication, thoughtful direction, and careful post-production.</p>
          <div className="mt-8 grid gap-4">
            <span className="flex gap-3 rounded-lg bg-white/70 p-4 text-sm leading-6 shadow-sm ring-1 ring-ink/10 sm:text-base"><Sparkles className="shrink-0 text-gold" /> Mission: make refined photographs that still feel personal.</span>
            <span className="flex gap-3 rounded-lg bg-white/70 p-4 text-sm leading-6 shadow-sm ring-1 ring-ink/10 sm:text-base"><Award className="shrink-0 text-gold" /> Approach: natural rhythm, controlled light, editorial finishing.</span>
            <span className="flex gap-3 rounded-lg bg-white/70 p-4 text-sm leading-6 shadow-sm ring-1 ring-ink/10 sm:text-base"><MapPin className="shrink-0 text-gold" /> Location: Colombo studio with island-wide travel.</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-8">
        <h2 className="font-serif text-4xl sm:text-5xl">Team</h2>
        <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="rounded-lg bg-white p-5 shadow-[0_18px_60px_rgba(17,16,14,0.08)] ring-1 ring-ink/10">
              <Image src={member.image} alt={`${member.name}, ${member.role}`} width={900} height={1100} className="aspect-[4/5] w-full rounded-md object-cover" />
              <h3 className="mt-5 font-serif text-3xl">{member.name}</h3>
              <p className="text-sm font-semibold text-gold">{member.role}</p>
              <p className="mt-3 text-sm leading-6 text-charcoal/70">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white px-4 py-16 sm:px-5 sm:py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {["Color-managed editing", "Redundant file backups", "A clear planning workflow"].map((item) => <div key={item} className="border-l-2 border-gold pl-5"><h3 className="font-serif text-2xl sm:text-3xl">{item}</h3><p className="mt-3 text-sm leading-6 text-charcoal/70">A professional working method keeps the final gallery consistent, secure, and useful.</p></div>)}
        </div>
        <div className="mt-12 text-center"><LinkButton href="/contact">Work With Us</LinkButton></div>
      </section>
    </main>
  );
}
