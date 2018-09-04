import Actor from '../../Actor';
import GameMap from '../../Map';
import { findRandomStartPosition, findShortestPath } from '../../../utils/mapHelper';

import GameState, {GhostBehavior} from '../../GameState';
import AttackingGhost from './AttackingGhost';
import RunAwayGhost from './RunAwayGhost';
import PathNode from '../../PathNode';
import { getMaxUp, getMaxLeft, getMaxDown, getMaxRight } from '../../../utils/collisionHelpers';

enum Direction {Left, Right, Up, Down};

export default class Ghost extends Actor {

    static dx = 1;
    static dy = 1;

    private direction: Direction;
    private map: GameMap;
    private gameState: GameState;

    color: string;
    imgUrl: string;

    currentDestination: PathNode[];

    private ghostStates: any;

    constructor(imgUrl: string, map: GameMap, gameState: GameState) {
        super();
        this.map = map;
        this.gameState = gameState;

        const {x, y, pathNode} = findRandomStartPosition(map);
        const {pathNode: pathNode2} = findRandomStartPosition(map);
        this.currentDestination = findShortestPath(map, pathNode, pathNode2)

        this.imgUrl = imgUrl;
        this.x = x;
        this.y = y;
        this.width = this.map.tileWidth * 0.8;
        this.height = this.map.tileHeight * 0.9;

        this.ghostStates = {
            [GhostBehavior.Attacking]: new AttackingGhost(this),
            [GhostBehavior.Blinking]: new RunAwayGhost(this, true),
            [GhostBehavior.RunAway]: new RunAwayGhost(this),
        };
    }

    get pathNode(): PathNode{
        const x2 = this.x + this.width;
        const y2 = this.y + this.height;
        const idxStart = Math.floor(this.x / this.map.tileWidth);
        const idxEnd = Math.floor(x2 / this.map.tileWidth);
        const idyStart = Math.floor(this.y / this.map.tileHeight);
        const idyEnd = Math.floor(y2 / this.map.tileHeight);
        if(idxStart !== idxEnd || idyStart!==idyEnd) return null;

        return this.map.pathNodes.find(node => node.idx === idxStart && node.idy === idyEnd);
    }

    update() {
        this.updatePosition(this.map);
    }

    draw(ctx: CanvasRenderingContext2D) {
       this.ghostStates[this.gameState.ghostBehavior].draw(ctx);
    }

    updatePosition(map: GameMap) {
        const currentNode = this.pathNode;
        if(currentNode) {
            const currentIndex = this.currentDestination.indexOf(currentNode);
            if(currentIndex === this.currentDestination.length - 1) {
                return;
            }
            const nextNode = this.currentDestination[currentIndex + 1];

            if(nextNode.idx < currentNode.idx) {
                this.direction = Direction.Left
            }
            else if(nextNode.idy < currentNode.idy) {
                this.direction = Direction.Up
            }
            else if(nextNode.idx > currentNode.idx) {
                this.direction = Direction.Right
            }
            else if(nextNode.idy > currentNode.idy) {
                this.direction = Direction.Down
            }
        }

        if(this.direction === Direction.Left) {
            this.x -= Math.min(getMaxLeft(this, map), Ghost.dx);
        }
        else if(this.direction === Direction.Up) {
            this.y -= Math.min(getMaxUp(this, map), Ghost.dy);
        }
        else if(this.direction === Direction.Right) {
            this.x += Math.min(getMaxRight(this, map), Ghost.dx);
        }
        else if(this.direction === Direction.Down) {
            this.y += Math.min(getMaxDown(this, map), Ghost.dy);
        }
    }
}
