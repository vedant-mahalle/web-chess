// game/Board.ts
import { Piece } from './Piece';
import { Rook } from './Rook';
import { Knight } from './Knight';
import { Bishop } from './Bishop';
import { Queen } from './Queen';
import { King } from './King';
import { Pawn } from './Pawn';

export class Board {
  private board: Map<string, Piece | null> = new Map();
  private currentTurn: 'white' | 'black' = 'white';
  private pendingPromotion: { position: string; color: 'white' | 'black' } | null = null;

  constructor(original?: Board) {
    if (original) {
      this.board = new Map(original.board);
      this.currentTurn = original.currentTurn;
    } else {
      this.board = new Map();
      this.currentTurn = 'white';
      this.initialize();
    }
  }
  

  initialize() {
    const layout: Record<string, Piece> = {
      a1: new Rook('white', 'a1'), b1: new Knight('white', 'b1'), c1: new Bishop('white', 'c1'),
      d1: new Queen('white', 'd1'), e1: new King('white', 'e1'), f1: new Bishop('white', 'f1'),
      g1: new Knight('white', 'g1'), h1: new Rook('white', 'h1'),
      a2: new Pawn('white', 'a2'), b2: new Pawn('white', 'b2'), c2: new Pawn('white', 'c2'),
      d2: new Pawn('white', 'd2'), e2: new Pawn('white', 'e2'), f2: new Pawn('white', 'f2'),
      g2: new Pawn('white', 'g2'), h2: new Pawn('white', 'h2'),

      a8: new Rook('black', 'a8'), b8: new Knight('black', 'b8'), c8: new Bishop('black', 'c8'),
      d8: new Queen('black', 'd8'), e8: new King('black', 'e8'), f8: new Bishop('black', 'f8'),
      g8: new Knight('black', 'g8'), h8: new Rook('black', 'h8'),
      a7: new Pawn('black', 'a7'), b7: new Pawn('black', 'b7'), c7: new Pawn('black', 'c7'),
      d7: new Pawn('black', 'd7'), e7: new Pawn('black', 'e7'), f7: new Pawn('black', 'f7'),
      g7: new Pawn('black', 'g7'), h7: new Pawn('black', 'h7'),
    };

    for (let file of 'abcdefgh') {
      for (let rank = 1; rank <= 8; rank++) {
        const pos = `${file}${rank}`;
        this.board.set(pos, layout[pos] || null);
      }
    }
  }

getBoardState() {
  return this.board;
}

getCurrentTurn() {
  return this.currentTurn;
}

getPendingPromotion() {
  return this.pendingPromotion;
}

// movePiece(from: string, to: string): boolean {
//   const piece = this.board.get(from);
//   if (!piece || piece.color !== this.currentTurn) return false;

//   const validMoves = piece.getValidMoves(this.board);
//   if (!validMoves.includes(to)) return false;

//   // Promotion check
//   if (
//     piece.constructor.name === 'Pawn' &&
//     ((piece.color === 'white' && to.endsWith('8')) || (piece.color === 'black' && to.endsWith('1')))
//   ) {
//     this.pendingPromotion = { position: to, color: piece.color };
//     this.board.set(from, null);
//     return true;
//   }

//   piece.position = to;
//   this.board.set(to, piece);
//   this.board.set(from, null);
//   this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
//   return true;
// }

promotePawn(position: string, type: 'queen' | 'rook' | 'bishop' | 'knight') {
  const color = this.pendingPromotion?.color;
  if (!color) return;

  let promotedPiece;
  switch (type) {
    case 'rook': promotedPiece = new Rook(color, position); break;
    case 'bishop': promotedPiece = new Bishop(color, position); break;
    case 'knight': promotedPiece = new Knight(color, position); break;
    default: promotedPiece = new Queen(color, position); break;
  }

  this.board.set(position, promotedPiece);
  this.pendingPromotion = null;
  this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
}


