export enum GhostBehavior {
    Attacking = 'Attacking',
    Blinking = 'Blinking',
    RunAway = 'RunAway'
}

type Task = () => void

export default class GameState{
    private _isFinished = false;
    private _level: number;
    private _score: number;
    private _ghostBehavior: GhostBehavior = GhostBehavior.Attacking;
    private queue: Task[] = [];
    private timeout: any;

    private levelContainer: HTMLElement;
    private scoreContainer: HTMLElement;

    constructor() {
        this.levelContainer = document.querySelector('.level');
        this.scoreContainer = document.querySelector('.score');


        this.level = 1;
        this.score = 0;

    }

    set level(value: number) {
        if(this._level !== value) {
            this._level = value;
            this.levelContainer.innerText = `LEVEL ${this._level}`;
        }
    }

    set score(value: number) {
        if(this._score !== value) {
            this._score = value;
            this.scoreContainer.innerText = `SCORE ${this._score}`;
        }
    }

    get score() {
        return this._score;
    }

    get ghostBehavior() {
        return this._ghostBehavior;
    }

    get isFinished() {
        return this._isFinished;
    }

    set isFinished(value: boolean) {
        this._isFinished = value;
    }

    addPoints(value: number) {
        this.score = this.score + value;
    }

    startAttacking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Attacking;
        })
    }

    startBlinking() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.Blinking;
            this.timeout = setTimeout(this.startAttacking.bind(this), 2000)
        })
    }

    startRunAway() {
        this.addToQueue(() => {
            this._ghostBehavior = GhostBehavior.RunAway;
            this.timeout = setTimeout(this.startBlinking.bind(this), 8000)
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
