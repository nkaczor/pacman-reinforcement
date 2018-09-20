import Game from './models/Game';
import '../styles/index.scss';

var canvas = document.querySelector('#myCanvas') as HTMLCanvasElement;
var ctx = canvas.getContext('2d');

let game = new Game(canvas, ctx)
