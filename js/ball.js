class Ball extends Phaser.Sprite {
    
    constructor(game, x, y){
        // creating the phaser sprite object
        super()
        Phaser.Sprite.call(this, game, x, y, "ball")
        this.anchor.setTo(0.5,0.5)

        // set the physics properties
        game.physics.arcade.enable(this)
        this.body.bounce.setTo(1.05,1.05)

        // set custom properties
        this.isLaunched = false

        // create particle emitters for the ball
        this.wallBounceEmitter = new BounceEmitter(game, layerGameObjects, ['particle1_green','particle2_green','particle3_green'])
        this.player1BounceEmitter  = new BounceEmitter(game, layerGameObjects, ['particle1_blue','particle2_blue','particle3_blue'])
        this.player2BounceEmitter  = new BounceEmitter(game, layerGameObjects, ['particle1_pink','particle2_pink','particle3_pink'])
        this.ballTraceEmitter = new TraceEmitter(game, layerGameObjects, 'trace', 0.5)

        // add it to the game
        game.add.existing(this)
    }

    update() {
        // Update Ball Emitter Positions
        this.wallBounceEmitter.updatePosition(this.x,this.y)
        this.player1BounceEmitter.updatePosition(this.x,this.y)
        this.player2BounceEmitter.updatePosition(this.x,this.y)
        this.ballTraceEmitter.updatePosition(this.x,this.y) 
    }

    handleWallCollision(wallName) {
        game.camera.shake(0.01, 100)
        this.wallBounceEmitter.updateFireDirection(wallName)
        this.wallBounceEmitter.fire()
    }

    handleGoalCollision(goalName) {
        ball.launch()
        game.camera.shake(0.03, 1000)
        goalTextDisplay.show(goalName)
        
        if(goalName === "left"){
            scoreBoard.updateScorePlayer2()
        } else if (goalName === "right") {
            scoreBoard.updateScorePlayer1()
        }
    }

    handlePaddleCollision(paddleName) {
        game.camera.shake(0.01, 100)
        
        if(paddleName === "player1"){
            this.player1BounceEmitter.fire()
        } else if (paddleName === "player2") {
            this.player2BounceEmitter.fire()
        }
    }

    launch() {
        if(this.isLaunched){
            this.reset()
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

            this.isLaunched = true
        }
    }

    reset() {
        this.kill()
        this.wallBounceEmitter.kill()
        this.player1BounceEmitter.kill()
        this.player2BounceEmitter.kill()
        this.ballTraceEmitter.kill()
        
        ball = new Ball(game, game.world.centerX, game.world.centerY)
        layerGameObjects.add(ball)

        this.isLaunched = false
    }
}