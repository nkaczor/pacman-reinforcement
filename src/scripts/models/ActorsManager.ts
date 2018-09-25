import Pacman from './actors/Pacman';
import GameMap from './Map';
import GameInput from './GameInput';
import GameState, { GhostBehavior } from './GameState';
import Ghost from './actors/Ghost/Ghost';
import {GhostType} from '../configs/ghosts'

import { isCollision } from "../utils/collisionHelpers";

export default class ActorsManager {
    gameState: GameState;
    pacman: Pacman;
    ghosts: Ghost[];

    constructor(map: GameMap, gameState: GameState) {
        this.gameState = gameState;
        this.pacman = new Pacman(map);
        this.ghosts = [GhostType.red, GhostType.blue, GhostType.green, GhostType.pink]
            .map((ghostType) => new Ghost(ghostType, map, gameState, this.pacman));
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
        if(this.gameState.levelState.ghostBehavior === GhostBehavior.Attacking) {
            this.gameState.isGameOver = true;
        }
        else {
            const oldGhostNumber = this.ghosts.length;
            this.ghosts = this.ghosts.filter(ghost => collapsedGhosts.every(collapsedGhost => collapsedGhost !== ghost));
            this.gameState.addPoints((oldGhostNumber - this.ghosts.length) * 30);
            if(!this.ghosts.length) {
                this.gameState.processToNextLevel();
            }
        }
    }

    detectCollisions() {
        const collapsedGhosts = this.ghosts.filter((ghost: Ghost) => isCollision(this.pacman, ghost));
        if(collapsedGhosts.length > 0) {
            this.onCollapse(collapsedGhosts)
        }
    }
}
