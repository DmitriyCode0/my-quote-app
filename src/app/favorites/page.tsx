"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { quotes } from "@/lib/quotes";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Helper to find the full author name based on the text
  const getQuoteObj = (text: string) => quotes.find((q) => q.text === text);

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-2xl font-serif font-bold">Your Favorites</h1>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {favorites.length === 0 ? (
          <p className="text-zinc-500 text-center mt-20">No favorites yet.</p>
        ) : (
          favorites.map((text, i) => {
            const quote = getQuoteObj(text);
            return (
              <div
                key={i}
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
              >
                <p className="font-serif text-lg leading-relaxed mb-4">
                  "{text}"
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">
                    {quote?.author || "Unknown"}
                  </p>
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
