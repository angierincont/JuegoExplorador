"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modo1() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const router = useRouter();

  // Teclado
  const handleKeyDown = (e) => {
    setPos((prev) => {
      const move = 10;
      switch (e.key) {
        case "ArrowUp":
          return { ...prev, y: Math.max(prev.y - move, 0) };
        case "ArrowDown":
          return { ...prev, y: Math.min(prev.y + move, 90) };
        case "ArrowLeft":
          return { ...prev, x: Math.max(prev.x - move, 0) };
        case "ArrowRight":
          return { ...prev, x: Math.min(prev.x + move, 90) };
        default:
          return prev;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch
  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    // Calcula posición en porcentaje dentro del contenedor
    const xPercent = Math.min(Math.max(((touch.clientX - rect.left) / rect.width) * 100, 0), 90);
    const yPercent = Math.min(Math.max(((touch.clientY - rect.top) / rect.height) * 100, 0), 90);

    setPos({ x: xPercent, y: yPercent });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-sky-500 text-white relative p-4">
      {/* 🔙 Botón para volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition text-white text-2xl"
        aria-label="Volver al inicio"
      >
        ←
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Modo 1: Explorador Libre
      </h1>

      <div
        ref={containerRef}
        onTouchMove={handleTouchMove}
        className="relative w-[90vw] max-w-[400px] h-[90vw] max-h-[400px] bg-white rounded-lg overflow-hidden border-4 border-blue-400"
      >
        <div
          className="absolute bg-green-500 rounded-full w-10 h-10"
          style={{
            top: `${pos.y}%`,
            left: `${pos.x}%`,
            transition: "0.1s",
          }}
        ></div>
      </div>

      <p className="mt-4 text-center text-base md:text-lg">
        Usa las flechas del teclado o mueve el dedo 🕹️
      </p>
    </main>
  );
}
