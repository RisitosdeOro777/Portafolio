import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hugo Cantor — Portafolio",
  description: "Portafolio personal y académico de Hugo Cantor: proyectos, formación, habilidades y experiencias.",
  openGraph: {
    title: "Hugo Cantor — Portafolio",
    description: "Aprender. Crear. Evolucionar. Un recorrido por mis proyectos y formación.",
    type: "website",
    images: [{ url: "/images/hugo-portrait.webp", width: 360, height: 429, alt: "Retrato de Hugo Cantor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Cantor — Portafolio",
    description: "Portafolio personal y académico.",
    images: ["/images/hugo-portrait.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
