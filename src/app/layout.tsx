import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import Script from "next/script";

import { LEDGER_GATE_SCRIPT } from "@/lib/ledger-gate";
import { IDENTITY_LINE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site-copy";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: IDENTITY_LINE,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: IDENTITY_LINE,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: IDENTITY_LINE,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Covers exactly one intentional pre-hydration difference: the
      // ledger-gate beforeInteractive script stamps data-ledger on
      // <html> before React hydrates (the same pattern theme scripts
      // use). Attribute diffs on this element only; children are still
      // fully checked.
      suppressHydrationWarning
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Ledger Sort arrival gate — see src/lib/ledger-gate.ts. */}
        <Script id="ledger-gate" strategy="beforeInteractive">
          {LEDGER_GATE_SCRIPT}
        </Script>
        {children}
      </body>
    </html>
  );
}
