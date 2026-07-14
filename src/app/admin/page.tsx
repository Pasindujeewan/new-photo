import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminAlbums, getContactMessages } from "@/lib/services/admin-store";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Manage studio inquiries and album drafts.",
  path: "/admin"
});

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [messages, albums] = await Promise.all([getContactMessages(), getAdminAlbums()]);
  return (
    <main className="bg-bone">
      <AdminDashboard initialMessages={messages} initialAlbums={albums} />
    </main>
  );
}
