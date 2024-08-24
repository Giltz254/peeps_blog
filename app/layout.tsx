import type { Metadata } from "next";
import { Gelasio } from "next/font/google";
import "./globals.css";
import { DEFAULT_WEBSITE_URL } from "@/constants";
import BackToTop from "@/components/BackToTop";

const inter = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${DEFAULT_WEBSITE_URL}`),
  title: {
    default: "JS Peeps - Unraveling JavaScript & Beyond",
    template: "%s - Unraveling JavaScript & Beyond"
  },
  description: "Dive into JavaScript and explore a wide array of programming concepts. Stay updated with tutorials, tips, and insights for developers of all levels.",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackToTop />
        {children}
        </body>
    </html>
  );
}
