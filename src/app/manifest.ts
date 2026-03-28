import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hayden's Cheesesteaks",
    short_name: "Hayden's",
    description: "Toronto's authentic Philly-style cheesesteaks.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F6EF",
    theme_color: "#195F48",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
