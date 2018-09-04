import Game from './models/Game';

var canvas = document.querySelector('#myCanvas') as HTMLCanvasElement;
var ctx = canvas.getContext('2d');

let game = new Game(canvas, ctx)
