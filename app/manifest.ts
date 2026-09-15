import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fauna Tapantí - Tarjetario Educativo",
    short_name: "Fauna Tapantí",
    description: "Tarjetario educativo offline para giras en Tapantí.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0df",
    theme_color: "#2D5A27",
    lang: "es-CR",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
