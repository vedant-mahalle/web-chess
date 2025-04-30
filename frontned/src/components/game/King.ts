import { Piece } from './Piece';

export class King extends Piece {
  getValidMoves(board: Map<string, Piece | null>): string[] {
    const [file, rank] = this.getFileAndRank();
    const moves: string[] = [];
    const deltas = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of deltas) {
      const newFile = String.fromCharCode(file.charCodeAt(0) + dx);
      const newRank = rank + dy;
      if (!this.isWithinBounds(newFile, newRank)) continue;
      const pos = Piece.getPosition(newFile, newRank);
      const target = board.get(pos);
      if (!target || target.color !== this.color) moves.push(pos);
    }

    return moves;
  }
}
