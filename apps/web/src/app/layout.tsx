import type { Metadata } from "next";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import {StoreProvider} from "@/domains/application";

export const metadata: Metadata = {
  title: "Socially | Connect and Share",
  description: "A place to connect, share and communicate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}