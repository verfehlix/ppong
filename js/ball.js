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
        
        // add it to the game
        game.add.existing(this)
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

            // this.emitTraceParticles(ballTraceEmitter)
            // ballTraceEmitter.on = true


            this.isLaunched = true
        }
    }

    reset() {
       this.kill()

        ball = new Ball(game, game.world.centerX, game.world.centerY)
        layerGameObjects.add(ball)

        this.isLaunched = false

        // paddle2.y = game.world.height / 2
    }
}