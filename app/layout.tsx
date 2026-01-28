import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Dock from "@/components/layout/Dock";


const inter = Inter({
  subsets: ["latin", "vietnamese"], 
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Trương Đức Nhật Anh | Portfolio",
  description: "Developer - Creative - Dreamer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Dock/>
        {children}

      </body>
    </html>
  );
}