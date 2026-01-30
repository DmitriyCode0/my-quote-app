"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { quotes } from "@/lib/quotes";

export default function Home() {
  // 2. THE LOGIC (State)
  // We start at index 0 (the first quote)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next quote
  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  // Function to go to the previous quote
  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-white">
      {/* Top Bar with Menu */}
      <div className="absolute top-4 left-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-zinc-900 border-zinc-800 text-white"
          >
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
              </div>
              <p>Home</p>
              <p>Favorites</p>
              <p>Settings</p>
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
