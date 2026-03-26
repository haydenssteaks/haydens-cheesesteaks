import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hayden's Authentic Cheesesteaks",
  description:
    "Toronto's authentic Philly-style cheesesteaks. Pre-order for our upcoming pop-up events or inquire about catering.",
  openGraph: {
    title: "Hayden's Authentic Cheesesteaks",
    description:
      "Toronto's authentic Philly-style cheesesteaks. Pre-order for our upcoming pop-up events.",
    type: "website",
    url: "https://haydenscheesesteaks.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
