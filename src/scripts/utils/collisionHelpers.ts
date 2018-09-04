import Actor from "../models/Actor";
import GameMap from "../models/Map";
import Tile from "../models/actors/Tile";

function findCoveredTiles(actor: Actor, tiles: Tile[]) {
    return tiles.filter((tile: Tile) => {

        const horizontalValid = tile.x < actor.x && tile.x + tile.width > actor.x ||
            tile.x < actor.x + actor.width && tile.x + tile.width > actor.x + actor.width
        const verticalValid = tile.y < actor.y && tile.y + tile.height > actor.y ||
            tile.y < actor.y + actor.height && tile.y + tile.height > actor.y + actor.height

        return horizontalValid && verticalValid;
    })
}

export function isCollision(actor1: Actor, actor2: Actor) {

    const xMiddle = actor1.x + actor1.width / 2;
    const yMiddle = actor1.y + actor1.height / 2;
    const horizontalValid = xMiddle > actor2.x && xMiddle < actor2.x + actor2.width;
    const verticalValid = yMiddle > actor2.y && yMiddle < actor2.y + actor2.height;

    return horizontalValid && verticalValid;
}

export function findTilesWithCoveredMiddle(actor: Actor, tiles: Tile[]) {
    return tiles.filter((tile: Tile) => {
        const xMiddle = tile.x + tile.width / 2;
        const yMiddle = tile.y + tile.height / 2;
        const horizontalValid = xMiddle > actor.x && xMiddle < actor.x + actor.width;
        const verticalValid = yMiddle > actor.y && yMiddle < actor.y + actor.height;
        return horizontalValid && verticalValid;
    })
}

export function getMaxUp(actor: Actor, map: GameMap) : number{
    const coveredTiles = findCoveredTiles(actor, map.tiles);
    const upTiles = coveredTiles.filter(tile => tile.y === coveredTiles[0].y);
    return Math.min(...upTiles.map(tile => {
        let space = actor.y - tile.y;
        let aboveTiles = map.tiles.filter(el => el.x === tile.x && el.y < tile.y)
        for(let i = aboveTiles.length-1; i>=0; i--) {
            if(aboveTiles[i].isWall) {
                break;
            }
            space = space + aboveTiles[i].height
        }
        return space;
    }))
}

export function getMaxDown(actor: Actor, map: GameMap) : number{
    const coveredTiles = findCoveredTiles(actor, map.tiles);
    const downTiles = coveredTiles
        .filter(tile => tile.y === coveredTiles[coveredTiles.length - 1].y);
    return Math.min(...downTiles.map(tile => {
        let space = tile.y + tile.height - (actor.y + actor.height);
        let belowTiles = map.tiles.filter(el => el.x === tile.x && el.y > tile.y)
        for(let i = 0; i<belowTiles.length; i++) {
            if(belowTiles[i].isWall) {
                break;
            }
            space = space + belowTiles[i].height
        }
        return space;
    }))
}

export function getMaxLeft(actor: Actor, map: GameMap) : number{
    const coveredTiles = findCoveredTiles(actor, map.tiles);
    const leftTiles = coveredTiles.filter(tile => tile.x === coveredTiles[0].x);
    return Math.min(...leftTiles.map(tile => {
        let space = actor.x - tile.x;
        let beforeTiles = map.tiles.filter(el => el.y === tile.y && el.x < tile.x)
        for(let i = beforeTiles.length-1; i>=0; i--) {
            if(beforeTiles[i].isWall) {
                break;
            }
            space = space + beforeTiles[i].width
        }
        return space;
    }))
}

export function getMaxRight(actor: Actor, map: GameMap) : number{
    const coveredTiles = findCoveredTiles(actor, map.tiles);
    const rightTiles = coveredTiles
        .filter(tile => tile.x === coveredTiles[coveredTiles.length - 1].x);
    return Math.min(...rightTiles.map(tile => {
        let space = tile.x + tile.width - (actor.x + actor.width);
        let afterTiles = map.tiles.filter(el => el.y === tile.y && el.x > tile.x)
        for(let i = 0; i<afterTiles.length; i++) {
            if(afterTiles[i].isWall) {
                break;
            }
            space = space + afterTiles[i].width
        }
        return space;
    }))
}

