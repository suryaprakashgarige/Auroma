import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auroma - We Read the Room. Then We Make the Coffee.",
  description: "Four AI-powered ways to find your perfect cup. No guesswork. Just great coffee.",
};

import CursorGlow from "@/components/CursorGlow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
      >
        <CursorGlow />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

