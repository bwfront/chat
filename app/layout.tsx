import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider, } from "@clerk/nextjs";
import Nav from "@/components/Nav";
import Users from "@/components/Users";

export const metadata: Metadata = {
  title: "chat.",
  description: "just chat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`{inter.className} h-full dark:text-white dark:bg-small`}>
          <Nav />
          <div className="h-full flex">
          <Users />
          {children}
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
