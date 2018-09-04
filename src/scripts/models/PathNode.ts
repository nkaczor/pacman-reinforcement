import { MapUnit } from "./Map";

export default class PathNode {
    idx: number;
    idy: number;
    neighbors: PathNode[];

    constructor(idx: number, idy: number) {
        this.idx = idx;
        this.idy = idy;
    }

    getKey(){
        return `${this.idx},${this.idy}`
    }

    findNeighbors(allNodes: PathNode[]) {
        this.neighbors = allNodes.filter(node => {
            if(node.idx === this.idx && (node.idy + 1 === this.idy || node.idy - 1 === this.idy)) {
                return true;
            }
            if(node.idy === this.idy && (node.idx + 1 === this.idx || node.idx - 1 === this.idx)) {
                return true;
            }
            return false
        })
    }

}
