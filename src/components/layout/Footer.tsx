import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { contactDetails } from "@/data/contact";
import { BrandLogo, brandName } from "@/components/ui/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <BrandLogo className="text-2xl sm:text-3xl" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-bone/70">Editorial wedding, portrait, event, and commercial photography for people and brands who care about atmosphere and detail.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Navigate</h3>
          <div className="mt-4 grid gap-3 text-sm text-bone/70">
            {["Albums", "Services", "About", "Contact"].map((item) => <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-gold">{item}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-bone/70">
            <span className="flex gap-2 break-words"><Phone className="shrink-0" size={16} /> {contactDetails.phone}</span>
            <span className="flex gap-2 break-words"><Mail className="shrink-0" size={16} /> {contactDetails.email}</span>
            <span className="flex gap-2 break-words"><MapPin className="shrink-0" size={16} /> Colombo, Sri Lanka</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Newsletter</h3>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input aria-label="Email for newsletter" placeholder="Email address" className="min-w-0 flex-1 rounded-sm border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-bone/40" />
            <button type="button" className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-white">Join</button>
          </form>
          <div className="mt-5 flex gap-3">
            <Instagram aria-label="Instagram" />
            <Facebook aria-label="Facebook" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-sm text-bone/60 sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} {brandName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
