import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const interSans = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rizky",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
