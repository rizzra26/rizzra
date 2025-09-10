import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const interSans = Inter({
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${interSans} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
