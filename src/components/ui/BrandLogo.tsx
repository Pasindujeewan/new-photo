import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  compact?: boolean;
  markClassName?: string;
  textClassName?: string;
} & SVGProps<SVGSVGElement>;

export const brandName = "Ceylon Frame Studio";
export const shortBrandName = "Ceylon Frame";

export function BrandMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className} {...props}>
      <rect x="8" y="8" width="48" height="48" rx="18" className="fill-current opacity-10" />
      <path d="M20 32c0-7.18 5.82-13 13-13 4.47 0 8.42 2.25 10.76 5.68" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M44 32c0 7.18-5.82 13-13 13-4.47 0-8.42-2.25-10.76-5.68" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
      <circle cx="32" cy="32" r="6.5" className="fill-current" />
      <path d="M45.5 18.5h-6M45.5 18.5v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({ compact = false, className, markClassName, textClassName, ...props }: BrandLogoProps) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/15 bg-current/5", markClassName)}>
        <BrandMark className="h-7 w-7 text-gold" {...props} />
      </span>
      <span className={cn("truncate font-serif leading-none", textClassName)}>
        {compact ? shortBrandName : brandName}
      </span>
    </span>
  );
}
