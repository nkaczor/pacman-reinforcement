import Tile from "./Tile";
import { randRange } from "../../utils/mathUtils";

export default class Food extends Tile {
    isFood: boolean;
    r: number = 3;

    private foodColor: string;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, null);
        this.foodColor = this.generateColor();
    }

    private generateColor() {
        const r = randRange(50, 200);
        const g = randRange(50, 200);
        const b = randRange(50, 200);

        return `rgb(${r},${g},${b})`;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.foodColor;
        ctx.fill();
        ctx.closePath();
    }
}
