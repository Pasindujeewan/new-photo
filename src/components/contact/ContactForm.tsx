"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { services } from "@/data/services";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

export function ContactForm() {
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false }
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        showToast({ tone: "error", message: "We could not send your inquiry. Please check the form and try again." });
        return;
      }

      reset();
      showToast({ tone: "success", message: "Inquiry sent. We will reply with availability and next steps." });
    } catch {
      showToast({ tone: "error", message: "We could not reach the studio inbox. Please try again or email us directly." });
    }
  }

  function onInvalid() {
    showToast({ tone: "error", message: "Please complete the highlighted fields before sending." });
  }

  const field = "mt-2 w-full rounded-md border border-ink/15 bg-bone/40 px-4 py-3 text-sm text-ink shadow-sm transition focus:border-gold focus:bg-white";

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="grid gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold text-charcoal">Full name<input className={field} {...register("name")} />{errors.name ? <span className="text-sm text-red-700">{errors.name.message}</span> : null}</label>
        <label className="text-sm font-semibold text-charcoal">Email<input className={field} type="email" {...register("email")} />{errors.email ? <span className="text-sm text-red-700">{errors.email.message}</span> : null}</label>
        <label className="text-sm font-semibold text-charcoal">Phone<input className={field} {...register("phone")} />{errors.phone ? <span className="text-sm text-red-700">{errors.phone.message}</span> : null}</label>
        <label className="text-sm font-semibold text-charcoal">Photography service<select className={field} {...register("service")}><option value="">Choose a service</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}</select>{errors.service ? <span className="text-sm text-red-700">{errors.service.message}</span> : null}</label>
        <label className="text-sm font-semibold text-charcoal">Preferred date<input className={field} type="date" {...register("preferredDate")} />{errors.preferredDate ? <span className="text-sm text-red-700">{errors.preferredDate.message}</span> : null}</label>
        <label className="text-sm font-semibold text-charcoal">Event location<input className={field} {...register("location")} />{errors.location ? <span className="text-sm text-red-700">{errors.location.message}</span> : null}</label>
      </div>
      <label className="text-sm font-semibold text-charcoal">Estimated budget<input className={field} placeholder="Optional range" {...register("budget")} />{errors.budget ? <span className="text-sm text-red-700">{errors.budget.message}</span> : null}</label>
      <label className="text-sm font-semibold text-charcoal">Message<textarea className={field} rows={6} {...register("message")} />{errors.message ? <span className="text-sm text-red-700">{errors.message.message}</span> : null}</label>
      <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" className="mt-1" {...register("consent")} /> I agree that Ceylon Frame Studio may use my details to respond to this inquiry.</label>
      {errors.consent ? <span className="text-sm text-red-700">{errors.consent.message}</span> : null}
      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        <Send size={18} /> {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
