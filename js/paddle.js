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

        // add it to the game
        game.add.existing(this)

        // add it to the group
        group.add(this)
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