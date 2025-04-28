import { useState, useEffect } from 'react';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

// Piece setup: [color]_[piece-name]
const initialPosition: Record<string, string> = {
  a8: 'black_rook', b8: 'black_knight', c8: 'black_bishop', d8: 'black_queen',
  e8: 'black_king', f8: 'black_bishop', g8: 'black_knight', h8: 'black_rook',
  a7: 'black_pawn', b7: 'black_pawn', c7: 'black_pawn', d7: 'black_pawn',
  e7: 'black_pawn', f7: 'black_pawn', g7: 'black_pawn', h7: 'black_pawn',
  
  a2: 'white_pawn', b2: 'white_pawn', c2: 'white_pawn', d2: 'white_pawn',
  e2: 'white_pawn', f2: 'white_pawn', g2: 'white_pawn', h2: 'white_pawn',
  a1: 'white_rook', b1: 'white_knight', c1: 'white_bishop', d1: 'white_queen',
  e1: 'white_king', f1: 'white_bishop', g1: 'white_knight', h1: 'white_rook'
};

const getPieceSrc = (piece: string) => {
  const [color, name] = piece.split('_').map(part => part.trim());
  // Dynamically construct the image path
  return new URL(`../../assets/pieces/${color}/${name}.png`, import.meta.url).href;
};

export default function ChessBoard() {
  const boardSize = 800; // Maximum board size
  const squareSize = boardSize / 8; // Each square size

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen">
      <div
        className="grid grid-cols-8"
        style={{
          width: boardSize,
          height: boardSize,
          border: '8px solid #4a3728',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {ranks.map(rank =>
          files.map(file => {
            const square = `${file}${rank}`;
            const piece = initialPosition[square]; // Find if piece exists

            const isLightSquare = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            return (
              <div
                key={square}
                className={`flex items-center justify-center transition-colors duration-300 ease-in-out cursor-pointer hover:brightness-110 ${
                  isLightSquare ? "bg-[#f0d9b5]" : "bg-[#b58863]"
                }`}
                style={{
                  width: squareSize,
                  height: squareSize,
                }}
              >
                {piece && (
                  <img
                    src={getPieceSrc(piece)} // Dynamically loaded image
                    alt={piece}
                    className="object-contain select-none pointer-events-none"
                    style={{
                      width: squareSize * 0.8, // Image takes up 80% of the square
                      height: squareSize * 0.8, // Image takes up 80% of the square
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