  // Function to check if a king is in check
  isKingInCheck(color: 'white' | 'black'): boolean {
    const kingPosition = this.findKingPosition(color);
    if (!kingPosition) return false; // If no king found (shouldn't happen)

    // Check if any of the opponent's pieces can attack the king's position
    const opponentColor = color === 'white' ? 'black' : 'white';
    for (let [position, piece] of this.getBoardState()) {
      if (piece && piece.color === opponentColor) {
        const validMoves = piece.getValidMoves(this.getBoardState()); // Get all valid moves of the opponent's piece
        if (validMoves.includes(kingPosition)) {
          console.log('king in check');
          return true; // If the opponent's piece can reach the king's position, it's a check
        }
      }
    }

    return false; // The king is safe
  }

  // Function to find the king's position
  private findKingPosition(color: 'white' | 'black'): string | null {
    for (let [position, piece] of this.getBoardState()) {
      if (piece instanceof King && piece.color === color) {
        return position; // Return the position of the king
      }
    }
    return null; // If no king is found
  }

  // Restrict moves if the king is in check
  getValidMoves(piece: Piece): string[] {
    if (!piece) return []; // Added check to ensure piece is not null
  
    const allValidMoves = piece.getValidMoves(this.getBoardState());
  
    // If the king is in check, we need to filter the moves to only safe ones
    if (this.isKingInCheck(piece.color)) {
      // Check if the piece is the king and it's in check
      if (piece instanceof King) {
        // If the king is in check, it can only move out of check
        return this.filterMovesToEscapeCheck(piece, allValidMoves);
      }
  
      // If the piece is not the king, we need to ensure the move doesn't result in leaving the king in check
      return allValidMoves.filter(move => this.isMoveSafe(piece, move));
    }
  
    // If the king is not in check, all valid moves are allowed
    return allValidMoves;
  }

  private filterMovesToEscapeCheck(king: King, moves: string[]): string[] {
    return moves.filter(move => {
      // Temporarily simulate the move
      const tempBoard = new Board(this); // Create a temporary board to simulate the move
      tempBoard.movePiece(king.position, move);
  
      // If moving to a square doesn't leave the king in check, it's a valid escape move
      return !tempBoard.isKingInCheck(king.color);
    });
  }
  

  // Check if a move results in the king being safe
  private isMoveSafe(piece: Piece, move: string): boolean {
    if (!piece) return false; // Ensure piece is not null
  
    // Temporarily simulate the move
    const tempBoard = new Board(this); // Clone the board
    tempBoard.movePiece(piece.position, move);
  
    // If the king is not in check after the move, it's safe
    return !tempBoard.isKingInCheck(piece.color);
  }
  

  // Function to move a piece
  movePiece(from: string, to: string): boolean {
    const piece = this.getBoardState().get(from);
    if (!piece || piece.color !== this.currentTurn) return false;

    const validMoves = this.getValidMoves(piece);
    if (!validMoves.includes(to)) return false;

    // Perform the move
    piece.position = to;
    this.getBoardState().set(to, piece);
    this.getBoardState().set(from, null);

    // Switch turn after successful move
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    return true;
  }

  // Function to check for checkmate
  checkForCheckmate(color: 'white' | 'black'): boolean {
    if (this.isKingInCheck(color)) {
      const allPieces = Array.from(this.getBoardState().values()).filter(piece => piece && piece.color === color);
      for (let piece of allPieces) {
        if (!piece) continue; // Check if the piece is not null
        const validMoves = piece.getValidMoves(this.getBoardState());
        for (let move of validMoves) {
          const tempBoard = new Board(this); // Ensure the board supports cloning
          tempBoard.movePiece(piece.position, move);
          if (!tempBoard.isKingInCheck(color)) {
            return false; // If any valid move can escape check, it's not checkmate
          }
        }
      }
      return true; // If no valid move escapes check, it's checkmate
    }
    return false;
  }
}
