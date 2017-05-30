class Paddle extends Phaser.Sprite {
    
    constructor(game, x, y, name, group){
        // creating the phaser sprite object
        super()

        if(name === "player1") {
            Phaser.Sprite.call(this, game, x, y, "paddle_blue")
        } else if (name === "player2") {
            Phaser.Sprite.call(this, game, x, y, "paddle_pink")
        }
        this.anchor.setTo(0.5,0.5)

        // set the physics properties
        game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true
        this.body.immovable = true
        
        // set custom properties
        this.name = name

        if(name === "player1") {
            this.traceEmitter = new TraceEmitter(game, layerGameObjects, 'paddle_blue', 0.1)
        } else if (name === "player2") {
            this.traceEmitter = new TraceEmitter(game, layerGameObjects, 'paddle_pink', 0.1)
        }

        // add it to the game
        game.add.existing(this)

        // add it to the group
        group.add(this)
    }

    update() {
        // update paddle position
        if(this.name === "player1") {
            
            // handle player movement via mouse
            this.setY(game.input.y)

        } else if(this.name === "player2") {
            
            // perfect CPU movement --> cannot be beaten 
            // this.setY(ball.y)
        }

        // Update Paddle Trace Emitter
        this.traceEmitter.updatePosition(this.x, this.y)
    }

    setY(y) {
        this.y = y
        
        if(this.y < this.height / 2){
            this.y = this.height / 2
        } else if (this.y > game.world.height - this.height / 2) {
            this.y = game.world.height - this.height / 2
        }
    }
}