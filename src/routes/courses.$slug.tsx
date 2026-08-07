import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Award, CheckCircle2, Clock, MonitorPlay, Signal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageTransition, Reveal } from "@/components/motion";
import { getCourse } from "@/data/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { title: course.title, tagline: course.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — CodeVista Academy" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} Course — CodeVista Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.tagline },
      ],
    };
  },
  component: CourseDetail,
});

function CourseDetail() {
  const { slug } = Route.useParams();
  const course = getCourse(slug)!;
  const Icon = course.icon;

  const facts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Signal, label: "Level", value: course.level },
    { icon: MonitorPlay, label: "Mode", value: course.mode },
    { icon: Award, label: "Certificate", value: course.certificate ? "Included" : "Not included" },
    { icon: CheckCircle2, label: "Projects", value: `${course.projects.length} projects` },
    { icon: Star, label: "Rating", value: `${course.rating} / 5` },
  ];

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> All courses
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="bg-brand grid size-12 shrink-0 place-items-center rounded-2xl shadow-glow">
                  <Icon className="size-6 text-primary-foreground" />
                </span>
                <Badge variant="secondary" className="rounded-full">{course.category}</Badge>
              </div>
              <h1 className="mt-5 text-3xl font-bold uppercase sm:text-4xl lg:text-5xl">{course.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{course.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-brand rounded-full text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/register">Enroll Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/batches">View Batches</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {facts.map((f) => (
              <div key={f.label} className="glass rounded-2xl p-4">
                <f.icon className="size-4 text-primary" />
                <p className="mt-2 text-xs text-muted-foreground">{f.label}</p>
                <p className="text-sm font-semibold">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <Reveal>
            <h2 className="text-2xl font-bold">Course Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{course.overview}</p>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold">Learning Outcomes</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="glass flex gap-3 rounded-2xl p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold">Curriculum</h2>
            <Accordion type="single" collapsible className="glass mt-4 rounded-3xl px-5">
              {course.curriculum.map((m, i) => (
                <AccordionItem key={m.title} value={m.title} className="border-border/60">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-4">
                      <span className="font-display text-sm text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium">{m.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-11 text-muted-foreground">
                    {m.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold">Projects You Will Build</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {course.projects.map((p) => (
                <div key={p.title} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{p.title}</h3>
                    <Badge variant="outline" className="shrink-0 rounded-full text-xs">
                      {p.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="glass mt-4 rounded-3xl px-5">
              {course.faq.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-border/60">
                  <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        <aside className="space-y-6">
          <Reveal className="lg:sticky lg:top-24">
            <div className="glass rounded-3xl p-6">
              <h3 className="font-semibold">Tools & Technologies</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {course.tools.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="mt-7 font-semibold">Career Opportunities</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {course.careers.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-secondary/60 p-4 text-sm">
                <p className="font-semibold">{course.students.toLocaleString()}+ students enrolled</p>
                <p className="mt-1 text-xs text-muted-foreground">Demo enrolment figure.</p>
              </div>

              <Button asChild className="bg-brand mt-5 w-full rounded-full text-primary-foreground">
                <Link to="/register">Submit Registration</Link>
              </Button>
            </div>
          </Reveal>
        </aside>
      </div>
    </PageTransition>
  );
}