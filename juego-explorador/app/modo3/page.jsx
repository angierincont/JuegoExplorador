"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Modo3() {
  const [blocks, setBlocks] = useState([]);
  const router = useRouter();

  const handleAddBlock = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBlocks([...blocks, { x, y }]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-yellow-500 text-white relative p-4">
      {/* 🔙 Botón para volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition text-white text-2xl"
        aria-label="Volver al inicio"
      >
        ←
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Modo 3: Creativo
      </h1>
      <p className="mb-4 text-center">Haz clic para colocar bloques 🧱</p>
      
      <div
        onClick={handleAddBlock}
        className="relative w-[90vw] max-w-[400px] h-[90vw] max-h-[400px] bg-white rounded-lg overflow-hidden border-4 border-green-400"
      >
        {blocks.map((b, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 w-6 h-6 rounded"
            style={{ top: b.y, left: b.x }}
          ></div>
        ))}
      </div>
    </main>
  );
}
