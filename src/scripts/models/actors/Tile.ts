import Actor from "../Actor";
import PathNode from "../PathNode";
import { randRange } from "../../utils/mathUtils";


export default class Tile extends Actor {
    isWall: boolean;
    pathNode: PathNode;

    private wallColor: string;

    constructor(x: number, y: number, width: number, height: number, pathNode: PathNode) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pathNode = pathNode;
        this.isWall = !pathNode

        this.wallColor = this.isWall && this.generateWallColor();
    }

    private generateWallColor() : string {
        const r = randRange(180, 256);
        const g = randRange(0, 80);
        const b = randRange(180, 256);

        return `rgb(${r},${g},${b})`;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.isWall) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.wallColor;
            ctx.fill();
            ctx.closePath();
        }
    }
}
