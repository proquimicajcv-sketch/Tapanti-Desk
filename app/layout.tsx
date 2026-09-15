import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fauna Tapantí - Tarjetario Educativo",
  description: "Guía educativa offline de fauna y flora de Tapantí.",
  applicationName: "Fauna Tapantí",
  keywords: ["Tapantí", "PWA", "Tarjetario", "Costa Rica", "Educación"],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
