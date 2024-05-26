import { cn } from "@/lib/utils";
import AppsIcon from "@mui/icons-material/Apps";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
      <body className={cn("antialiased flex flex-col h-dvh", inter.className)}>
        <div className="flex flex-row justify-between bg-black p-4 text-white">
          <p className="font-bold">InFaktura</p>
          <nav>
            <Link href={"/dashboard"}>
              <AppsIcon />
            </Link>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
