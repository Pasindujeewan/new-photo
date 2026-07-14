import { redirect } from "next/navigation";
import { AdminAlbumList } from "@/components/admin/AdminAlbumList";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";
import { getAdminAlbums } from "@/lib/services/admin-store";

export const metadata = pageMetadata({
  title: "Admin Albums",
  description: "Manage albums added from the Ceylon Frame Studio admin area.",
  path: "/admin/albums"
});

export const dynamic = "force-dynamic";

export default async function AdminAlbumsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const albums = await getAdminAlbums();
  return (
    <main className="bg-bone">
      <AdminAlbumList albums={albums} />
    </main>
  );
}
