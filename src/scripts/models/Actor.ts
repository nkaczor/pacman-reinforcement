import PathNode from "./PathNode";
import GameMap from "./Map";

export default abstract class Actor {
    x: number;
    y: number;
    width: number;
    height: number;

    abstract draw(ctx: CanvasRenderingContext2D): void;
}
