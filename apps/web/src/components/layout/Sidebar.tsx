"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Send,
  Heart,
  SquarePlus,
  UserRound,
  Settings,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/shared/UserAvatar";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navigation = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Messages", href: "/messages", icon: Send },
  { label: "Notifications", href: "/notifications", icon: Heart },
  { label: "Create Post", href: "/create", icon: SquarePlus },
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[245px] shrink-0 flex-col border-r bg-background px-5 py-7">
      <Link href="/home" className="mb-10 px-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Socially<span className="text-primary">.</span>
        </h1>
      </Link>

      <nav className="flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Button
              key={item.label}
              asChild
              variant="ghost"
              className={`h-12 justify-start gap-4 px-3 text-[15px] ${
                active ? "bg-muted font-semibold" : "font-normal"
              }`}
            >
              <Link href={item.href}>
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <Separator className="my-4" />

      <div className="flex items-center gap-3 rounded-lg p-2">
        <UserAvatar name="Soniya Patidar" className="h-10 w-10" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            Soniya Patidar
          </p>
          <p className="truncate text-xs text-muted-foreground">
            @soniya
          </p>
        </div>

        <ThemeToggle />
      </div>

      <Button variant="ghost" className="mt-3 justify-start gap-3">
        <MoreHorizontal size={21} />
        More
      </Button>
    </aside>
  );
}