"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Occupation Risk", href: "/" },
  { label: "Tech Progress", href: "/tech-progress" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Task Risk Atlas
        </span>
        <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Decision Infra
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-2 rounded-full border border-border/70 bg-card/70 px-2 py-1 shadow-[var(--shadow)] backdrop-blur">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "text-xs",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
