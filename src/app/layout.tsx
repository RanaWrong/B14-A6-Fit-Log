import type { Metadata } from "next";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#0b0c0e] text-white antialiased">
        <FitLogProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
