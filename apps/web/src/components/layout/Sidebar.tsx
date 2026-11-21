
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
    <aside className="sticky top-0 h-screen w-[245px] border-r px-5 py-7">

      <Link href="/home">
        <h1 className="mb-10 text-3xl font-bold">
          SocialGram<span className="text-primary">.</span>
        </h1>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-muted ${
                active ? "bg-muted font-semibold" : ""
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-9" />

      {/* Profile */}
      <div className="flex items-center gap-3">
        <UserAvatar
          name="Soniya Patidar"
          className="h-10 w-10"
        />

        <div>
          <p className="text-sm font-semibold">Soniya Patidar</p>
          <p className="text-xs text-muted-foreground">@soniya</p>
        </div>

        <ThemeToggle />
      </div>

      {/* More */}
      <Link
        href="/settings"
        className="mt-5 flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
      >
        <MoreHorizontal size={22} />
        <span>More</span>
      </Link>

    </aside>
  );
}
