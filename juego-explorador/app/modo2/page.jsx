"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modo2() {
  const [player, setPlayer] = useState({ x: 180, y: 350 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const gameRef = useRef(null);
  const router = useRouter();

  // Mueve al jugador con teclas
  const handleKeyDown = (e) => {
    if (gameOver || win) return;
    const move = 20;
    setPlayer((prev) => {
      switch (e.key) {
        case "ArrowUp":
          return { ...prev, y: Math.max(prev.y - move, 0) };
        case "ArrowDown":
          return { ...prev, y: Math.min(prev.y + move, 350) };
        case "ArrowLeft":
          return { ...prev, x: Math.max(prev.x - move, 0) };
        case "ArrowRight":
          return { ...prev, x: Math.min(prev.x + move, 350) };
        default:
          return prev;
      }
    });
  };

  // Mueve al jugador con touch
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left - 25;
    const y = touch.clientY - rect.top - 25;
    setPlayer({ x, y });
  };

  // Focus para capturar teclado
  useEffect(() => {
    if (gameRef.current) gameRef.current.focus();
  }, []);

  // Generar obstáculos
  useEffect(() => {
    if (gameOver || win) return;
    const interval = setInterval(() => {
      const newObstacle = {
        x: Math.random() * 360,
        y: -20,
        id: Date.now(),
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, win]);

  // Mover obstáculos
  useEffect(() => {
    if (gameOver || win) return;
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((o) => ({ ...o, y: o.y + 10 }))
          .filter((o) => o.y < 400)
      );
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver, win]);

  // Detectar colisiones
  useEffect(() => {
    obstacles.forEach((o) => {
      const dx = o.x - player.x;
      const dy = o.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 30) {
        setLives((prev) => prev - 1);
        setObstacles((prev) => prev.filter((obs) => obs.id !== o.id));
      }
    });
  }, [obstacles, player]);

  // Verificar vidas
  useEffect(() => {
    if (lives <= 0) setGameOver(true);
  }, [lives]);

  // Aumentar puntuación
  useEffect(() => {
    if (gameOver || win) return;
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 50) {
          setWin(true);
          clearInterval(interval);
        }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [gameOver, win]);

  const resetGame = () => {
    setPlayer({ x: 180, y: 350 });
    setObstacles([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWin(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white relative">
      {/* 🔙 Flecha para volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition text-white text-2xl"
        aria-label="Volver al inicio"
      >
        ←
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Modo 2: Carrera de Obstáculos
      </h1>
      <p className="mb-4 text-base md:text-lg text-center">
        Esquiva los obstáculos y sobrevive 🎮
      </p>

      <div
        ref={gameRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchMove={(e) => {
          e.preventDefault(); // ❌ Evita que el scroll de la pantalla se mueva
          handleTouchMove(e);
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - 25;
          const y = e.clientY - rect.top - 25;
          setPlayer({ x, y });
        }}
        className="relative w-[90vw] max-w-[400px] h-[90vw] max-h-[400px] bg-white rounded-lg overflow-hidden border-4 border-purple-400"
      >
        {/* Jugador */}
        <div
          className="absolute bg-blue-600 w-10 h-10 rounded-full transition-all"
          style={{
            left: player.x,
            top: player.y,
            transition: "0.1s",
          }}
        ></div>

        {/* Obstáculos */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute bg-red-500 w-8 h-8 rounded-md"
            style={{
              left: o.x,
              top: o.y,
            }}
          ></div>
        ))}

        {/* Mensajes */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-2xl">
            <p>💀 Game Over</p>
            <button
              onClick={resetGame}
              className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-lg"
            >
              Reiniciar
            </button>
          </div>
        )}
        {win && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-2xl">
            <p>🏆 ¡Ganaste!</p>
            <button
              onClick={resetGame}
              className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-lg"
            >
              Jugar otra vez
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-6 text-sm md:text-lg font-semibold">
        <p>❤️ Vidas: {lives}</p>
        <p>⭐ Puntos: {score}</p>
      </div>
    </main>
  );
}
