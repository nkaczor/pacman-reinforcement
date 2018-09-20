import Ghost from "./Ghost";
import { GhostState } from "../../../interfaces/ghost";
import { getMaxLeft, getMaxUp, getMaxRight, getMaxDown } from "../../../utils/collisionHelpers";
import GameMap from "../../Map";
import runAwayGhost from '../../../../assets/runawayGhost.svg';
import { findRandomStartPosition, manhattanDistance } from "../../../utils/mapHelper";
import Pacman from "../Pacman";
import PathNode from "../../PathNode";


const direction = ['L', 'R', 'U', 'D'];


export default class RunAwayGhost implements GhostState{

    private ghost: Ghost;
    private cachedDest: PathNode;
    private cachedPacmanNode: PathNode;

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
            this.ghost.x -= Math.min(getMaxLeft(this.ghost, map), this.ghost.dx);
        }
        else if(this.lastDirection === 'U' && getMaxUp(this.ghost, map) > 0) {
            this.ghost.y -= Math.min(getMaxUp(this.ghost, map), this.ghost.dy);
        }
        else if(this.lastDirection === 'R' && getMaxRight(this.ghost, map) > 0) {
            this.ghost.x += Math.min(getMaxRight(this.ghost, map), this.ghost.dx);
        }
        else if(this.lastDirection === 'D' && getMaxDown(this.ghost, map) > 0) {
            this.ghost.y += Math.min(getMaxDown(this.ghost, map), this.ghost.dy);
        }
        else {
            this.lastDirection = direction[Math.floor(Math.random() * direction.length)]
            this.updatePosition(map);
        }
    }

    getDestinationNode(map: GameMap, pacman: Pacman) {
        const pacmanNode = map.pathNodes //TODO generic function for finding covered pathNode
            .find(pathNode => pathNode.idx === Math.floor(pacman.x / map.tileWidth) && pathNode.idy === Math.floor(pacman.y / map.tileHeight));

        if(pacmanNode === this.cachedPacmanNode) {
            return this.cachedDest;
        }

        while (true) {
            const {pathNode} = findRandomStartPosition(map);
            if (manhattanDistance(pathNode, pacmanNode) > 15) {
                this.cachedPacmanNode = pacmanNode;
                this.cachedDest = pathNode;
                return pathNode;
            }
        }
    }
}
