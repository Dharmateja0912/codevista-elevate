import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, ShieldQuestion, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition, Reveal } from "@/components/motion";
import { certificateRecords, type CertificateRecord } from "@/data/institute";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications & Verification — CodeVista Academy" },
      {
        name: "description",
        content:
          "Earn a verifiable certificate of completion for eligible CodeVista Academy courses and verify any certificate ID online.",
      },
      { property: "og:title", content: "Certify Your Skills — CodeVista Academy" },
      {
        property: "og:description",
        content: "Course certificates with instant online verification.",
      },
    ],
  }),
  component: CertificationsPage,
});

type Result = { status: "idle" } | { status: "found"; record: CertificateRecord } | { status: "missing" };

function CertificationsPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });

  const verify = () => {
    const record = certificateRecords.find((r) => r.id.toLowerCase() === id.trim().toLowerCase());
    setResult(record ? { status: "found", record } : { status: "missing" });
  };

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Certify Your <span className="text-gradient">Skills</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Students who successfully complete an eligible course, its capstone project and the final
            assessment receive a certificate of completion with a unique verification ID.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold">Certificate Tracks</h2>
          <p className="mt-2 text-muted-foreground">Certificates are issued for each of these programmes.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.06}>
              <div className="glass flex h-full items-center gap-3 rounded-2xl p-5">
                <span className="bg-brand grid size-10 shrink-0 place-items-center rounded-xl">
                  <c.icon className="size-5 text-primary-foreground" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.duration}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certificate preview */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Reveal>
          <div className="glass overflow-hidden rounded-[2rem] p-6 sm:p-10">
            <div className="relative rounded-[1.5rem] border border-primary/30 bg-card/70 p-8 text-center shadow-elegant sm:p-14">
              <div className="bg-brand pointer-events-none absolute inset-x-0 top-0 h-1.5" />
              <Sparkles className="mx-auto size-7 text-primary" />
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Certificate of Completion
              </p>
              <p className="mt-6 text-sm text-muted-foreground">This is to certify that</p>
              <p className="font-display mt-2 text-3xl font-bold sm:text-4xl">Sneha Patil</p>
              <p className="mt-4 text-sm text-muted-foreground">
                has successfully completed the programme
              </p>
              <p className="text-gradient mt-1 text-xl font-semibold">Python Programming</p>
              <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
                <span>Issued 12 March 2026</span>
                <span className="font-mono">ID: CV-2026-001</span>
                <span>CodeVista Academy</span>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Sample certificate shown for demonstration.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Verification */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold">Verify Certificate</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter a certificate ID (try <span className="font-mono">CV-2026-001</span>) to check its
              authenticity.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Input
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verify()}
                placeholder="CV-2026-001"
                className="h-11 rounded-full"
              />
              <Button
                onClick={verify}
                className="bg-brand h-11 rounded-full px-8 text-primary-foreground"
              >
                Verify
              </Button>
            </div>

            {result.status === "found" && (
              <div className="mt-6 rounded-2xl border border-primary/40 bg-primary/10 p-5">
                <p className="flex items-center gap-2 font-semibold text-primary">
                  <BadgeCheck className="size-5" /> Certificate Verified
                </p>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-muted-foreground">Student Name</dt>
                    <dd className="font-medium">{result.record.student}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Course</dt>
                    <dd className="font-medium">{result.record.course}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Completion Date</dt>
                    <dd className="font-medium">{result.record.completed}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Certificate ID</dt>
                    <dd className="font-mono font-medium">{result.record.id}</dd>
                  </div>
                </dl>
              </div>
            )}

            {result.status === "missing" && (
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm text-destructive">
                <ShieldQuestion className="size-5" /> Certificate not found.
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}