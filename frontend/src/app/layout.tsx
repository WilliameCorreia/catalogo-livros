import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/layout/ThemeProvider";
import { Header } from "../components/layout/Header";
import { ToastProvider } from "../contexts/ToastContext";
import { ConfirmProvider } from "../contexts/ConfirmContext";
import { ToastContainer } from "../components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de Livros",
  description: "Gerencie sua coleção de livros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <ToastProvider>
            <ConfirmProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <ToastContainer />
            </ConfirmProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
