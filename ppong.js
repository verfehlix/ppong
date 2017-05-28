let game = new Phaser.Game(800,600,Phaser.AUTO,'',{
    preload: preload,
    create: create,
    update: update
}, false, false)
// })

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
let traceEmitter

let player1WinEmitter
let player2WinEmitter

function preload() {
    game.load.image("bg","/assets/bg.png")
    game.load.image("bg_rep","/assets/bg_rep.png")

    game.load.image("square","/assets/square.png")

    game.load.image("paddle_blue","/assets/player_blue.png")
    game.load.image("paddle_pink","/assets/player_pink.png")

    game.load.image("ball","/assets/ball.png")
    game.load.image("wall","/assets/wall.png")

    game.load.image("trace","/assets/trace.png")


    game.load.image("particle1","/assets/particle1.png")
    game.load.image("particle2","/assets/particle2.png")
    game.load.image("particle3","/assets/particle3.png")

    game.load.image("particle1_blue","/assets/particle1_blue.png")
    game.load.image("particle2_blue","/assets/particle2_blue.png")
    game.load.image("particle3_blue","/assets/particle3_blue.png")
    
    game.load.image("particle1_pink","/assets/particle1_pink.png")
    game.load.image("particle2_pink","/assets/particle2_pink.png")
    game.load.image("particle3_pink","/assets/particle3_pink.png")
    
    game.load.spritesheet('line', 'assets/line.png', 16, 32, 32)
    game.load.spritesheet('line_blue', 'assets/line_blue.png', 16, 32, 32)
    game.load.spritesheet('line_pink', 'assets/line_pink.png', 16, 32, 32)

    game.load.image("mid_point","/assets/mid_point.png")


}

function create() {

    game.stage.smoothing = false; 

    // create background
    let bg = game.add.tileSprite(-100, -100, 1000, 800, "bg_rep")
    bg.alpha = 0.5

    let midLine1 = game.add.tileSprite(game.world.width / 2, game.world.height / 4, 16, 268, 'line')
    midLine1.anchor.setTo(0.5,0.5)
    midLine1.alpha = 1
    midLine1.animations.add('lineMove')
    midLine1.animations.play('lineMove', 100, true)

    let midLine2 = game.add.tileSprite(game.world.width / 2, game.world.height * 3/4, 16, 268, 'line')
    midLine2.anchor.setTo(0.5,0.5)
    midLine2.alpha = 1
    midLine2.angle = 180
    midLine2.animations.add('lineMove')
    midLine2.animations.play('lineMove', 100, true)

    let midPoint = game.add.sprite(game.world.width / 2, game.world.height / 2,"mid_point")
    midPoint.anchor.setTo(0.5,0.5)

    let leftLine = game.add.tileSprite(16, game.world.height / 2, 16, 568, 'line_blue')
    leftLine.anchor.setTo(0.5,0.5)
    leftLine.alpha = 1
    leftLine.animations.add('lineMove')
    leftLine.animations.play('lineMove', 100, true)

    let rightLine = game.add.tileSprite(784, game.world.height / 2, 16, 568, 'line_pink')
    rightLine.anchor.setTo(0.5,0.5)
    rightLine.alpha = 1
    rightLine.angle = 180
    rightLine.animations.add('lineMove')
    rightLine.animations.play('lineMove', 100, true)

    let topLine = game.add.tileSprite(game.world.width / 2, 16, 16, 768, 'line')
    topLine.anchor.setTo(0.5,0.5)
    topLine.alpha = 1
    topLine.angle = 90
    topLine.animations.add('lineMove')
    topLine.animations.play('lineMove', 100, true)

    let bottomLine = game.add.tileSprite(game.world.width / 2, 584, 16, 768, 'line')
    bottomLine.anchor.setTo(0.5,0.5)
    bottomLine.alpha = 1
    bottomLine.angle = 270
    bottomLine.animations.add('lineMove')
    bottomLine.animations.play('lineMove', 100, true)

    let squareTopLeft = game.add.sprite(16,16,"square")
    squareTopLeft.anchor.setTo(0.5,0.5)

    let squareTopRight = game.add.sprite(784,16,"square")
    squareTopRight.anchor.setTo(0.5,0.5)

    let squareBottomRight = game.add.sprite(784,584,"square")
    squareBottomRight.anchor.setTo(0.5,0.5)

    let squareBottomLeft = game.add.sprite(16,584,"square")
    squareBottomLeft.anchor.setTo(0.5,0.5)

    let squareMidTop = game.add.sprite(game.world.width / 2,16,"square")
    squareMidTop.anchor.setTo(0.5,0.5)

    let squareMideBottom = game.add.sprite(game.world.width / 2,584,"square")
    squareMideBottom.anchor.setTo(0.5,0.5)

    let squareKickoff = game.add.sprite(game.world.width / 2,game.world.height / 2,"square")
    squareKickoff.anchor.setTo(0.5,0.5)


    // winning explosion
    player1WinEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 500)
    player1WinEmitter.makeParticles(['particle1_blue','particle2_blue','particle3_blue'])
    player1WinEmitter.setScale(10, 0, 10, 0, 2000)
    player1WinEmitter.setAlpha(1, 0, 2000)
    player1WinEmitter.setXSpeed(-1000,1000)
    player1WinEmitter.setYSpeed(-1000,1000)

    player2WinEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 500)
    player2WinEmitter.makeParticles(['particle1_pink','particle2_pink','particle3_pink'])
    player2WinEmitter.setScale(10, 0, 10, 0, 2000)
    player2WinEmitter.setAlpha(1, 0, 2000)
    player2WinEmitter.setXSpeed(-1000,1000)
    player2WinEmitter.setYSpeed(-1000,1000)

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
    
    wallBounceEmitter = game.add.emitter(-1000, -1000, 500)
    wallBounceEmitter.makeParticles(['particle1','particle2','particle3'])
    wallBounceEmitter.setScale(2, 0, 2, 0, 1000)
    wallBounceEmitter.setAlpha(1, 0, 1000)
    
    player1BounceEmitter = game.add.emitter(-1000, -1000, 500)
    player1BounceEmitter.makeParticles(['particle1_blue','particle2_blue','particle3_blue'])
    player1BounceEmitter.setScale(1, 0, 1, 0, 1000)
    player1BounceEmitter.setAlpha(1, 0, 2000)
    player1BounceEmitter.setXSpeed(0,200)
    player1BounceEmitter.setYSpeed(-500,500)

    player2BounceEmitter = game.add.emitter(-1000, -1000, 500)
    player2BounceEmitter.makeParticles(['particle1_pink','particle2_pink','particle3_pink'])
    player2BounceEmitter.setScale(1, 0, 1, 0, 1000)
    player2BounceEmitter.setAlpha(1, 0, 2000)
    player2BounceEmitter.setXSpeed(-200,0)
    player2BounceEmitter.setYSpeed(-500,500)

    traceEmitter = game.add.emitter(-1000,-1000,500)
    traceEmitter.makeParticles('trace')
    traceEmitter.setScale(1, 0.5, 1, 0.5, 500)
    traceEmitter.setAlpha(0.5, 0, 500)
    traceEmitter.setXSpeed(0,0)
    traceEmitter.setYSpeed(0,0)
    traceEmitter.gravity = 0

    emitBounceParticles(wallBounceEmitter)
    emitBounceParticles(player1BounceEmitter)
    emitBounceParticles(player2BounceEmitter)

    // input handling
    game.input.onDown.add(launchBall, this)
}

