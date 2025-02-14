import "../styles/globals.css";
import type { Metadata } from "next";
import "../styles/globals.css"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Puedes seleccionar los pesos que necesites
});

export const metadata: Metadata = {
  title: "Deinsa Sneakers",
  description: "Ecommerce de Zapatillas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Navbar/>
        <div className="w-full h-full pt-16">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
