import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin Login",
  description: "Secure login for the Ceylon Frame Studio admin dashboard.",
  path: "/admin/login"
});

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center bg-bone px-4 py-20 sm:px-5 sm:py-32">
      <AdminLoginForm />
    </main>
  );
}
