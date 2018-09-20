import PathNode from "../models/PathNode";
import GameMap from "../models/Map";
import Pacman from "../models/actors/Pacman";

export interface GhostState {
    draw: (ctx: CanvasRenderingContext2D) => void;
    getDestinationNode: (map: GameMap, pacman: Pacman) => PathNode
}
