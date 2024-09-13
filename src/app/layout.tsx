import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(""),
  title: {
    default: "blink-arena",
    template: "%s | blink-arena",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  description:
    "Welcome to the portfolio of Avhi Mazumder. Explore my projects, blogs, skills and experiences in development, design, and more.",
  openGraph: {
    title: "",
    description:
      "Welcome to the portfolio of Avhi Mazumder. Explore my projects, blogs, skills and experiences in development, design, and more.",
    url: "",
    siteName: "blink-arena.vercel.app",
    images: [
      {
        url: "https://blink-arena.opengraph-image.png",
        // width: ogImage.width,
        // height: ogImage.height,
      },
    ],

    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Blink-Arena",
    card: "summary_large_image",

    images: [
      {
        url: "https://blink-arena.opengraph-image.png",
        // width: ogImage.width,
        // height: ogImage.height,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>{children}</body>
    </html>
  );
}
