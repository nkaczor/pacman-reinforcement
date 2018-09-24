export enum GhostBehavior {
    Attacking = 'Attacking',
    Blinking = 'Blinking',
    RunAway = 'RunAway'
}

type Task = () => void

export default class LevelState {

    private _ghostBehavior: GhostBehavior = GhostBehavior.Attacking;
    private queue: Task[] = [];
    private timeout: any;
    private level: number;

    constructor(level: number) {
        this.level = level;
    }

    get ghostBehavior() {
        return this._ghostBehavior;
    }

    startAttacking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Attacking;
        })
    }

    startBlinking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Blinking;
            this.timeout = setTimeout(this.startAttacking.bind(this), Math.max(0, 2100 - this.level * 100))
        })
    }

    startRunAway() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.RunAway;
            this.timeout = setTimeout(this.startBlinking.bind(this), Math.max(8300 - this.level * 300, 0))
        })
    }

    private addToQueue(task: Task) {
        this.queue.push(task)
    }

    executeQueue()
    {
        this.queue.forEach((task: Task) => task());
        this.queue = [];
    }

    destroy() {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.queue = [];
    }
}
