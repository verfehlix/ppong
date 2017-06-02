let playState = {
    
    create: function() {
        // remove cursor
        let canvas = document.querySelectorAll("canvas")[0]
        canvas.classList.remove("showCursor")

        // create groups for layering sprites
        layerBackground = game.add.group();
        layerGameObjects = game.add.group();
        layerText = game.add.group();
        
        // create Background Decorations
        setupBackground()

        // create scoreboard
        scoreBoard = new ScoreBoad(game)

        // create goal text popups
        goalTextDisplay = new GoalTextDisplay(game)

        // create walls
        this.setupWalls()

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

        // console.log("Angular Velocity: " + ball.body.angularVelocity)

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
            ball.handlePaddleCollision(paddles)
        })
    },

    setupWalls: function() {
        topBottomWalls = this.createCollisionGroup()
        sideWalls = this.createCollisionGroup()
        layerGameObjects.add(topBottomWalls)
        layerGameObjects.add(sideWalls)

        new Wall(game, 0, -25, topBottomWalls, 800, 25, "top")
        new Wall(game, 0, 600, topBottomWalls, 800, 25, "bottom")
        
        new Wall(game, -25, 0, sideWalls, 25, 600, "left")
        new Wall(game, 800, 0, sideWalls, 25, 600, "right")
    },

    createCollisionGroup: function() {
        let group = game.add.group()
        group.enableBody = true
        group.physicsBodyType = Phaser.Physics.ARCADE
        
        return group
    }
}