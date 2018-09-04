import Tile from "./Tile";

export default class Food extends Tile {
    isFood: boolean;
    r: number = 3;
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, null);

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}
