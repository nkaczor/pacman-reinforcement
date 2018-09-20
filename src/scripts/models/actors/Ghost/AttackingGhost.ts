import Ghost from "./Ghost";
import { GhostState } from "../../../interfaces/ghost";
import GameMap from "../../Map";
import Pacman from "../Pacman";
import PathNode from "../../PathNode";

export default class AttackingGhost implements GhostState {
    private ghost: Ghost;
    img: HTMLImageElement = new Image();

    direction: any;
    randomDestination: PathNode;
    isHunting: boolean;

    constructor(ghost: Ghost) {
        this.ghost = ghost;
        this.img.src = ghost.imgUrl
        this.isHunting = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
       ctx.drawImage(this.img, this.ghost.x, this.ghost.y, this.ghost.width, this.ghost.height);
    }

    getPacmanNode(map: GameMap, pacman: Pacman) {
        const pacmanNode = map.pathNodes //TODO generic function for finding covered pathNode
                .find((pathNode) =>
                    pathNode.idx === Math.floor(pacman.x / map.tileWidth) && pathNode.idy === Math.floor(pacman.y / map.tileHeight)
                );

        return pacmanNode;
    }

    scheduleModeSwitch() {
        const huntingTime = 5000 + Math.floor(5000 * Math.random())
        const pauseTime = 1500 +  Math.floor(2000 * Math.random());

        setTimeout(() => {
            this.isHunting = true;
            this.randomDestination = null;
            setTimeout(() => {this.isHunting = false}, huntingTime)
        }, pauseTime);
    }

    getDestinationNode(map: GameMap, pacman: Pacman) {
        if (this.isHunting) {
            return this.getPacmanNode(map, pacman);
        }
        if (!this.randomDestination) {
            const randomIndex = Math.floor(map.pathNodes.length * Math.random());
            this.randomDestination = map.pathNodes[randomIndex];
            this.scheduleModeSwitch();
        }
        return this.randomDestination;
    }

}
