let game = new Phaser.Game(800,600,Phaser.AUTO,'ppong',null, false, false)

game.state.add("load", loadState)
game.state.add("menu", menuState)
game.state.add("play", playState)
game.state.add("win", winState)

let layerBackground
let layerGameObjects
let layerText

let paddle1
let paddle2
let ball
let topBottomWalls
let sideWalls

let ballLaunched = false
let ballVelocity = 400

let wallBounceEmitter
let player1BounceEmitter
let player2BounceEmitter
let ballTraceEmitter

let player1WinEmitter
let player2WinEmitter

let scoreBoard

let goalTextDisplay

let goalTextBackgroundBox
let goalTextPlayer1
let goalTextPlayer2

game.state.start("load")