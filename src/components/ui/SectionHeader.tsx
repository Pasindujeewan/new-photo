import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  text,
  className
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl md:text-6xl">{title}</h2>
      {text ? <p className="mt-4 text-sm leading-7 text-charcoal/75 sm:text-base md:mt-5 md:text-lg md:leading-8">{text}</p> : null}
    </div>
  );
}
