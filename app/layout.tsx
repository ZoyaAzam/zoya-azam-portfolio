import { JetBrains_Mono, Inter } from "next/font/google";
// @ts-ignore: Allow side-effect import of global CSS in Next.js app directory
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Zoya Azam — Senior Backend Engineer",
  description:
    "Laravel, Redis queues, Pusher WebSockets, and integration-heavy backend systems in production."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-[#0d0d0d] text-[#f4f4f0] antialiased">
        {children}
      </body>
    </html>
  );
}