"use client";
import * as React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Share2,
  Calendar,
  Copy,
  Check,
  Heart,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { quotes } from "@/lib/quotes";
import { useFavorites } from "@/hooks/use-favorites";

export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Home() {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const dailyIndex = daysSinceEpoch % quotes.length;
  const [currentIndex, setCurrentIndex] = useState(dailyIndex);

  const [isCopied, setIsCopied] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isLiked = favorites.includes(quotes[currentIndex].text);

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleCopy = () => {
    const textToCopy = `"${quotes[currentIndex].text}" — ${quotes[currentIndex].author}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      {/* Top Bar with Menu */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        {" "}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-background border-border text-foreground flex flex-col items-center text-center"
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
                    className="rounded-xl"
                  />
                </div>
                {/* Navigation Items */}
                <nav className="flex flex-col gap-4 text-muted-foreground mt-4">
                  <p
                    onClick={() => {
                      goToToday();
                      handleMenuClick();
                    }}
                    className="hover:text-foreground cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" /> Today's Quote
                  </p>
                  <Link href="/favorites" onClick={() => setIsMenuOpen(false)}>
                    <div className="hover:text-foreground cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-accent flex items-center gap-3">
                      <Heart className="h-5 w-5" />
                      <span>Favorites</span>
                    </div>
                  </Link>

                  <div
                    onClick={handleMenuClick}
                    className="hover:text-foreground cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-accent"
                  >
                    About
                  </div>
                  <p className="hover:text-foreground cursor-pointer">
                    Favorites
                  </p>
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>

      {/* The Quote Card */}
      <Card className="w-full max-w-md border-border bg-card text-card-foreground shadow-xl">
        {" "}
        <CardContent className="flex flex-col gap-6 p-8 text-center">
          <div className="space-y-4">
            <p className="text-2xl font-light leading-relaxed">
              "{quotes[currentIndex].text}"
            </p>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              {" "}
              — {quotes[currentIndex].author}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={prevQuote}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Middle Action: FAVORITE BUTTON */}
            <Button
              onClick={() => toggleFavorite(quotes[currentIndex].text)}
              size="icon"
              className="h-12 w-12 rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground border transition-all"
            >
              <Heart
                className={`h-6 w-6 transition-all ${isLiked ? "fill-red-500 text-red-500" : "text-foreground"}`}
              />
            </Button>

            {/* Middle Action: COPY BUTTON */}
            <Button
              onClick={handleCopy}
              size="icon"
              className="h-12 w-12 rounded-full border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground border transition-all"
              title="Copy to Clipboard"
            >
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
              className="h-12 w-12 rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
