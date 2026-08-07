import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { courses } from "@/data/courses";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/trainers", label: "Trainers" },
  { to: "/batches", label: "Batches" },
  { to: "/certifications", label: "Certifications" },
  { to: "/placements", label: "Placements" },
  { to: "/contact", label: "Contact" },
] as const;

const notifications = [
  { title: "Your Python batch starts tomorrow.", time: "2h ago" },
  { title: "Registration submitted successfully.", time: "Yesterday" },
  { title: "New Full Stack batch available.", time: "2 days ago" },
  { title: "Certificate verification completed.", time: "5 days ago" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()),
      )
    : courses.slice(0, 4);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "glass shadow-elegant" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-18">
        <Logo />

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search courses"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-accent" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5 py-2.5">
                  <span className="text-sm">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <Button asChild className="bg-brand ml-1 hidden rounded-full text-primary-foreground shadow-glow hover:opacity-90 sm:inline-flex">
            <Link to="/register">Join Now</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-secondary text-foreground" }}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Button
                asChild
                className="bg-brand mt-2 rounded-full text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Search courses</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="max-h-72 space-y-1 overflow-y-auto">
            {results.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">No courses found.</p>
            )}
            {results.map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                  navigate({ to: "/courses/$slug", params: { slug: c.slug } });
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary"
              >
                <span className="bg-brand grid size-9 shrink-0 place-items-center rounded-lg">
                  <c.icon className="size-4 text-primary-foreground" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{c.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {c.category} · {c.duration}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}