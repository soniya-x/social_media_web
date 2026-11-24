"use client";

import { GuestRoute } from "$domains/application";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestRoute>{children}</GuestRoute>;
}
