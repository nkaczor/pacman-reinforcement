export default abstract class Actor {
    x: number;
    y: number;
    width: number;
    height: number;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
