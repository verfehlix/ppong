let game = new Phaser.Game(800,600,Phaser.AUTO,'',{
    preload: preload,
    create: create,
    update: update
})

let paddle1
let paddle2
let ball
let topBottomWalls
let sideWalls

let ballLaunched = false
let ballVelocity = 400

let ballEmitterBounce
let winEmitter

function preload() {
    game.load.image("bg","/assets/bg.png")
    game.load.image("bg_rep","/assets/bg_rep.png")
    
    game.load.image("paddle","/assets/player.png")
    game.load.image("ball","/assets/ball.png")
    game.load.image("wall","/assets/wall.png")
    
    game.load.image("particle1","/assets/particle1.png")
    game.load.image("particle2","/assets/particle2.png")
    game.load.image("particle3","/assets/particle3.png")
    
    game.load.spritesheet('line', 'assets/line.png', 16, 32, 32)


}

function create() {
    // create background
    let bg = game.add.tileSprite(-100, -100, 1000, 800, "bg_rep")
    bg.alpha = 0.5

    let divider = game.add.tileSprite(game.world.width / 2, game.world.height / 2, 10, 600, "wall")
    divider.anchor.setTo(0.5,0.5)
    divider.alpha = 0.3


    let line = game.add.tileSprite(game.world.width / 2, game.world.height / 2, 16, 600, 'line')
    line.anchor.setTo(0.5,0.5)
    line.alpha = 0.5
    line.animations.add('lineMove')
    line.animations.play('lineMove', 32, true)


    // create walls
    topBottomWalls = createCollisionGroup()
    sideWalls = createCollisionGroup()

    createWall(0,-25,topBottomWalls,800,25,"top")
    createWall(0,600,topBottomWalls,800,25,"bottom")
    
    createWall(-25,0,sideWalls,25,600,"left")
    createWall(800,0,sideWalls,25,600,"right")

    // create paddles / players
    paddles = createCollisionGroup()

    paddle1 = createPaddle(55,game.world.centerY,paddles,"player1")
    paddle2 = createPaddle(game.world.width - 55,game.world.centerY,paddles,"player2")

    // create ball
    ball = createBall(game.world.centerX, game.world.centerY)
    
    ballEmitterBounce = game.add.emitter(0, 0, 5000)
    ballEmitterBounce.makeParticles(['particle1','particle2','particle3'])
    ballEmitterBounce.setScale(2, 0, 2, 0, 1000)
    ballEmitterBounce.setAlpha(1, 0, 1000)
    ballEmitterBounce.setXSpeed(-500,500)
    ballEmitterBounce.setYSpeed(-500,500)
    
    emitBallParticles()


    winEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 5000)
    winEmitter.makeParticles(['particle1','particle2','particle3'])
    winEmitter.setScale(10, 0, 10, 0, 2000)
    winEmitter.setAlpha(1, 0, 2000)
    winEmitter.setXSpeed(-1000,1000)
    winEmitter.setYSpeed(-1000,1000)

    // input handling
    game.input.onDown.add(launchBall, this)
}

function update() {
    // handle user input via mouse
    controlPaddle(paddle1, game.input.y)

    // handle second paddle movement
    // paddle2.body.velocity.setTo(0, Math.min(300,ball.body.velocity.y))
    paddle2.body.velocity.setTo(0, ball.body.velocity.y)


    // Ball Collision Detection
    
    // collision with bottom & top walls --> only shake camera and bounce
    game.physics.arcade.collide(ball, topBottomWalls, function(ball, topBottomWalls){
        game.camera.shake(0.01, 100)
        
        if(topBottomWalls.name === "top"){
            ballEmitterBounce.setXSpeed(-200,200)
            ballEmitterBounce.setYSpeed(0,500)
        } else if (topBottomWalls.name === "bottom") {
            ballEmitterBounce.setXSpeed(-200,200)            
            ballEmitterBounce.setYSpeed(-500,0)
        }

        emitBallParticles()
    })

    // collision with left & right walls --> shake camera longer and reset ball
    game.physics.arcade.collide(ball, sideWalls, function(ball, sideWalls){
        launchBall()
        game.camera.shake(0.03, 1000)
        emitWinParticles()
    })

    // shake collision with bottom & top walls --> only shake camera and bounce
    game.physics.arcade.collide(ball, paddles, function(ball, paddles){
        game.camera.shake(0.01, 100)
        
        if(paddles.name === "player1"){
            ballEmitterBounce.setXSpeed(0,250)
            ballEmitterBounce.setYSpeed(-100,100)
        } else if (paddles.name === "player2") {
            ballEmitterBounce.setXSpeed(-250,0)            
            ballEmitterBounce.setYSpeed(-100,100)
        }

        emitBallParticles()
    })

    // Ball Emitter Upadte
    ballEmitterBounce.x = ball.body.x
    ballEmitterBounce.y = ball.body.y

}

function emitBallParticles() {
    const explode = true
    const lifeSpan = 1000
    const amount = 25

    ballEmitterBounce.start(explode, lifeSpan, null, amount)
}

function emitWinParticles() {
    const explode = true
    const lifeSpan = 2000
    const amount = 100

    winEmitter.start(explode, lifeSpan, null, amount)
}


function createCollisionGroup() {
    let group = game.add.group()
    group.enableBody = true
    group.physicsBodyType = Phaser.Physics.ARCADE
    
    return group
}

function createWall(x,y,group,width,height,name) {
    let wall = group.create(x,y,"wall")
    wall.width = width
    wall.height = height
    wall.body.immovable = true
    wall.name = name
    wall.alpha = 0
    
    return wall
}

function createPaddle(x,y, group, name) {
    let paddle = group.create(x,y,"paddle")
        
    paddle.scale.setTo(0.5,0.5)

    paddle.anchor.setTo(0.5,0.5)
    
    game.physics.arcade.enable(paddle)
    
    paddle.body.collideWorldBounds = true

    paddle.body.immovable = true
    
    paddle.name = name

    return paddle
}

function controlPaddle(paddle,y) {
    paddle.y = y
    
    if(paddle.y < paddle.height / 2){
        paddle.y = paddle.height / 2
    } else if (paddle.y > game.world.height - paddle.height / 2) {
        paddle.y = game.world.height - paddle.height / 2
    }
}

function createBall(x,y) {
    let ball = game.add.sprite(x,y,"ball")
    
    ball.scale.setTo(0.5,0.5)

    ball.anchor.setTo(0.5,0.5)
    
    game.physics.arcade.enable(ball)
    
    ball.body.bounce.setTo(1.05,1.05)

    return ball
}

function launchBall() {
    if(ballLaunched){
        ball.kill()

        ball = createBall(game.world.width / 2, game.world.height / 2)
        
        ballLaunched = false

        paddle2.y = game.world.height / 2
    } else {

        let plusMinus1 = game.rnd.integerInRange(0,1)
        let plusMinus2 = game.rnd.integerInRange(0,1)

        let factor1
        let factor2

        if(plusMinus1 === 1){
            factor1 = 1
        } else {
            factor1 = -1
        }

         if(plusMinus2 === 1){
            factor2 = 1
        } else {
            factor2 = -1
        }

        ball.body.velocity.x = factor1 * game.rnd.integerInRange(300, 400)
        ball.body.velocity.y = factor2 * game.rnd.integerInRange(300, 400)
        ballLaunched = true
    }
}