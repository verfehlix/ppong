class Wall extends Phaser.Sprite {
    
    constructor(game, x, y, group, width, height, name){
        // creating the phaser sprite object
        super()
        Phaser.Sprite.call(this, game, x, y, "wall")
        this.alpha = 0
        
        // set the physics properties
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.width = width
        this.height = height
        
        // set the custom properties
        this.name = name
        
        // add it to the game
        game.add.existing(this)

        // add it to the group
        group.add(this)
    }
}