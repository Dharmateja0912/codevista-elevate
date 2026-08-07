import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Award, BookOpen, CalendarDays, PlayCircle } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageTransition, Reveal } from "@/components/motion";
import { readStore, STORAGE_KEYS } from "@/lib/storage";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — CodeVista Academy" },
      {
        name: "description",
        content:
          "Demo student dashboard: course progress, upcoming classes, certificates and recent learning activity.",
      },
      { property: "og:title", content: "Student Dashboard — CodeVista Academy" },
      { property: "og:description", content: "Track modules completed, classes and certificates." },
    ],
  }),
  component: Dashboard,
});

const myCourses = [
  { title: "Full Stack Development", progress: 72, done: 12, total: 16, next: "React Hooks" },
  { title: "Python Programming", progress: 100, done: 14, total: 14, next: "Completed" },
  { title: "Power BI", progress: 35, done: 4, total: 12, next: "DAX Fundamentals" },
];

const upcoming = [
  { title: "React Hooks Deep Dive", when: "Today · 7:30 PM", trainer: "Priya Sharma" },
  { title: "Express Middleware", when: "Thu · 7:30 PM", trainer: "Arjun Desai" },
  { title: "Power BI Data Modeling", when: "Sat · 11:00 AM", trainer: "Rahul Kumar" },
];

const certificates = [
  { course: "Python Programming", id: "CV-2026-001", date: "12 March 2026" },
  { course: "Excel for Analysts", id: "CV-2025-214", date: "08 Nov 2025" },
];

const progressSeries = [
  { week: "W1", modules: 2 },
  { week: "W2", modules: 4 },
  { week: "W3", modules: 7 },
  { week: "W4", modules: 9 },
  { week: "W5", modules: 12 },
  { week: "W6", modules: 16 },
];

function Dashboard() {
  const [activity, setActivity] = useState<{ text: string; at: string }[]>([]);

  useEffect(() => {
    setActivity(readStore<{ text: string; at: string }[]>(STORAGE_KEYS.activity, []));
  }, []);

  const recent = activity.length
    ? activity
    : [
        { text: "Completed module: Express Routing.", at: new Date().toISOString() },
        { text: "Submitted assignment: REST API design.", at: new Date().toISOString() },
      ];

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">Welcome back! 👋</h1>
          <p className="mt-2 text-muted-foreground">
            Demo learning dashboard — progress shown is sample data.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Reveal>
            <h2 className="text-xl font-bold">My Courses</h2>
            <div className="mt-4 space-y-4">
              {myCourses.map((c) => (
                <div key={c.title} className="glass rounded-3xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">{c.title}</h3>
                    <span className="text-sm font-semibold text-primary">{c.progress}%</span>
                  </div>
                  <Progress value={c.progress} className="mt-3 h-2" />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                    <span>
                      {c.done} / {c.total} Modules
                    </span>
                    <span>Next: {c.next}</span>
                  </div>
                  <Button
                    className="bg-brand mt-4 rounded-full text-primary-foreground"
                    onClick={() => toast.success(`Resuming ${c.title} — ${c.next}`)}
                  >
                    <PlayCircle className="mr-1 size-4" /> Continue Learning
                  </Button>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="glass rounded-3xl p-6">
              <h2 className="text-xl font-bold">Learning Progress</h2>
              <div className="mt-4 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressSeries} margin={{ left: -25 }}>
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                      }}
                    />
                    <Line type="monotone" dataKey="modules" stroke="var(--primary)" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>

        <aside className="space-y-6">
          <Reveal>
            <div className="glass rounded-3xl p-6">
              <h2 className="flex items-center gap-2 font-bold">
                <CalendarDays className="size-4 text-primary" /> Upcoming Classes
              </h2>
              <ul className="mt-4 space-y-3">
                {upcoming.map((u) => (
                  <li key={u.title} className="rounded-2xl bg-secondary/50 p-3">
                    <p className="text-sm font-medium">{u.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.when} · {u.trainer}
                    </p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-4 w-full rounded-full">
                <Link to="/batches">See all batches</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass rounded-3xl p-6">
              <h2 className="flex items-center gap-2 font-bold">
                <Award className="size-4 text-primary" /> Certificates
              </h2>
              <ul className="mt-4 space-y-3">
                {certificates.map((c) => (
                  <li key={c.id} className="rounded-2xl bg-secondary/50 p-3">
                    <p className="text-sm font-medium">{c.course}</p>
                    <p className="font-mono text-xs text-muted-foreground">{c.id} · {c.date}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-4 w-full rounded-full">
                <Link to="/certifications">Verify a certificate</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass rounded-3xl p-6">
              <h2 className="flex items-center gap-2 font-bold">
                <BookOpen className="size-4 text-primary" /> Recent Activity
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {recent.slice(0, 6).map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {a.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>
    </PageTransition>
  );
}