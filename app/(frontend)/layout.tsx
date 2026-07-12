import type { Metadata } from "next";
import "./globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orange Creek Capital",
  description:
    "Participatiemaatschappij van ondernemers, voor ondernemers. We bouwen bedrijven met exponentieel groeipotentieel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
