import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hugo Cantor — Portfolio",
  description: "Portafolio académico y personal de Hugo Cantor. Proyectos, formación y habilidades.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}