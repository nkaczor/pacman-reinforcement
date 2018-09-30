import ActorsManager from './ActorsManager';
import GameMap from './Map';
import GameInput from './GameInput';
import GameState from './GameState';
import { drawGameOverScreen, drawNextLevelScreen } from '../utils/specialScreens';

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    isGameStarted: boolean;
    actorsManager: ActorsManager;
    map: GameMap;
    gameInput: GameInput;
    gameState: GameState;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.startGame();
    }

    startGame() {
        this.gameState = new GameState();
        this.map = new GameMap(this.canvas, this.gameState);
        this.actorsManager = new ActorsManager(this.map, this.gameState);
        this.gameInput = new GameInput();
        this.clear();
        this.loop();
    }

    async loop() {
        if (this.gameState.isGameOver) {
            await drawGameOverScreen(this.ctx, this.canvas);
            this.startGame();
            return;
        }
        if (!this.isGameStarted) {
            await drawNextLevelScreen(this.ctx, this.canvas, true);
            this.isGameStarted = true;
        }
        if (this.gameState.nextLevelPending) {
            this.map = new GameMap(this.canvas, this.gameState);
            this.actorsManager = new ActorsManager(this.map, this.gameState);
            await drawNextLevelScreen(this.ctx, this.canvas);
            this.gameState.nextLevelPending = false;
        }
        this.clear();
        this.update();
        this.draw();
        this.queue();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        this.gameState.levelState.executeQueue();
        this.actorsManager.update(this.gameInput);
    }

    draw() {
        this.map.draw(this.ctx);
        this.actorsManager.draw(this.ctx);
    }

    queue() {
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
