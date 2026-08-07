import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { Counter, PageTransition, Reveal } from "@/components/motion";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/institute";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeVista Academy — Learn Today. Build Tomorrow." },
      {
        name: "description",
        content:
          "Master technology with practical, career-focused training in programming, full stack development, data, AI, cloud and cyber security.",
      },
      { property: "og:title", content: "CodeVista Academy — Master Technology. Build Your Future." },
      {
        property: "og:description",
        content: "Hands-on IT training, expert trainers, real projects and career support.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 10, suffix: "K+", label: "Students Trained", icon: Users },
  { value: 25, suffix: "+", label: "Technical Courses", icon: GraduationCap },
  { value: 50, suffix: "+", label: "Expert Trainers", icon: Award },
  { value: 90, suffix: "%", label: "Career Support", icon: BriefcaseBusiness },
];

const features = [
  { icon: Wrench, title: "Practical Learning", text: "Learn through hands-on exercises and projects." },
  { icon: Users, title: "Expert Trainers", text: "Learn from experienced technology professionals." },
  { icon: Rocket, title: "Real-World Projects", text: "Build projects that strengthen your portfolio." },
  { icon: BriefcaseBusiness, title: "Career Support", text: "Prepare for interviews, resumes and technical assessments." },
];

const steps = [
  { no: "01", title: "Choose Your Course", text: "Pick a programme aligned with the role you want." },
  { no: "02", title: "Learn From Experts", text: "Live instructor-led sessions with weekly feedback." },
  { no: "03", title: "Build Real Projects", text: "Ship portfolio work reviewed by your trainer." },
  { no: "04", title: "Become Career Ready", text: "Resume, mock interviews and technical preparation." },
];

function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            className="bg-brand absolute -left-24 top-10 size-72 rounded-full opacity-20 blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 top-40 size-80 rounded-full bg-accent opacity-20 blur-3xl"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            >
              <Sparkles className="size-3.5 text-primary" />
              Learn Today. Build Tomorrow.
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7 }}
              className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
            >
              Master Technology.
              <br />
              <span className="text-gradient">Build Your Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Learn industry-relevant computer skills through practical training, expert guidance,
              real-world projects and career-focused programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="bg-brand rounded-full text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/courses">
                  Explore Courses <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/batches">Join a Batch</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="relative"
          >
            <div className="glass overflow-hidden rounded-[2rem] p-2 shadow-elegant">
              <img
                src={heroImage}
                width={1600}
                height={1104}
                alt="Students learning programming on laptops in a modern technology classroom"
                className="w-full rounded-[1.6rem] object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -bottom-6 left-4 rounded-2xl px-4 py-3 shadow-elegant sm:left-8"
            >
              <p className="text-xs text-muted-foreground">Live batches running</p>
              <p className="text-lg font-semibold">8 Programmes</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          Sample figures shown for demonstration purposes.
        </p>
      </section>

      {/* Popular courses */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Learn Skills That Matter</h2>
          <p className="mt-3 text-muted-foreground">
            Eight focused programmes designed around the roles employers are actually hiring for.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.06}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/courses">
              Browse all courses <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why CodeVista */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Why CodeVista</h2>
          <p className="mt-3 text-muted-foreground">
            A learning model built around practice, feedback and outcomes.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-6 transition-transform hover:-translate-y-1">
                <div className="grid size-11 place-items-center rounded-2xl bg-secondary">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning process */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Your Learning Journey</h2>
          <p className="mt-3 text-muted-foreground">Four steps from first line of code to career ready.</p>
        </Reveal>
        <div className="relative mt-12 grid gap-8 lg:grid-cols-4">
          <div className="bg-brand absolute left-0 right-0 top-8 hidden h-px opacity-40 lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.12} className="relative">
              <div className="bg-brand relative z-10 grid size-16 place-items-center rounded-2xl font-display text-xl font-bold text-primary-foreground shadow-glow">
                {s.no}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Student Stories</h2>
          <p className="mt-3 text-muted-foreground">Demo testimonials created to illustrate the experience.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.08}>
              <div className="glass h-full rounded-3xl p-6">
                <Quote className="size-6 text-primary opacity-60" />
                <p className="mt-4 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="bg-brand grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-primary-foreground">
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.course}</p>
                  </div>
                  <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm">
                    <Star className="size-3.5 fill-current text-primary" />
                    {t.rating}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6">
        <Reveal>
          <div className="hero-glow glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Upgrade Your Skills?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Choose your course and start building your technology career.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-brand rounded-full text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
