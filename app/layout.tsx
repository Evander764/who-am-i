import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "马新淳 · Who am I",
  description:
    "马新淳的个人介绍站。独立开发者，正在 AI 时代做能用的产品。欢迎洽谈合作。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
