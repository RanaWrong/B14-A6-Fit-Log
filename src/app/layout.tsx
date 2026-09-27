import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fit-log-two-pied.vercel.app"),
  title: "FitLog — Workout Library & Planner",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "FitLog — Workout Library & Planner",
    description:
      "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
    url: "https://fit-log-two-pied.vercel.app",
    siteName: "FitLog",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "FitLog Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitLog — Workout Library & Planner",
    description:
      "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#0b0c0e] text-white antialiased">
        <FitLogProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <ScrollToTop />
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
