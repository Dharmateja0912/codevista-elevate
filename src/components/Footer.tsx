import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "@/components/Logo";
import { contactInfo } from "@/data/institute";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/trainers", label: "Trainers" },
  { to: "/batches", label: "Batches" },
  { to: "/certifications", label: "Certifications" },
  { to: "/placements", label: "Placements" },
  { to: "/contact", label: "Contact" },
] as const;

const courseLinks = [
  { slug: "python-programming", label: "Python" },
  { slug: "full-stack-development", label: "Full Stack" },
  { slug: "data-analytics", label: "Data Analytics" },
  { slug: "ai-machine-learning", label: "AI & ML" },
  { slug: "cloud-computing", label: "Cloud" },
  { slug: "cyber-security", label: "Cyber Security" },
];

const socials = [Linkedin, Twitter, Instagram, Facebook, Github];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Practical, career-focused technology training for students, graduates and working
            professionals. Learn Today. Build Tomorrow.
          </p>
          <div className="flex gap-2">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Courses</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {courseLinks.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/courses/$slug"
                  params={{ slug: c.slug }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${contactInfo.phone}`} className="hover:text-primary">{contactInfo.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">{contactInfo.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{contactInfo.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CodeVista Academy. All rights reserved.</p>
          <p>Statistics, testimonials and student records shown on this site are demo data.</p>
        </div>
      </div>
    </footer>
  );
}