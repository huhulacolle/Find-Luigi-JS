import luigipng from "../assets/luigi.png";
import Mario from "./Mario";

export class Luigi extends Mario {
  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    super(ctx, canvas);
  }

  protected initImage(): void {
    this.image.src = luigipng;
  }
}
