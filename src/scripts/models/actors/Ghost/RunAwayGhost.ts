import Ghost from "./Ghost";
import { GhostState } from "../../../interfaces/ghost";
import { getMaxLeft, getMaxUp, getMaxRight, getMaxDown } from "../../../utils/collisionHelpers";
import GameMap from "../../Map";
import runAwayGhost from '../../../../assets/runawayGhost.svg';


const direction = ['L', 'R', 'U', 'D'];


export default class RunAwayGhost implements GhostState{

    private ghost: Ghost;

    img: HTMLImageElement = new Image();
    blinking: boolean;
    blink: boolean = true;
    lastDirection: any;


    constructor(ghost: Ghost, blinking: boolean = false) {
        this.ghost = ghost;
        this.blinking = blinking;
        this.img.src = runAwayGhost;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.blinking || !this.blink) {
            ctx.drawImage(this.img, this.ghost.x, this.ghost.y, this.ghost.width, this.ghost.height);
        }
        this.blink = !this.blink;
    }

    updatePosition(map: GameMap) {
        if(this.lastDirection === 'L' && getMaxLeft(this.ghost, map) > 1) {
            this.ghost.x -= Math.min(getMaxLeft(this.ghost, map), Ghost.dx);
        }
        else if(this.lastDirection === 'U' && getMaxUp(this.ghost, map) > 0) {
            this.ghost.y -= Math.min(getMaxUp(this.ghost, map), Ghost.dy);
        }
        else if(this.lastDirection === 'R' && getMaxRight(this.ghost, map) > 0) {
            this.ghost.x += Math.min(getMaxRight(this.ghost, map), Ghost.dx);
        }
        else if(this.lastDirection === 'D' && getMaxDown(this.ghost, map) > 0) {
            this.ghost.y += Math.min(getMaxDown(this.ghost, map), Ghost.dy);
        }
        else {
            this.lastDirection = direction[Math.floor(Math.random() * direction.length)]
            this.updatePosition(map);
        }
    }
}
