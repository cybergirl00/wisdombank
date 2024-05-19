import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wisdom Bank",
  description: "Al Hikmah Past Question Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main>{children}</main>
      <Toaster />
      </body>
    </html>
  );
}
