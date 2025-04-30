import { Piece } from './Piece';

export class Pawn extends Piece {
  getValidMoves(board: Map<string, Piece | null>): string[] {
    const [file, rank] = this.getFileAndRank();
    const dir = this.color === 'white' ? 1 : -1;
    const startRank = this.color === 'white' ? 2 : 7;
    const moves: string[] = [];

    const forwardOne = Piece.getPosition(file, rank + dir);
    if (!board.get(forwardOne)) moves.push(forwardOne);

    const forwardTwo = Piece.getPosition(file, rank + 2 * dir);
    if (rank === startRank && !board.get(forwardOne) && !board.get(forwardTwo)) {
      moves.push(forwardTwo);
    }

    const fileOffsets = [-1, 1];
    for (const offset of fileOffsets) {
      const newFile = String.fromCharCode(file.charCodeAt(0) + offset);
      const newPos = Piece.getPosition(newFile, rank + dir);
      const target = board.get(newPos);
      if (target && target.color !== this.color) moves.push(newPos);
    }

    return moves;
  }
}