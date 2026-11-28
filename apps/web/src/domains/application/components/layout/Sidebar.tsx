"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useUserProfile from "@/hooks/useUserProfile";
import {
  Home,
  Search,
  Send,
  Heart,
  SquarePlus,
  UserRound,
  Settings,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

import { Separator, UserAvatar, ThemeToggle } from "@/domains/application";

const navigation = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Messages", href: "/messages", icon: Send },
  { label: "Notifications", href: "/notifications", icon: Heart },
  { label: "Create Post", href: "/create-post", icon: SquarePlus },
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  // Custom hook to fetch the logged-in user's profile
  const { user, loading, error } = useUserProfile();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.replace("/login");
  };

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
              className={`flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-muted ${active ? "bg-muted font-semibold" : ""
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
        {/* Display user's avatar using their full name */}
        <UserAvatar name={user?.fullName || "User"} className="h-10 w-10" />

        <div className="min-w-0 flex-1">
          {/* Show loading text until profile data is fetched */}
          <p className="truncate text-sm font-semibold">
            {loading ? "Loading..." : user?.fullName || "User"}
          </p>

          {/* Display the user's username with @ symbol */}
          <p className="truncate text-xs text-muted-foreground">
            {loading ? "" : user ? `@${user.username}` : ""}
          </p>
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

      <button
        onClick={handleLogout}
        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-500 hover:bg-muted"
      >
        <LogOut size={22} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
