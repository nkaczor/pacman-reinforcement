import Actor from "../Actor";
import GameMap from "../Map";
import GameInput, {KeyboardState} from "../GameInput";
import {getMaxUp, getMaxDown, getMaxLeft, getMaxRight, findTilesWithCoveredMiddle} from '../../utils/collisionHelpers';
import {findRandomStartPosition} from "../../utils/mapHelper";
import PathNode from "../PathNode";

export default class Pacman extends Actor {
    static dx = 2;
    static dy = 2;

    private map: GameMap;
    x: number;
    y: number;
    size: number;
    lastValidKeyboard: KeyboardState;
    startNode: PathNode;

    constructor(map: GameMap) {
        super();
        this.map = map;
        const {x, y, pathNode} = findRandomStartPosition(map);
        this.startNode = pathNode;
        this.x = x;
        this.y = y;

        let size = Math.min(this.map.tileHeight * 0.8, this.map.tileWidth * 0.8);
        this.height = size;
        this.width = size;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const r = this.width / 2;
        ctx.arc(this.x + r, this.y + r, r, 0.2 * Math.PI, 1.8 * Math.PI);

        ctx.lineTo(this.x + r, this.y + r);
        ctx.closePath();

        ctx.fillStyle = "#FF0";
        ctx.fill();
    }

    updatePosition(keyboard: KeyboardState) {
        let dx = 0, dy = 0;
        let direction = 0;

        if(keyboard.leftPressed) {
            dx = getMaxLeft(this, this.map);
            direction = -1;
        }
        else if(keyboard.rightPressed) {
            dx = getMaxRight(this, this.map);
            direction = 1;
        }
        else if(keyboard.upPressed) {
            dy = getMaxUp(this, this.map);
            direction = -1;
        }
        else if(keyboard.downPressed) {
            dy = getMaxDown(this, this.map);
            direction = 1;
        }
        else {
            this.lastValidKeyboard = null;
        }

        if (dy <= this.map.tileHeight - this.height && dx <= this.map.tileWidth - this.width) {
            if (this.lastValidKeyboard && this.lastValidKeyboard !== keyboard) {
                this.updatePosition(this.lastValidKeyboard)
            }
        } else {
            this.x += direction * Math.min(dx, Pacman.dx);
            this.y += direction * Math.min(dy, Pacman.dy);
            this.lastValidKeyboard = keyboard;
        }
    }

    eatFood() {
        const foodToDelete = findTilesWithCoveredMiddle(this, this.map.tiles);
        this.map.eatFood(foodToDelete);
    }

    update(gameInput: GameInput) {
        this.updatePosition(gameInput.Keyboard)
        this.eatFood();
    }
}
