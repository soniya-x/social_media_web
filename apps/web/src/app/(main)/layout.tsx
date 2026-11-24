"use client";

import { usePathname } from "next/navigation";

import { Sidebar, RightSidebar, ProtectedRoute } from "@/domains/application";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideRightSidebar = pathname === "/messages" || pathname === "/create";

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">{children}</main>

        {!hideRightSidebar && <RightSidebar />}
      </div>
    </ProtectedRoute>
  );
}
