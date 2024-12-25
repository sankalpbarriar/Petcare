import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petcare",
  description: "Take care of people's pets responsibly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm text-zinc-900 bg-[#e8edf3] min-h-screen`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
