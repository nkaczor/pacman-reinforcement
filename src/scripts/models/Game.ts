import ActorsManager from './ActorsManager';
import GameMap from './Map';
import GameInput from './GameInput';
import GameState from './GameState';

export default class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D

    actorsManager: ActorsManager;
    map: GameMap;
    gameInput: GameInput;
    gameState: GameState;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameState = new GameState();
        this.map = new GameMap(this.canvas, this.gameState);
        this.actorsManager = new ActorsManager(this.map, this.gameState);
        this.gameInput = new GameInput();
        this.loop();
    }

    loop() {
        if(this.gameState.isFinished) {
            this.drawFinishScreen();
            return;
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
        this.gameState.executeQueue();
        this.actorsManager.update(this.gameInput);
    }

    draw() {
        this.map.draw(this.ctx);
        this.actorsManager.draw(this.ctx);
    }


    drawFinishScreen() {
        this.ctx.font = 'bold 80px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.strokeText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    }

    queue() {
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
