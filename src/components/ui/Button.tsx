import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-ink text-white shadow-[0_12px_30px_rgba(17,16,14,0.18)] hover:bg-charcoal hover:shadow-[0_18px_40px_rgba(17,16,14,0.22)]",
  light: "bg-white/90 text-ink shadow-[0_12px_30px_rgba(17,16,14,0.14)] hover:bg-white",
  outline: "border border-ink/20 bg-white/30 text-ink backdrop-blur hover:border-gold hover:text-gold"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
  children: ReactNode;
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn("inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition duration-300 sm:w-auto", styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof styles;
  children: ReactNode;
};

export function LinkButton({ className, variant = "primary", children, href, ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition duration-300 sm:w-auto", styles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
