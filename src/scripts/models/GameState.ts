export enum GhostBehavior {
    Attacking = 'Attacking',
    Blinking = 'Blinking',
    RunAway = 'RunAway'
}

type Task = () => void

export default class GameState{
    private _isFinished = false;
    private _ghostBehavior: GhostBehavior = GhostBehavior.Attacking;
    private queue: Task[] = [];
    private timeout: any;

    get ghostBehavior() {
        return this._ghostBehavior;
    }

    get isFinished() {
        return this._isFinished;
    }

    set isFinished(value: boolean) {
        this._isFinished = value;
    }

    startAttacking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Attacking;
        })
    }

    startBlinking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Blinking;
            this.timeout = setTimeout(this.startAttacking.bind(this), 3000)
        })
    }

    startRunAway() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.RunAway;
            this.timeout = setTimeout(this.startBlinking.bind(this), 10000)
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
}
