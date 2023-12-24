import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Spotify API AUTH",
  description: "Spotify API AUTH Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`{inter.className} h-full`}>
          <Nav />
          <div className="pd-24 h-full">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
