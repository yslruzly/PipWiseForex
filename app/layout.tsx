import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PIPWISE — Learn Forex Trading, Candle by Candle",
  description:
    "A free six-module forex trading tutorial: charts, pips, lots, leverage, risk management, and strategy building. Demo-first, zero hype.",
  openGraph: {
    title: "PIPWISE — Learn Forex Trading, Candle by Candle",
    description:
      "Free six-module forex course built around demo trading and risk management. No signal selling, no signup walls.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-white antialiased font-sans">{children}</body>
    </html>
  );
}
