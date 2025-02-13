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
  title: "DEINSA ECOMMERCE",
  description: "Sneakers Ecommerce"
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
        <div className="bg-layout pt-20 md:px-8 min-w-screen min-h-screen">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
