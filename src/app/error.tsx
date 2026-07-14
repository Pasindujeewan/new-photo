"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center sm:px-5">
      <div>
        <h1 className="font-serif text-4xl sm:text-6xl">Something slipped out of frame.</h1>
        <p className="mx-auto mt-5 max-w-xl text-charcoal/70">The page could not finish loading. Please try again.</p>
        <Button onClick={reset} className="mt-8"><RotateCcw size={18} /> Try again</Button>
      </div>
    </main>
  );
}
