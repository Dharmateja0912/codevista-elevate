import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { PageTransition, Reveal } from "@/components/motion";
import { categories, courses, type Level } from "@/data/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Explore Our Courses — CodeVista Academy" },
      {
        name: "description",
        content:
          "Browse practical technology courses in programming, web development, data, AI & ML, cloud, cyber security and business intelligence.",
      },
      { property: "og:title", content: "Explore Our Courses — CodeVista Academy" },
      {
        property: "og:description",
        content: "Search and filter career-focused technology courses by category and difficulty.",
      },
    ],
  }),
  component: CoursesPage,
});

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [level, setLevel] = useState<Level | null>(null);

  const filtered = useMemo(
    () =>
      courses.filter((c) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.short.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q);
        const matchC = category === "All" || c.category === category;
        const matchL = !level || c.levels.includes(level);
        return matchQ && matchC && matchL;
      }),
    [query, category, level],
  );

  return (
    <PageTransition>
      <section className="hero-glow border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Explore Our <span className="text-gradient">Courses</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Build practical skills for today's technology-driven world.
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="h-12 rounded-full pl-11"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className={`rounded-full ${category === c ? "bg-brand text-primary-foreground" : ""}`}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> Difficulty
          </span>
          {levels.map((l) => (
            <Button
              key={l}
              size="sm"
              variant={level === l ? "secondary" : "ghost"}
              onClick={() => setLevel(level === l ? null : l)}
              className="rounded-full"
            >
              {l}
            </Button>
          ))}
          {(level || category !== "All" || query) && (
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full text-muted-foreground"
              onClick={() => {
                setLevel(null);
                setCategory("All");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} course{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-14 text-center">
            <p className="text-lg font-semibold">No courses found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword, category or difficulty level.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.06}>
                <CourseCard course={c} cta="View Details" />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}