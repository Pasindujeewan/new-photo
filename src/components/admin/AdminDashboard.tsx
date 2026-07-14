"use client";

import { Images, LogOut, Mail, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import type { StoredAdminAlbum, StoredMessage } from "@/types/admin";

export function AdminDashboard({
  initialMessages,
  initialAlbums
}: {
  initialMessages: StoredMessage[];
  initialAlbums: StoredAdminAlbum[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [albums, setAlbums] = useState(initialAlbums);

  async function refreshData() {
    try {
      const [messagesResponse, albumsResponse] = await Promise.all([fetch("/api/admin/messages"), fetch("/api/admin/albums")]);

      if (!messagesResponse.ok || !albumsResponse.ok) {
        showToast({ tone: "error", message: "Dashboard could not be refreshed. Please try again." });
        return;
      }

      setMessages((await messagesResponse.json()).messages);
      setAlbums((await albumsResponse.json()).albums);
      showToast({ tone: "success", message: "Dashboard refreshed." });
    } catch {
      showToast({ tone: "error", message: "Dashboard could not be refreshed right now." });
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      showToast({ tone: "success", message: "Signed out." });
    } catch {
      showToast({ tone: "error", message: "We could not sign out cleanly, but you can try again." });
      return;
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-5 sm:pb-20 sm:pt-32 md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">Studio admin</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Dashboard</h1>
          <p className="mt-4 max-w-2xl text-charcoal/70">Manage incoming contact messages and draft new album entries before connecting a real database.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button type="button" variant="outline" onClick={refreshData}><RefreshCw size={18} /> Refresh</Button>
          <Button type="button" onClick={logout}><LogOut size={18} /> Logout</Button>
        </div>
      </div>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-6"><p className="text-sm text-charcoal/60">Messages</p><p className="mt-2 font-serif text-4xl sm:text-5xl">{messages.length}</p></div>
        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-6"><p className="text-sm text-charcoal/60">Admin albums</p><p className="mt-2 font-serif text-4xl sm:text-5xl">{albums.length}</p></div>
        <div className="rounded-lg bg-white p-5 shadow-sm sm:p-6"><p className="text-sm text-charcoal/60">New inquiries</p><p className="mt-2 font-serif text-4xl sm:text-5xl">{messages.filter((message) => message.status === "new").length}</p></div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg bg-ink p-6 text-bone shadow-soft md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="flex items-center gap-3 font-serif text-3xl sm:text-4xl"><Images className="shrink-0 text-gold" /> Albums</h2>
              <p className="mt-3 text-sm leading-6 text-bone/70">Review current admin albums in a dedicated list and add new albums from a focused form page.</p>
            </div>
            <LinkButton href="/admin/albums/new" variant="light"><Plus size={18} /> Add</LinkButton>
          </div>
          <div className="mt-8 grid gap-3">
            <Link href="/admin/albums" className="rounded-lg border border-white/10 bg-white/10 p-5 transition hover:border-gold hover:bg-white/15">
              <p className="text-sm text-bone/60">Current albums</p>
              <p className="mt-2 font-serif text-4xl text-gold sm:text-5xl">{albums.length}</p>
              <p className="mt-2 text-sm font-semibold">Open album management</p>
            </Link>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-[0_18px_70px_rgba(17,16,14,0.08)] ring-1 ring-ink/10 md:p-8">
          <h2 className="flex items-center gap-3 font-serif text-3xl sm:text-4xl"><Mail className="shrink-0 text-gold" /> Messages</h2>
          <div className="mt-6 grid max-h-[620px] gap-4 overflow-auto pr-2">
            {messages.length ? messages.map((message) => (
              <article key={message.id} className="rounded-lg border border-ink/10 bg-bone/45 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold">{message.name}</h3>
                    <p className="break-words text-sm text-charcoal/60">{message.email} | {message.phone}</p>
                  </div>
                  <span className="text-xs text-charcoal/50">{new Date(message.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-gold">{message.service} - {message.preferredDate}</p>
                <p className="mt-2 text-sm text-charcoal/70">{message.location} | Budget: {message.budget || "Not provided"}</p>
                <p className="mt-3 text-sm leading-6 text-charcoal/80">{message.message}</p>
              </article>
            )) : <p className="text-sm text-charcoal/60">No contact messages yet.</p>}
          </div>
        </section>
      </section>
    </div>
  );
}
