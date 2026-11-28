import type { Metadata } from "next";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import { StoreProvider } from "@/domains/application";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Socially | Connect and Share",
  description: "A place to connect, share and communicate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("dsdsd ===>",process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <StoreProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
