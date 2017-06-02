class Ball extends Phaser.Sprite {
    
    constructor(game, x, y){
        // creating the phaser sprite object
        super()
        Phaser.Sprite.call(this, game, x, y, "ball")
        this.anchor.setTo(0.5,0.5)

        // set the physics properties
        game.physics.arcade.enable(this)
        this.body.bounce.setTo(1.05,1.05)        
        this.body.angularDrag = 50
        this.body.maxAngular = 300

        // set custom properties
        this.maxSpeed = 1200
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
        
        // calculate ball spin
        const ballVelocity = Math.sqrt(Math.pow(this.body.velocity.x,2) + Math.pow(this.body.velocity.y,2))
        const normalizedXVelocity = this.body.velocity.x / ballVelocity
        const normalizedYVelocity = this.body.velocity.y / ballVelocity
        const acceleration = 0.00003 * ballVelocity * this.body.angularVelocity
        this.body.velocity.x -= normalizedYVelocity * acceleration
        this.body.velocity.y += normalizedXVelocity * acceleration

        // cap velocity
        if(this.body.velocity.x > 0) {
            this.body.velocity.x = Math.min(this.body.velocity.x, this.maxSpeed)
        } else {
            this.body.velocity.x = Math.max(this.body.velocity.x, -this.maxSpeed)            
        }

        if(this.body.velocity.y > 0) {
            this.body.velocity.y = Math.min(this.body.velocity.y, this.maxSpeed)
        } else {
            this.body.velocity.y = Math.max(this.body.velocity.y, -this.maxSpeed)            
        }

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

    handlePaddleCollision(paddle) {
        game.camera.shake(0.01, 100)
        
        if(paddle.name === "player1"){
            this.player1BounceEmitter.fire()
            // set spin
            this.body.angularVelocity += (this.deltaY - paddle.deltaY) / 0.02
        } else if (paddle.name === "player2") {
            this.player2BounceEmitter.fire()
            // set spin
            this.body.angularVelocity += - (this.deltaY - paddle.deltaY) / 0.02
        }
    }

    launch() {
        if(this.isLaunched){
            this.reset()
        } else {
            // normal launch
            const max = 800
            const rand = game.rnd.integerInRange(100, 300)
            const leftRight = (Math.random() > 0.5 ? 1 : -1)

            this.body.velocity.y = rand
            this.body.velocity.x = leftRight * (max - rand)
            
            this.body.angularVelocity = game.rnd.integerInRange(-100,100)

            // debug launch
            // this.body.velocity.y = 0
            // this.body.velocity.x = - 300

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