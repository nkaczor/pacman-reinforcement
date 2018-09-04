export interface KeyboardState {
    leftPressed: boolean;
    rightPressed: boolean;
    upPressed: boolean;
    downPressed: boolean;

};

export default class GameInput {
    Keyboard: KeyboardState = {
        leftPressed: false,
        rightPressed: false,
        upPressed: false,
        downPressed: false
    };

    constructor() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    private onKeyDown(ev: KeyboardEvent) {
        this.Keyboard = {
            leftPressed: ev.keyCode === 37,
            rightPressed: ev.keyCode === 39,
            upPressed: ev.keyCode === 38,
            downPressed: ev.keyCode === 40,
        }
    }

    private onKeyUp(ev: KeyboardEvent) {

    }
}
