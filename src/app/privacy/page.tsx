import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How Ceylon Frame Studio handles contact form information and analytics data.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <h1 className="font-serif text-5xl sm:text-6xl">Privacy Policy</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-charcoal/75 sm:mt-8 sm:space-y-6 sm:text-base">
        <p>We collect information you submit through the contact form so we can respond to your inquiry, plan a session, and provide client service.</p>
        <p>Analytics may be used to understand site performance and popular content. Analytics identifiers should not contain private credentials.</p>
        <p>We do not sell inquiry details. Future email, database, storage, and analytics services should be configured with least-privilege access and private server-side environment variables.</p>
      </div>
    </main>
  );
}
