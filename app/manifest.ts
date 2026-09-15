import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  const startUrl = basePath ? `${basePath}/` : "/";

  return {
    name: "Fauna Tapantí - Tarjetario Educativo",
    short_name: "Fauna Tapantí",
    description: "Tarjetario educativo offline para giras en Tapantí.",
    start_url: startUrl,
    scope: startUrl,
    display: "standalone",
    background_color: "#f6f0df",
    theme_color: "#2D5A27",
    lang: "es-CR",
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
