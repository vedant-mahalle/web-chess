import { Rook } from './Rook';
import { Bishop } from './Bishop';
import { Piece } from './Piece';

export class Queen extends Piece {
  getValidMoves(board: Map<string, Piece | null>): string[] {
    const rook = new Rook(this.color, this.position);
    const bishop = new Bishop(this.color, this.position);
    return [...rook.getValidMoves(board), ...bishop.getValidMoves(board)];
  }
}