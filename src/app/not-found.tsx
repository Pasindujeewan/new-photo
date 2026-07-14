import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center sm:px-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">404</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl">This frame is not in the gallery.</h1>
        <p className="mx-auto mt-5 max-w-xl text-charcoal/70">The page may have moved, or the album link may be incomplete.</p>
        <div className="mt-8"><LinkButton href="/albums">Browse Albums</LinkButton></div>
      </div>
    </main>
  );
}
