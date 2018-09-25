import Actor from '../../Actor';
import GameMap from '../../Map';
import { findRandomStartPosition, findShortestPath } from '../../../utils/mapHelper';

import GameState, {GhostBehavior} from '../../GameState';
import AttackingGhost from './AttackingGhost';
import RunAwayGhost from './RunAwayGhost';
import PathNode from '../../PathNode';
import { getMaxUp, getMaxLeft, getMaxDown, getMaxRight } from '../../../utils/collisionHelpers';
import Pacman from '../Pacman';
import { GhostType, ghostConfig } from '../../../configs/ghosts';

enum Direction {Left, Right, Up, Down};

export default class Ghost extends Actor {

    dx: number;
    dy: number;
    imgUrl: string;

    currentDestination: PathNode[];

    public gameState: GameState;
    protected map: GameMap;
    private ghostStates: any;
    private direction: Direction;
    private pacman: Pacman; //how could be done better?

    constructor(ghostType: GhostType, map: GameMap, gameState: GameState, pacman: Pacman) {
        super();
        this.map = map;
        this.gameState = gameState;
        this.pacman = pacman;

        const {x, y} = findRandomStartPosition(map);

        this.x = x + this.map.tileWidth * 0.1;
        this.y = y + + this.map.tileHeight * 0.05;
        this.width = this.map.tileWidth * 0.8;
        this.height = this.map.tileHeight * 0.9;

        this.retrieveConfig(ghostType);

        this.ghostStates = {
            [GhostBehavior.Attacking]: new AttackingGhost(this),
            [GhostBehavior.Blinking]: new RunAwayGhost(this, true),
            [GhostBehavior.RunAway]: new RunAwayGhost(this),
        };
    }

    retrieveConfig(ghostType: GhostType) {
        const {speed, imgUrl} = ghostConfig[ghostType];
        this.imgUrl = imgUrl;
        const levelAddition = this.gameState.level * 0.05;
        this.dx = speed + levelAddition;
        this.dy = speed + levelAddition;
    }

    update() {
        this.updatePosition();
    }

    draw(ctx: CanvasRenderingContext2D) {
       this.ghostStates[this.gameState.levelState.ghostBehavior].draw(ctx);
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

    updatePosition() {
        const currentNode = this.pathNode;
        if(currentNode) {
            const destinationNode = this.ghostStates[this.gameState.levelState.ghostBehavior].getDestinationNode(this.map, this.pacman);
            this.currentDestination = findShortestPath(this.map, currentNode, destinationNode)
            if(!this.currentDestination || !this.currentDestination.length) {
                return;
            }
            const currentIndex = this.currentDestination.indexOf(currentNode);
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
            this.x -= Math.min(getMaxLeft(this, this.map), this.dx);
        }
        else if(this.direction === Direction.Up) {
            this.y -= Math.min(getMaxUp(this, this.map), this.dy);
        }
        else if(this.direction === Direction.Right) {
            this.x += Math.min(getMaxRight(this, this.map), this.dx);
        }
        else if(this.direction === Direction.Down) {
            this.y += Math.min(getMaxDown(this, this.map), this.dy);
        }
    }
}
