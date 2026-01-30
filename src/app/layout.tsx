import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google"; // <--- Import the new font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configure the Serif font for quotes
const serif = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif", // We give it a name to use later
});

export const metadata: Metadata = {
  title: "Quotes",
  description: "Daily wisdom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We add the variable here so we can use it anywhere */}
      <body className={`${inter.className} ${serif.variable}`}>{children}</body>
    </html>
  );
}
