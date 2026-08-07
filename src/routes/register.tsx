import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageTransition, Reveal } from "@/components/motion";
import { courses } from "@/data/courses";
import { batches } from "@/data/institute";
import { readStore, writeStore, logActivity, STORAGE_KEYS, type Registration } from "@/lib/storage";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Join CodeVista Academy — Course Registration" },
      {
        name: "description",
        content:
          "Register for a CodeVista Academy course: pick your programme, preferred mode and batch, and we'll get in touch.",
      },
      { property: "og:title", content: "Join CodeVista Academy" },
      { property: "og:description", content: "Submit your course registration in under a minute." },
    ],
  }),
  component: RegisterPage,
});

const empty = {
  fullName: "",
  email: "",
  phone: "",
  education: "",
  course: "",
  mode: "Online",
  batch: "",
  experience: "Beginner",
  message: "",
};

const fieldClass =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function RegisterPage() {
  const [form, setForm] = useState({ ...empty });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (!form.education.trim()) next.education = "Education is required.";
    if (!form.course) next.course = "Please choose a course.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const record: Registration = { id: `REG-${Date.now()}`, ...form, createdAt: new Date().toISOString() };
    writeStore(STORAGE_KEYS.registrations, [
      record,
      ...readStore<Registration[]>(STORAGE_KEYS.registrations, []),
    ]);
    logActivity(`Submitted registration for ${form.course}.`);
    toast.success("Registration submitted successfully!");
    setDone(true);
    setForm({ ...empty });
  };

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Join <span className="text-gradient">CodeVista Academy</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tell us what you want to learn and our team will confirm your seat and schedule.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {done && (
          <Reveal className="mb-6">
            <div className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-5 text-sm">
              <CheckCircle2 className="size-5 text-primary" />
              Registration submitted successfully! We'll contact you shortly.
            </div>
          </Reveal>
        )}
        <Reveal>
          <form onSubmit={submit} className="glass space-y-5 rounded-3xl p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your full name" />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 90000 00000" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="education">Education</Label>
                <Input id="education" value={form.education} onChange={(e) => set("education", e.target.value)} placeholder="B.Sc Computer Science" />
                {errors.education && <p className="text-xs text-destructive">{errors.education}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="course">Course</Label>
                <select id="course" className={fieldClass} value={form.course} onChange={(e) => set("course", e.target.value)}>
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.title}>{c.title}</option>
                  ))}
                </select>
                {errors.course && <p className="text-xs text-destructive">{errors.course}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mode">Preferred Mode</Label>
                <select id="mode" className={fieldClass} value={form.mode} onChange={(e) => set("mode", e.target.value)}>
                  {["Online", "Offline", "Hybrid"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="batch">Preferred Batch</Label>
                <select id="batch" className={fieldClass} value={form.batch} onChange={(e) => set("batch", e.target.value)}>
                  <option value="">No preference</option>
                  {batches.map((b) => (
                    <option key={b.id} value={`${b.id} — ${b.course} (${b.startDate})`}>
                      {b.course} — {b.startDate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="experience">Experience Level</Label>
                <select id="experience" className={fieldClass} value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                  {["Beginner", "Intermediate", "Advanced"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Anything you'd like us to know?" />
            </div>

            <Button type="submit" size="lg" className="bg-brand w-full rounded-full text-primary-foreground shadow-glow">
              Submit Registration
            </Button>
          </form>
        </Reveal>
      </section>
    </PageTransition>
  );
}