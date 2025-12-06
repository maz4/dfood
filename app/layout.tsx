import type { Metadata } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "ドッグフード給与量計算機",
  description: "Calculate the right amount of food for your dog",
  manifest: "/manifest.json",
  themeColor: "#3498db",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dog Food Calc",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#3498db" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dog Food Calc" />
      </head>
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
