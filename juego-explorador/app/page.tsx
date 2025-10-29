"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-pink-500 text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">🌟 Juego Explorador 🌟</h1>
          <p className="text-lg md:text-xl">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-green-500 text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">🌍 Juego Explorador</h1>
      <p className="mb-6 md:mb-10 text-base md:text-lg text-center">Elige un modo de juego:</p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl items-center justify-center">
        <Link
          href="/modo1"
          className="w-full sm:w-auto bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 text-center"
        >
          Modo 1 - Explorador Libre
        </Link>
        <Link
          href="/modo2"
          className="w-full sm:w-auto bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 text-center"
        >
          Modo 2 - Obstáculos
        </Link>
        <Link
          href="/modo3"
          className="w-full sm:w-auto bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 text-center"
        >
          Modo 3 - Creativo
        </Link>
      </div>
    </main>
  );
}
