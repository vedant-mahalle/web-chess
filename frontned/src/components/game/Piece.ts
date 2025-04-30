export type Color = 'white' | 'black';

export abstract class Piece {
  constructor(
    public color: Color,
    public position: string
  ) {}

  abstract getValidMoves(board: Map<string, Piece | null>): string[];

  getImagePath(): string {
    // console.log(`../../assets/pieces/${this.color}/${this.constructor.name.toLowerCase()}.png`)
    return new URL(`../../assets/pieces/${this.color}/${this.constructor.name.toLowerCase()}.png`, import.meta.url).href;
  }

  protected getFileAndRank(): [string, number] {
    const [file, ...rank] = this.position;
    return [file, parseInt(rank.join(''))];
  }

  protected isWithinBounds(file: string, rank: number): boolean {
    return 'abcdefgh'.includes(file) && rank >= 1 && rank <= 8;
  }

  protected static getPosition(file: string, rank: number): string {
    return `${file}${rank}`;
  }
}