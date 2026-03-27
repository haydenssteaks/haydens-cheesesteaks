import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Hayden's Authentic Cheesesteaks | Toronto's Philly-Style Cheesesteaks",
    template: "%s | Hayden's Authentic Cheesesteaks",
  },
  description:
    "Toronto's authentic Philly-style cheesesteaks. CAB chuck rolls, sharp cheddar, caramelized onions on a seeded baguette. Order online for pickup at our next pop-up event.",
  keywords: [
    "cheesesteak",
    "Toronto",
    "Philly cheesesteak",
    "authentic cheesesteak",
    "pop-up restaurant",
    "Toronto food",
    "catering Toronto",
  ],
  openGraph: {
    title: "Hayden's Authentic Cheesesteaks",
    description:
      "Toronto's authentic Philly-style cheesesteaks. Order online for pickup at our next pop-up event.",
    type: "website",
    url: "https://haydenscheesesteaks.com",
    siteName: "Hayden's Authentic Cheesesteaks",
    locale: "en_CA",
    images: [
      {
        url: "/images/hero-cheesesteak.jpg",
        width: 1200,
        height: 630,
        alt: "Hayden's Authentic Cheesesteaks — loaded Philly-style cheesesteaks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayden's Authentic Cheesesteaks",
    description:
      "Toronto's authentic Philly-style cheesesteaks. Order online for pickup at our next pop-up event.",
    images: ["/images/hero-cheesesteak.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://haydenscheesesteaks.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