function update() {
    // handle user input via mouse
    controlPaddle(paddle1, game.input.y)

    // handle second paddle movement
    // paddle2.body.velocity.setTo(0, Math.min(300,ball.body.velocity.y))
    // paddle2.body.velocity.setTo(0, ball.body.velocity.y)
    controlPaddle(paddle2, ball.y)

    // Ball Collision Detection
    
    // collision with bottom & top walls --> only shake camera and bounce
    game.physics.arcade.collide(ball, topBottomWalls, function(ball, topBottomWalls){
        game.camera.shake(0.01, 100)
        
        if(topBottomWalls.name === "top"){
            wallBounceEmitter.setXSpeed(-500,500)
            wallBounceEmitter.setYSpeed(0,200)
        } else if (topBottomWalls.name === "bottom") {
            wallBounceEmitter.setXSpeed(-500,500)            
            wallBounceEmitter.setYSpeed(-200,0)
        }

        emitBounceParticles(wallBounceEmitter)
    })

    // collision with left & right walls --> shake camera longer and reset ball
    game.physics.arcade.collide(ball, sideWalls, function(ball, sideWalls){
        launchBall()
        game.camera.shake(0.03, 1000)
        if(sideWalls.name === "left"){
            emitWinParticles(player2WinEmitter)
        } else if (sideWalls.name === "right") {
            emitWinParticles(player1WinEmitter)
        }
    })

    // shake collision with bottom & top walls --> only shake camera and bounce
    game.physics.arcade.collide(ball, paddles, function(ball, paddles){
        game.camera.shake(0.01, 100)
        
        if(paddles.name === "player1"){
            emitBounceParticles(player1BounceEmitter)
        } else if (paddles.name === "player2") {
            emitBounceParticles(player2BounceEmitter)
        }
    })

    // Ball Emitter Upadte
    wallBounceEmitter.x = ball.body.x
    wallBounceEmitter.y = ball.body.y

    player1BounceEmitter.x = ball.body.x
    player1BounceEmitter.y = ball.body.y

    player2BounceEmitter.x = ball.body.x
    player2BounceEmitter.y = ball.body.y

    traceEmitter.x = ball.body.x + 0.5 * ball.width
    traceEmitter.y = ball.body.y + 0.5 * ball.height
}

function emitBounceParticles(emitter) {
    const explode = true
    const lifeSpan = 1000
    const amount = 10

    emitter.start(explode, lifeSpan, null, amount)
}

function emitTraceParticles(emitter) {
    const explode = false
    const lifeSpan = 500
    const particlesPerFrame = 2

    emitter.start(explode, lifeSpan, particlesPerFrame)
}

function emitWinParticles(emitter) {
    const explode = true
    const lifeSpan = 2000
    const amount = 100

    emitter.start(explode, lifeSpan, null, amount)
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
    let paddle
    
    if(name === "player1") {
        paddle = group.create(x,y,"paddle_blue")
    } else if (name === "player2") {
        paddle = group.create(x,y,"paddle_pink")        
    }
        
    paddle.anchor.setTo(0.5,0.5)
    
    game.physics.arcade.enable(paddle)
    
    paddle.body.collideWorldBounds = true

    paddle.body.immovable = true
    
    paddle.name = name

    paddle.smoothed = false

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
    
    ball.anchor.setTo(0.5,0.5)
    
    game.physics.arcade.enable(ball)
    
    ball.body.bounce.setTo(1.05,1.05)

    ball.smoothed = false

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

        ball.body.velocity.x = factor1 * game.rnd.integerInRange(450, 500)
        ball.body.velocity.y = factor2 * game.rnd.integerInRange(450, 500)

        emitTraceParticles(traceEmitter)

        ballLaunched = true
    }
}