import Ghost from "./Ghost";
import { GhostState } from "../../../interfaces/ghost";

export default class AttackingGhost implements GhostState {
    private ghost: Ghost;
    img: HTMLImageElement = new Image();

    direction: any;

    constructor(ghost: Ghost) {
        this.ghost = ghost;
        this.img.src = ghost.imgUrl
    }

    draw(ctx: CanvasRenderingContext2D) {
       ctx.drawImage(this.img, this.ghost.x, this.ghost.y, this.ghost.width, this.ghost.height);
    }

}
