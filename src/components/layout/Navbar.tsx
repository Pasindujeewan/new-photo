"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/albums", label: "Albums" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHomeTop = pathname === "/" && !scrolled;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition duration-300", isHomeTop ? "text-white" : "border-b border-ink/10 bg-bone/90 text-ink shadow-sm backdrop-blur-xl")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-5 md:px-8" aria-label="Main navigation">
        <Link href="/" className="min-w-0 text-xl sm:text-2xl" aria-label="Ceylon Frame Studio home">
          <BrandLogo compact markClassName={cn("transition", isHomeTop ? "border-white/25 bg-white/10" : "border-ink/10 bg-white/70")} />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={cn("relative text-sm font-semibold transition hover:text-gold", active && "text-gold")}>
                {link.label}
                {active ? <span className="absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 bg-gold" /> : null}
              </Link>
            );
          })}
          <LinkButton href="/contact" variant={isHomeTop ? "light" : "primary"}>Book a Session</LinkButton>
        </div>
        <button className={cn("grid h-10 w-10 place-items-center rounded-full border md:hidden", isHomeTop ? "border-white/25 bg-white/10" : "border-ink/10 bg-white/70")} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-bone text-ink shadow-soft md:hidden"
          >
            <div className="grid gap-2 px-4 pb-6 sm:px-5">
              {links.map((link) => <Link key={link.href} href={link.href} className="border-b border-ink/10 py-3 font-semibold">{link.label}</Link>)}
              <LinkButton href="/contact" className="mt-3">Book a Session</LinkButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
