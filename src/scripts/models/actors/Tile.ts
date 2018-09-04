import Actor from "../Actor";
import PathNode from "../PathNode";

export default class Tile extends Actor {
    isWall: boolean;
    pathNode: PathNode;

    constructor(x: number, y: number, width: number, height: number, pathNode: PathNode) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pathNode = pathNode;
        this.isWall = !pathNode
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.isWall) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "#ff00ff";
            ctx.fill();
            ctx.closePath();
        }
    }
}
