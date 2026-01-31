"use client";
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from memory
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Toggle Logic
  const toggleFavorite = (text: string) => {
    let newFavorites;
    if (favorites.includes(text)) {
      newFavorites = favorites.filter((t) => t !== text);
    } else {
      newFavorites = [...favorites, text];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return { favorites, toggleFavorite };
}
