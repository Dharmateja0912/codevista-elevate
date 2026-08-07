import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, Clock, MonitorPlay, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageTransition, Reveal } from "@/components/motion";
import { batches, type Batch, type BatchMode } from "@/data/institute";
import {
  readStore,
  writeStore,
  logActivity,
  STORAGE_KEYS,
  type Reservation,
} from "@/lib/storage";

export const Route = createFileRoute("/batches")({
  head: () => ({
    meta: [
      { title: "Upcoming Batches — CodeVista Academy" },
      {
        name: "description",
        content:
          "See upcoming online, offline and hybrid batches at CodeVista Academy and reserve your seat in seconds.",
      },
      { property: "og:title", content: "Upcoming Batches — CodeVista Academy" },
      {
        property: "og:description",
        content: "Filter batches by mode, check available seats and reserve instantly.",
      },
    ],
  }),
  component: BatchesPage,
});

const filters: ("All" | BatchMode)[] = ["All", "Online", "Offline", "Hybrid"];

function BatchesPage() {
  const [mode, setMode] = useState<"All" | BatchMode>("All");
  const [seats, setSeats] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Batch | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setSeats(readStore<Record<string, number>>(STORAGE_KEYS.seats, {}));
  }, []);

  const seatsFor = (b: Batch) => seats[b.id] ?? b.seats;
  const visible = batches.filter((b) => mode === "All" || b.mode === mode);

  const confirm = () => {
    if (!active) return;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in your name, email and phone number.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const remaining = Math.max(0, seatsFor(active) - 1);
    const nextSeats = { ...seats, [active.id]: remaining };
    setSeats(nextSeats);
    writeStore(STORAGE_KEYS.seats, nextSeats);

    const reservation: Reservation = {
      id: `${active.id}-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      course: active.course,
      batchId: active.id,
      createdAt: new Date().toISOString(),
    };
    writeStore(STORAGE_KEYS.reservations, [
      reservation,
      ...readStore<Reservation[]>(STORAGE_KEYS.reservations, []),
    ]);
    logActivity(`Reserved a seat in ${active.course} (${active.id}).`);

    toast.success("Your seat has been reserved successfully.");
    setActive(null);
    setForm({ name: "", email: "", phone: "" });
    setError("");
  };

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Upcoming <span className="text-gradient">Batches</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            New batches start every week across online, offline and hybrid formats.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={mode === f ? "default" : "outline"}
              onClick={() => setMode(f)}
              className={`rounded-full ${mode === f ? "bg-brand text-primary-foreground" : ""}`}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((b, i) => {
            const remaining = seatsFor(b);
            return (
              <Reveal key={b.id} delay={(i % 3) * 0.06}>
                <article className="glass flex h-full flex-col rounded-3xl p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold">{b.course}</h2>
                    <Badge variant="secondary" className="shrink-0 rounded-full">{b.mode}</Badge>
                  </div>
                  <dl className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2.5">
                      <CalendarDays className="size-4 text-primary" /> Starts {b.startDate}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="size-4 text-primary" /> {b.time} · {b.duration}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <User className="size-4 text-primary" /> {b.trainer}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MonitorPlay className="size-4 text-primary" /> Batch {b.id}
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center gap-2 text-sm">
                    <Users className="size-4 text-primary" />
                    <span className={remaining === 0 ? "text-destructive" : ""}>
                      {remaining} seat{remaining === 1 ? "" : "s"} available
                    </span>
                  </div>

                  <Button
                    className="bg-brand mt-5 w-full rounded-full text-primary-foreground disabled:opacity-50"
                    disabled={remaining === 0}
                    onClick={() => {
                      setActive(b);
                      setError("");
                    }}
                  >
                    {remaining === 0 ? "Batch Full" : "Reserve Seat"}
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reserve your seat</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="r-name">Name</Label>
                <Input id="r-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-email">Email</Label>
                <Input id="r-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-phone">Phone</Label>
                <Input id="r-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 90000 00000" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Selected course</Label>
                  <Input value={active.course} readOnly className="bg-secondary/60" />
                </div>
                <div className="space-y-1.5">
                  <Label>Selected batch</Label>
                  <Input value={`${active.id} · ${active.startDate}`} readOnly className="bg-secondary/60" />
                </div>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button className="bg-brand w-full rounded-full text-primary-foreground" onClick={confirm}>
                Confirm Reservation
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}