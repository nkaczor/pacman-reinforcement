import LevelState from "./LevelState";

export enum GhostBehavior {
    Attacking = 'Attacking',
    Blinking = 'Blinking',
    RunAway = 'RunAway'
}

type Task = () => void

export default class GameState{
    private _isGameOver = false;
    private _level: number = 1;
    private _score: number = 0;
    private _ghostBehavior: GhostBehavior = GhostBehavior.Attacking;
    private queue: Task[] = [];
    private timeout: any;

    private levelContainer: HTMLElement;
    private scoreContainer: HTMLElement;

    public nextLevelPending = false;
    public levelState: LevelState;

    constructor() {
        this.levelContainer = document.querySelector('.level');
        this.scoreContainer = document.querySelector('.score');
        this.updateLevelContainer();
        this.updateScoreContainer();
        this.levelState = new LevelState(this.level);
    }

    updateLevelContainer() {
        this.levelContainer.innerText = `LEVEL ${this._level}`;
    }

    updateScoreContainer() {
        this.scoreContainer.innerText = `SCORE ${this._score}`;
    }

    levelUp() {
        this._level = this._level + 3;
        this.updateLevelContainer();
    }

    get level() {
        return this._level;
    }

    set score(value: number) {
        if(this._score !== value) {
            this._score = value;
            this.updateScoreContainer();
        }
    }

    get score() {
        return this._score;
    }

    get ghostBehavior() {
        return this._ghostBehavior;
    }

    get isGameOver() {
        return this._isGameOver;
    }

    set isGameOver(value: boolean) {
        this._isGameOver = value;
    }

    addPoints(value: number) {
        this.score = this.score + value;
    }

    processToNextLevel() {
        this.levelUp();
        this.levelState.destroy();
        this.levelState = new LevelState(this.level);
        this.nextLevelPending = true;
    }
}
