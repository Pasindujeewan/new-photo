"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

export function AdminLoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        showToast({ tone: "error", message: "That password did not work. Please try again." });
        return;
      }

      showToast({ tone: "success", message: "Welcome back." });
      router.push("/admin");
      router.refresh();
    } catch {
      showToast({ tone: "error", message: "We could not check the password right now. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto grid w-full max-w-md gap-5 rounded-lg bg-white p-5 shadow-sm sm:p-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.28em]">Admin access</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Studio Login</h1>
      </div>
      <label className="grid gap-2 text-sm font-semibold">
        Password
        <input
          className="rounded-sm border border-ink/15 px-4 py-3 text-sm"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </label>
      <Button type="submit" disabled={loading}>
        <LockKeyhole size={18} /> {loading ? "Checking..." : "Login"}
      </Button>
    </form>
  );
}
