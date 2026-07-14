import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms and Conditions", description: "Basic terms for using the Ceylon Frame Studio website and booking photography services.", path: "/terms" });

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <h1 className="font-serif text-5xl sm:text-6xl">Terms and Conditions</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-charcoal/75 sm:mt-8 sm:space-y-6 sm:text-base">
        <p>This website provides general information about Ceylon Frame Studio services. Final scope, dates, usage rights, deliverables, and payment terms are confirmed in a written agreement.</p>
        <p>Portfolio images, copy, and studio branding may not be reused without permission. Inquiry submission does not reserve a date until the booking process is completed.</p>
        <p>Custom quotes are placeholders until confirmed by the studio in writing.</p>
      </div>
    </main>
  );
}
