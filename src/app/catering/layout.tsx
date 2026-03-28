import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Book Hayden's Cheesesteaks for your next corporate event, private party, or gathering. Toronto-based Philly-style cheesesteak catering.",
  openGraph: {
    title: "Catering | Hayden's Cheesesteaks",
    description:
      "Book authentic Philly-style cheesesteak catering for your next event in Toronto.",
  },
};

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
