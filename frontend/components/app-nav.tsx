"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Occupation & Task Automation Risk", href: "/" },
  { label: "AI Tech Progress", href: "/tech-progress" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-foreground">
          Task Risk Atlas
        </span>
        <span className="text-xs text-muted-foreground">Menu</span>
      </div>
      <nav className="flex flex-wrap items-center gap-2">
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
