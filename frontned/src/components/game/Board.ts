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

  constructor() {
    this.initialize();
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

movePiece(from: string, to: string): boolean {
  const piece = this.board.get(from);
  if (!piece || piece.color !== this.currentTurn) return false;

  const validMoves = piece.getValidMoves(this.board);
  if (!validMoves.includes(to)) return false;

  // Promotion check
  if (
    piece.constructor.name === 'Pawn' &&
    ((piece.color === 'white' && to.endsWith('8')) || (piece.color === 'black' && to.endsWith('1')))
  ) {
    this.pendingPromotion = { position: to, color: piece.color };
    this.board.set(from, null);
    return true;
  }

  piece.position = to;
  this.board.set(to, piece);
  this.board.set(from, null);
  this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
  return true;
}

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
}