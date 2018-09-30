export function drawGameOverScreen(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.font = 'bold 80px Arial';

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    ctx.strokeText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#6BC63B';

    ctx.fillText('CLICK ENTER TO PLAY AGAIN', canvas.width / 2, canvas.height / 2 + 40);
    return waitForEnter();
}

export function drawNextLevelScreen(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, firstLevel?: boolean) {
    ctx.fillStyle = 'black';
    ctx.fillRect(100, 200, canvas.width - 200, canvas.height - 400);

    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;

    ctx.fillStyle = '#32790C';
    const text = firstLevel ? 'WELCOME TO PACMAN' : 'STARTING NEXT LEVEL...';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#6BC63B';
    ctx.fillText('CLICK ENTER TO PLAY', canvas.width / 2, canvas.height / 2 + 40);
    return waitForEnter();
}

function waitForEnter() : Promise<void>{
    return new Promise((resolve) => {
        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            if(ev.keyCode === 13) {
                resolve();
            }
        });
    });
}
