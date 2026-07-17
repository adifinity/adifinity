import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

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
      // The Ledger Sort arrival script may stamp data-ledger on <html>
      // before hydration (the standard pre-paint pattern, as used by
      // theme scripts). Suppress the attribute-only hydration diff for
      // this element; children are still fully checked.
      suppressHydrationWarning
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
