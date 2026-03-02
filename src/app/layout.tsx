import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mosh's Catan Leaderboard",
  description: "Track players, games, wins, and shareable stats.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
