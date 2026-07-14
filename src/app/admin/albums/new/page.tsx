import { redirect } from "next/navigation";
import { AdminAlbumForm } from "@/components/admin/AdminAlbumForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Add Admin Album",
  description: "Add a new album from the Ceylon Frame Studio admin area.",
  path: "/admin/albums/new"
});

export const dynamic = "force-dynamic";

export default async function NewAdminAlbumPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return (
    <main className="bg-bone">
      <AdminAlbumForm />
    </main>
  );
}
