import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageTransition, Reveal } from "@/components/motion";
import { trainers, type Trainer } from "@/data/institute";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Our Trainers — CodeVista Academy" },
      {
        name: "description",
        content:
          "Meet the industry-focused trainers behind CodeVista Academy's programming, data, AI, cloud and security programmes.",
      },
      { property: "og:title", content: "Learn From Industry-Focused Trainers" },
      {
        property: "og:description",
        content: "Experienced technology professionals mentoring every CodeVista batch.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const [active, setActive] = useState<Trainer | null>(null);

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Learn From <span className="text-gradient">Industry-Focused</span> Trainers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every programme is led by a practitioner who has shipped the work they teach.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.07}>
              <article className="glass group h-full rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${t.accent} font-display text-xl font-bold text-white`}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">{t.name}</h2>
                    <p className="truncate text-sm text-muted-foreground">{t.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.experience}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 fill-current text-primary" /> {t.rating}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Users className="size-4" /> {t.students.toLocaleString()}+ students
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.skills.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  className="mt-5 w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={() => setActive(t)}
                >
                  View Profile
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{active.name}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                {active.role} · {active.experience}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold">{active.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="rounded-2xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold">{active.students.toLocaleString()}+</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="rounded-2xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold">{active.courses.length}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
              </div>

              <section>
                <h3 className="font-semibold">Biography</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active.bio}</p>
              </section>

              <section>
                <h3 className="font-semibold">Courses</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {active.courses.map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <GraduationCap className="size-4 text-primary" /> {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.skills.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-semibold">Available Teaching Slots</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {active.slots.map((s) => (
                    <li key={s} className="rounded-xl border border-border px-3 py-2 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <Button asChild className="bg-brand w-full rounded-full text-primary-foreground">
                <Link to="/batches" onClick={() => setActive(null)}>
                  View Schedule
                </Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}