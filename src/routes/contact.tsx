import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageTransition, Reveal } from "@/components/motion";
import { contactInfo, faqs } from "@/data/institute";
import { courses } from "@/data/courses";
import { readStore, writeStore, logActivity, STORAGE_KEYS } from "@/lib/storage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CodeVista Academy" },
      {
        name: "description",
        content:
          "Call, email or visit CodeVista Academy in Bengaluru, or send an enquiry about any course, batch or certification.",
      },
      { property: "og:title", content: "Get In Touch — CodeVista Academy" },
      { property: "og:description", content: "Course enquiries, batch details and campus information." },
    ],
  }),
  component: ContactPage,
});

const empty = { name: "", email: "", phone: "", subject: "", course: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState({ ...empty });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({});

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof typeof empty, string>> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;

    writeStore(STORAGE_KEYS.enquiries, [
      { ...form, id: `ENQ-${Date.now()}`, createdAt: new Date().toISOString() },
      ...readStore<unknown[]>(STORAGE_KEYS.enquiries, []),
    ]);
    logActivity("Submitted a course enquiry.");
    toast.success("Your enquiry has been submitted successfully.");
    setForm({ ...empty });
  };

  const details = [
    { icon: MapPin, label: "Address", value: contactInfo.address },
    { icon: Phone, label: "Phone", value: contactInfo.phone },
    { icon: Mail, label: "Email", value: contactInfo.email },
    { icon: Clock, label: "Working Hours", value: contactInfo.hours },
  ];

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Questions about a course, batch or certificate? We usually reply within one working day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-4">
          {details.map((d) => (
            <div key={d.label} className="glass flex gap-4 rounded-2xl p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary">
                <d.icon className="size-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{d.label}</p>
                <p className="text-sm font-medium">{d.value}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass space-y-5 rounded-3xl p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-phone">Phone</Label>
                <Input id="c-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 90000 00000" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-subject">Subject</Label>
                <Input id="c-subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="Course enquiry" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="c-course">Course Interested In</Label>
                <select
                  id="c-course"
                  value={form.course}
                  onChange={(e) => set("course", e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="bg-brand w-full rounded-full text-primary-foreground shadow-glow">
              Send Enquiry
            </Button>
          </form>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="glass mt-6 rounded-3xl px-5">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </PageTransition>
  );
}