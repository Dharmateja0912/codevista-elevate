import { Link } from "@tanstack/react-router";
import { Award, Clock, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/courses";

export function CourseCard({ course, cta = "View Course" }: { course: Course; cta?: string }) {
  const Icon = course.icon;
  return (
    <article className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <div className="bg-brand pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
      <div className="bg-brand grid size-12 place-items-center rounded-2xl shadow-glow">
        <Icon className="size-6 text-primary-foreground" />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <Badge variant="secondary" className="rounded-full text-xs font-medium">
          {course.category}
        </Badge>
        {course.certificate && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="size-3.5 text-primary" /> Certificate
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{course.short}</p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Signal className="size-3.5" /> {course.level}
        </span>
      </div>
      <Button
        asChild
        variant="secondary"
        className="mt-5 w-full rounded-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <Link to="/courses/$slug" params={{ slug: course.slug }}>
          {cta}
        </Link>
      </Button>
    </article>
  );
}