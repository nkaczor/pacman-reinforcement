import GameMap from '../models/Map';
import Tile from '../models/actors/Tile';
import PathNode from '../models/PathNode';

export function findRandomStartPosition(map: GameMap) : {x: number, y: number, pathNode: PathNode}{
    const availableTiles = map.tiles.filter((tile: Tile) => !tile.isWall);
    const randomField = availableTiles[Math.floor(Math.random( )* availableTiles.length)]
    return {x: randomField.x, y: randomField.y, pathNode: randomField.pathNode};
}

function getKey(el: PathNode) {
    return `${el.idx},${el.idy}`;
}

type AStarObject = {el: PathNode, parent: AStarObject, distance: number};

export function findShortestPath(map: GameMap, start: PathNode, end: PathNode): PathNode[] {
    const closed: {[key: string]: AStarObject} = {};
    const opened: AStarObject[] = [{el: start, distance: 0, parent: null}];
    let elObject: AStarObject;
    do {
        opened.sort(({el: el1, distance: dis1}, {el: el2, distance: dis2}) => manhatanDistance(el1, end) + dis1 - manhatanDistance(el2, end) - dis2);
        elObject = opened.shift();
        const {el, distance} = elObject;
        closed[el.getKey()] = elObject;
        const unvisitedNeighbors = el.neighbors
            .filter(node => !closed[node.getKey()])
            .map(node => ({el: node, parent: elObject, distance: distance + 1}));
        opened.push(...unvisitedNeighbors);


    } while(opened.length && elObject.el !== end)

    if(elObject.el !== end) return null;

    const path = [elObject.el];
    let current = elObject;
    do {
        current = current.parent;
        path.unshift(current.el);
    } while(current.el !== start)
    console.log(path);
    return path;
}

function manhatanDistance(firstNode: PathNode, secondNode: PathNode) {
    return Math.abs(firstNode.idx - secondNode.idx) + Math.abs(firstNode.idy - secondNode.idy);
}
