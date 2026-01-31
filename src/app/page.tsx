"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Share2,
  Calendar,
  Copy,
  Check,
} from "lucide-react";
import { quotes } from "@/lib/quotes";

export default function Home() {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const dailyIndex = daysSinceEpoch % quotes.length;
  const [currentIndex, setCurrentIndex] = useState(dailyIndex);

  // --- NEW: COPIED STATE ---
  // This remembers if we just clicked the copy button
  const [isCopied, setIsCopied] = useState(false);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const goToToday = () => {
    setCurrentIndex(dailyIndex);
    setIsCopied(false);
  };
  // --- NEW: MENU STATE (To close it automatically) ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- NEW: Helper to close menu on generic clicks ---
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  // --- NEW: COPY FUNCTION ---
  const handleCopy = () => {
    // 1. Prepare the text
    const textToCopy = `"${quotes[currentIndex].text}" — ${quotes[currentIndex].author}`;

    // 2. Write to clipboard
    navigator.clipboard.writeText(textToCopy);

    // 3. Show the "Check" icon
    setIsCopied(true);

    // 4. Hide it after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-white">
      {/* Top Bar with Menu */}
      <div className="absolute top-4 left-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-zinc-950 border-zinc-800 text-white flex flex-col items-center text-center"
          >
            {" "}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-6 mb-2">
                {/* The Logo */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="App Logo"
                    width={75}
                    height={75}
                    className="rounded-xl" /* Optional: adds rounded corners */
                  />
                </div>
                {/* Navigation Items */}
                <nav className="flex flex-col gap-4 text-zinc-400 mt-4">
                  <p
                    onClick={() => {
                      goToToday();
                      handleMenuClick();
                    }}
                    className="hover:text-white cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" /> Today's Quote
                  </p>
                  <div
                    onClick={handleMenuClick}
                    className="hover:text-white cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-zinc-900"
                  >
                    Favorites
                  </div>

                  <div
                    onClick={handleMenuClick}
                    className="hover:text-white cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-zinc-900"
                  >
                    About
                  </div>
                  <p className="hover:text-white cursor-pointer">Favorites</p>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* The Quote Card */}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
        <CardContent className="flex flex-col gap-6 p-8 text-center">
          <div className="space-y-4">
            <p className="text-2xl font-light leading-relaxed">
              "{quotes[currentIndex].text}"
            </p>
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              — {quotes[currentIndex].author}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={prevQuote}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white border-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {/* "Today" Button indicator (only shows if not on daily quote) */}
            {currentIndex !== dailyIndex ? (
              <Button
                onClick={goToToday}
                size="icon"
                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border-none"
                title="Back to Today"
              >
                <Calendar className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border-none cursor-default"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            )}
            {/* Middle Action: COPY BUTTON */}
            <Button
              onClick={handleCopy}
              size="icon"
              className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border-none transition-all"
              title="Copy to Clipboard"
            >
              {/* Logic: Show Check if copied, otherwise show Copy icon */}
              {isCopied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={nextQuote}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white border-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
