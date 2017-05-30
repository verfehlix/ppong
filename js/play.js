let playState = {
    
    create: function() {
        // create groups for layering sprites
        layerBackground = game.add.group();
        layerGameObjects = game.add.group();
        layerText = game.add.group();
        
        // create Background Decorations
        setupBackground()

        // create scoreboard
        scoreBoard = new ScoreBoad(game)

        // set up goal texts
        goalTextDisplay = new GoalTextDisplay(game)

        // create particle emitters for winning explosion
        player1GoalEmitter = new GoalEmitter(game, layerGameObjects, ['particle1_blue','particle2_blue','particle3_blue'])
        player2GoalEmitter = new GoalEmitter(game, layerGameObjects, ['particle1_pink','particle2_pink','particle3_pink'])

        // create walls
        topBottomWalls = this.createCollisionGroup()
        sideWalls = this.createCollisionGroup()
        layerGameObjects.add(topBottomWalls)
        layerGameObjects.add(sideWalls)

        new Wall(game, 0, -25, topBottomWalls, 800, 25, "top")
        new Wall(game, 0, 600, topBottomWalls, 800, 25, "bottom")
        
        new Wall(game, -25, 0, sideWalls, 25, 600, "left")
        new Wall(game, 800, 0, sideWalls, 25, 600, "right")

        // create paddles
        paddles = this.createCollisionGroup()
        layerGameObjects.add(paddles)

        paddle1 = new Paddle(game, 55, game.world.centerY, "player1", paddles)
        paddle2 = new Paddle(game, game.world.width - 55, game.world.centerY, "player2", paddles)
        
        // create ball
        ball = new Ball(game, game.world.centerX, game.world.centerY)
        layerGameObjects.add(ball)

        // add left-mouseklick event handler for launching the ball
        game.input.onDown.add(function(){
            ball.launch()
        }, this)
    },

    update: function() {
        // Ball collision with bottom & top walls
        game.physics.arcade.collide(ball, topBottomWalls, function(ball, topBottomWalls){
            ball.handleWallCollision(topBottomWalls.name)
        })

        // Ball collision with goals
        game.physics.arcade.collide(ball, sideWalls, function(ball, sideWalls){
            ball.handleGoalCollision(sideWalls.name)
        })

        // Ball collision with paddles
        game.physics.arcade.collide(ball, paddles, function(ball, paddles){
            ball.handlePaddleCollision(paddles.name)
        })
    },

    createCollisionGroup: function() {
        let group = game.add.group()
        group.enableBody = true
        group.physicsBodyType = Phaser.Physics.ARCADE
        
        return group
    }
}