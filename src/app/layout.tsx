import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hayden's Authentic Cheesesteaks",
  description:
    "Toronto's authentic Philly-style cheesesteaks. Order online for pickup at our next pop-up event.",
  openGraph: {
    title: "Hayden's Authentic Cheesesteaks",
    description:
      "Toronto's authentic Philly-style cheesesteaks. Order online for pickup at our next pop-up event.",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
