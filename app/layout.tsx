import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAFA CASH — Send Money to Burkina Faso",
  description:
    "Send money to Burkina Faso instantly with NAFA CASH. Fast, secure transfers directly to Orange Money wallets.",
  keywords: [
    "send money Burkina Faso",
    "Orange Money transfer",
    "remittance Africa",
    "NAFA CASH",
    "send CFA",
    "envoie d'argent au Burkina Faso",
  ],
  authors: [{ name: "NAFA CASH" }],
  creator: "NAFA CASH",
  metadataBase: new URL("https://nafacash.com"),
  openGraph: {
    title: "NAFA CASH — Send Money to Burkina Faso",
    description:
      "Fast and secure money transfers to Burkina Faso. Direct to Orange Money wallets.",
    url: "https://nafacash.com",
    siteName: "NAFA CASH",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
