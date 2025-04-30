import { Piece } from './Piece';

export class Bishop extends Piece {
  getValidMoves(board: Map<string, Piece | null>): string[] {
    const directions = [
      [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];
    return this.getLinearMoves(directions, board);
  }

  private getLinearMoves(dirs: number[][], board: Map<string, Piece | null>): string[] {
    const [file, rank] = this.getFileAndRank();
    const moves: string[] = [];

    for (const [dx, dy] of dirs) {
      let x = file.charCodeAt(0);
      let y = rank;
      while (true) {
        x += dx;
        y += dy;
        const newFile = String.fromCharCode(x);
        if (!this.isWithinBounds(newFile, y)) break;
        const pos = Piece.getPosition(newFile, y);
        const target = board.get(pos);
        if (!target) {
          moves.push(pos);
        } else {
          if (target.color !== this.color) moves.push(pos);
          break;
        }
      }
    }
    return moves;
  }
}
