import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Finder - Find Your Dream Car",
  description: "Search and find your perfect car with our comprehensive car finder application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <WishlistProvider>
          <Navbar />
          <main className="pt-6 pb-12">
            {children}
          </main>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1E40AF',
                color: '#fff',
              },
            }}
          />
        </WishlistProvider>
      </body>
    </html>
  );
}
