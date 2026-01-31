"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quotes } from "@/lib/quotes";
import { useFavorites } from "@/hooks/use-favorites";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  // Helper to find the full author name based on the text
  const getQuoteObj = (text: string) => quotes.find((q) => q.text === text);

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <div className="p-2 bg-muted rounded-full hover:bg-accent transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-2xl font-serif font-bold">Your Favorites</h1>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {favorites.length === 0 ? (
          <p className="text-muted-foreground text-center mt-20">
            No favorites yet.
          </p>
        ) : (
          favorites.map((text, i) => {
            const quote = getQuoteObj(text);
            return (
              <div
                key={i}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <p className="font-serif text-lg leading-relaxed mb-4">
                  "{text}"
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">
                    {quote?.author || "Unknown"}
                  </p>
                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(text)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
