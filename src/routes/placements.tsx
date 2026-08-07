import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Brain,
  ClipboardList,
  FileText,
  MessageSquare,
  Mic,
  Presentation,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Counter, PageTransition, Reveal } from "@/components/motion";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Placement & Career Support — CodeVista Academy" },
      {
        name: "description",
        content:
          "Resume building, mock interviews, aptitude practice and portfolio reviews — the career support included with every CodeVista course.",
      },
      { property: "og:title", content: "Build Skills. Become Career Ready." },
      {
        property: "og:description",
        content: "A six-step placement preparation process with a career readiness dashboard.",
      },
    ],
  }),
  component: PlacementsPage,
});

const stats = [
  { value: 2500, suffix: "+", label: "Students Supported", icon: Users },
  { value: 150, suffix: "+", label: "Hiring Connections", icon: Target },
  { value: 85, suffix: "%", label: "Career Assistance", icon: ClipboardList },
];

const process = [
  { step: "Step 1", title: "Skill Assessment", text: "Benchmark your current technical level." },
  { step: "Step 2", title: "Resume Building", text: "Craft a role-specific, ATS-friendly resume." },
  { step: "Step 3", title: "Technical Preparation", text: "Structured DSA and domain revision." },
  { step: "Step 4", title: "Mock Interviews", text: "Recorded interviews with detailed feedback." },
  { step: "Step 5", title: "Interview Preparation", text: "Company-style rounds and HR practice." },
  { step: "Step 6", title: "Career Guidance", text: "Role mapping and long-term growth planning." },
];

const features = [
  { icon: FileText, title: "Resume Preparation" },
  { icon: Mic, title: "Mock Interviews" },
  { icon: Brain, title: "Technical Interview Preparation" },
  { icon: ClipboardList, title: "Aptitude Preparation" },
  { icon: MessageSquare, title: "Communication Skills" },
  { icon: Presentation, title: "Portfolio Development" },
];

const readiness = [
  { name: "Technical Skills", score: 85 },
  { name: "Projects", score: 78 },
  { name: "Resume", score: 90 },
  { name: "Interview Readiness", score: 72 },
];

function PlacementsPage() {
  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Build Skills. <span className="text-gradient">Become Career Ready.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Career support is built into every programme — from your first resume draft to your final
            interview round.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass rounded-3xl p-6 text-center">
                <s.icon className="mx-auto size-6 text-primary" />
                <p className="mt-3 text-3xl font-bold sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Placement statistics shown are sample/demo data and do not represent verified institute
          outcomes.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Placement Preparation Process</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={(i % 3) * 0.07}>
              <div className="glass h-full rounded-3xl p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {p.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">What's Included</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <div className="glass flex h-full items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary">
                  <f.icon className="size-5 text-primary" />
                </span>
                <p className="font-medium">{f.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Career Readiness Score</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sample dashboard showing how progress is tracked for each student.
                </p>
              </div>
              <span className="bg-brand rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground">
                Overall 81%
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="space-y-5">
                {readiness.map((r) => (
                  <div key={r.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{r.name}</span>
                      <span className="font-semibold">{r.score}%</span>
                    </div>
                    <Progress value={r.score} className="mt-2 h-2" />
                  </div>
                ))}
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readiness} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      interval={0}
                      tickFormatter={(v: string) => String(v).split(" ")[0] ?? v}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                      }}
                    />
                    <Bar dataKey="score" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-brand rounded-full text-primary-foreground">
                <Link to="/register">Start Career Preparation</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/dashboard">Open Student Dashboard</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}