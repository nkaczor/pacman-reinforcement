import Tile from './actors/Tile';
import Food from './actors/Food';
import defaultMap from '../../assets/map.json';
import Superfood from './actors/Superfood';
import GameState from './GameState';
import PathNode from './PathNode';

export enum MapUnit {
    Wall = 1,
    Food = 0,
    SuperFood = 2
}

export default class GameMap {

    private gameState: GameState;

    rowsCount: number;
    columnsCount: number;

    tileWidth: number;
    tileHeight: number;

    pathNodes: PathNode[];
    tiles: Tile[];
    foods: Food[];
    superfoods: Superfood[];

    constructor(canvas: HTMLCanvasElement, gameState: GameState) {
        this.gameState = gameState;
        this.rowsCount = defaultMap.length;
        this.columnsCount = defaultMap[0].length;
        this.tileWidth = canvas.width / this.columnsCount;
        this.tileHeight = canvas.height / this.rowsCount;
        this.createTilesAndFields();
    }

    private createTilesAndFields() {
        this.tiles = [];
        this.foods = [];
        this.pathNodes = [];
        this.superfoods = [];
        const map = defaultMap as MapUnit[][];

        map.forEach((row, idy) => {
            row.forEach((symbol, idx) => {
                const x = idx * this.tileWidth;
                const y = idy * this.tileHeight;
                let pathNode;

                if(symbol !== MapUnit.Wall) {
                    pathNode = new PathNode(idx, idy)
                    this.pathNodes.push(pathNode)
                }

                this.tiles.push(new Tile(x, y, this.tileWidth, this.tileHeight, pathNode));

                if(symbol === MapUnit.Food) {
                    this.foods.push(new Food(x, y, this.tileWidth, this.tileHeight))
                }
                if(symbol === MapUnit.SuperFood) {
                    this.superfoods.push(new Superfood(x, y, this.tileWidth, this.tileHeight))
                }
            })
        })

        this.pathNodes.forEach(pathNode => pathNode.findNeighbors(this.pathNodes));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.tiles.forEach(tile => tile.draw(ctx));
        this.foods.forEach(food => food.draw(ctx));
        this.superfoods.forEach(superfood => superfood.draw(ctx));
    }

    eatFood(visited: Tile[]) {
        const oldFoodLength = this.foods.length;
        this.foods = this.foods.filter(food => !visited.some(el => el.x === food.x && el.y === food.y));
        this.gameState.addPoints(oldFoodLength - this.foods.length)

        if(this.superfoods.some(superfood => visited.some(el => el.x === superfood.x && el.y === superfood.y))){
            this.gameState.startRunAway();
        }
        this.superfoods = this.superfoods.filter(superfood => !visited.some(el => el.x === superfood.x && el.y === superfood.y));

    }

}
