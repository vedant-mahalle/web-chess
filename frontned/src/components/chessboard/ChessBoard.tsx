import { useState } from 'react';
import { Board } from '../game/Board';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

export default function ChessBoard() {
  const [board] = useState(new Board());
  const [refresh, setRefresh] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [promotionSquare, setPromotionSquare] = useState<string | null>(null);
  const [promotionColor, setPromotionColor] = useState<'white' | 'black' | null>(null);

  const boardState = board.getBoardState();

  const handleSquareClick = (square: string) => {
    const piece = boardState.get(square);
    const currentTurn = board.getCurrentTurn();

    // Attempt to move if a square is selected
    if (selectedSquare && validMoves.includes(square)) {
      const moved = board.movePiece(selectedSquare, square);
      const promotion = board.getPendingPromotion();

      if (promotion) {
        setPromotionSquare(promotion.position);
        setPromotionColor(promotion.color);
      } else if (moved) {
        setRefresh(r => r + 1); // refresh after move
      }

      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    // Select square if it's player's turn
    if (piece && piece.color === currentTurn) {
      setSelectedSquare(square);
      setValidMoves(piece.getValidMoves(boardState));
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const handlePromote = (type: 'queen' | 'rook' | 'bishop' | 'knight') => {
    if (!promotionSquare || !promotionColor) return;
    board.promotePawn(promotionSquare, type);
    setPromotionSquare(null);
    setPromotionColor(null);
    setRefresh(r => r + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen">
      <div
        className="grid grid-cols-8"
        style={{
          width: 800,
          height: 800,
          border: '8px solid #4a3728',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {ranks.map(rank =>
          files.map(file => {
            const square = `${file}${rank}`;
            const piece = boardState.get(square);
            const isLightSquare = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            const isHighlighted = validMoves.includes(square);
            const isSelected = square === selectedSquare;

            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                className={`flex items-center justify-center cursor-pointer relative transition duration-150 ease-in-out
                  ${isLightSquare ? "bg-[#f0d9b5]" : "bg-[#b58863]"}
                  ${isHighlighted ? "ring-4 ring-yellow-400" : ""}
                  ${isSelected ? "ring-4 ring-blue-500" : ""}
                `}
                style={{ width: 100, height: 100, border: '1px solid #4a3728' }}
              >
                {piece && (
                  <img
                    src={piece.getImagePath()}
                    alt={`${piece.color} ${piece.constructor.name}`}
                    className="object-contain pointer-events-none"
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* PROMOTION CHOICE MODAL */}
      {promotionSquare && promotionColor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Choose a piece to promote to:</h2>
            <div className="grid grid-cols-4 gap-4">
              {['queen', 'rook', 'bishop', 'knight'].map(type => (
                <img
                  key={type}
                  src={`/assets/pieces/${promotionColor}/${type}.png`}
                  alt={type}
                  className="w-16 h-16 cursor-pointer hover:scale-110 transition"
                  onClick={() => handlePromote(type as any)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
