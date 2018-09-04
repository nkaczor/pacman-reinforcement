import Actor from "./Actor";
import Pacman from "./actors/Pacman";
import GameMap from "./Map";
import GameInput from "./GameInput";
import GameState, { GhostBehavior } from "./GameState";
import Ghost from "./actors/Ghost/Ghost";

import ghost1 from '../../assets/1.svg';
import ghost2 from '../../assets/2.svg';
import ghost3 from '../../assets/3.svg';
import ghost4 from '../../assets/4.svg';
import { isCollision } from "../utils/collisionHelpers";

export default class ActorsManager {
    gameState: GameState;
    pacman: Pacman;
    ghosts: Ghost[];

    constructor(map: GameMap, gameState: GameState) {
        this.gameState = gameState;
        this.pacman = new Pacman(map);
        this.ghosts = [ghost1, ghost2, ghost3, ghost4]
            .map((imgUrl) => new Ghost(imgUrl, map, gameState));

    }

    update(gameInput: GameInput) {
        this.pacman.update(gameInput);
        this.ghosts.forEach(ghost => ghost.update());
        this.detectCollisions();
    }

    draw(ctx: CanvasRenderingContext2D) {
        let actors = [this.pacman, ...this.ghosts]

        actors.forEach(actor => actor.draw(ctx))
    }

    onCollapse(collapsedGhosts: Ghost[]) {
        if(this.gameState.ghostBehavior === GhostBehavior.Attacking) {
            this.gameState.isFinished = true;
        }
        else {
            console.log('mordu')
            this.ghosts = this.ghosts.filter(ghost => collapsedGhosts.every(collapsedGhost => collapsedGhost !== ghost))
        }
    }

    detectCollisions() {
        const collapsedGhosts = this.ghosts.filter((ghost: Ghost) => isCollision(this.pacman, ghost));
        if(collapsedGhosts.length > 0) {
            this.onCollapse(collapsedGhosts)
        }
    }
}
