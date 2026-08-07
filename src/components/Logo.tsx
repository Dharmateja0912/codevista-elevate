import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      <span className="bg-brand grid size-9 place-items-center rounded-xl shadow-glow">
        <Code2 className="size-5 text-primary-foreground" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">
          Code<span className="text-gradient">Vista</span>
        </span>
        {!compact && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Academy
          </span>
        )}
      </span>
    </Link>
  );
}