import Navigation from "@/components/navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InFaktura",
  description: "Faktura online bez registrace a zcela zdarma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-dvh">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
