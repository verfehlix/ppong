let playState = {
    
    create: function() {
        // create groups for layering sprites
        layerBackground = game.add.group();
        layerGameObjects = game.add.group();
        layerText = game.add.group();
        
        // create Background Decorations
        setUpBackground()

        // create scoreboard
        scoreBoard = new ScoreBoad(game)

        // create particle emitters for winning explosion
        player1GoalEmitter = new GoalEmitter(game, layerGameObjects, ['particle1_blue','particle2_blue','particle3_blue'])
        player2GoalEmitter = new GoalEmitter(game, layerGameObjects, ['particle1_pink','particle2_pink','particle3_pink'])

        // create walls
        topBottomWalls = this.createCollisionGroup()
        sideWalls = this.createCollisionGroup()
        layerGameObjects.add(topBottomWalls)
        layerGameObjects.add(sideWalls)

        this.createWall(0,-25,topBottomWalls,800,25,"top")
        this.createWall(0,600,topBottomWalls,800,25,"bottom")
        
        this.createWall(-25,0,sideWalls,25,600,"left")
        this.createWall(800,0,sideWalls,25,600,"right")

        // create paddles
        paddles = this.createCollisionGroup()

        paddle1TraceEmitter = new TraceEmitter(game, layerGameObjects, 'paddle_blue', 0.1)
        paddle1 = new Paddle(game, 55, game.world.centerY, "player1", paddles)

        paddle2TraceEmitter = new TraceEmitter(game, layerGameObjects, 'paddle_pink', 0.1)
        paddle2 = new Paddle(game, game.world.width - 55, game.world.centerY, "player2", paddles)
        
        layerGameObjects.add(paddles)

        // create emitters for the ball and create ball
        wallBounceEmitter = new BounceEmitter(game, layerGameObjects, ['particle1_green','particle2_green','particle3_green'])
        player1BounceEmitter  = new BounceEmitter(game, layerGameObjects, ['particle1_blue','particle2_blue','particle3_blue'])
        player2BounceEmitter  = new BounceEmitter(game, layerGameObjects, ['particle1_pink','particle2_pink','particle3_pink'])
        ballTraceEmitter = new TraceEmitter(game, layerGameObjects, 'trace', 0.5)

        ball = new Ball(game, game.world.centerX, game.world.centerY)
        layerGameObjects.add(ball)

        // set up goal texts
        goalTextBackgroundBox = game.add.sprite(game.world.width / 2, game.world.height / 2, 'wall')
        goalTextBackgroundBox.anchor.set(0.5,0.6)
        goalTextBackgroundBox.width = game.world.width
        goalTextBackgroundBox.height = 150
        goalTextBackgroundBox.alpha = 0
        goalTextBackgroundBox.tint = 0x000000
        layerText.add(goalTextBackgroundBox)

        goalTextPlayer1 = game.add.bitmapText(game.world.width / 2, game.world.height / 2, 'mecha_blue', 'GOAL!', 135)
        goalTextPlayer1.anchor.set(0.5,0.5)
        goalTextPlayer1.alpha = 0
        layerText.add(goalTextPlayer1)

        goalTextPlayer2 = game.add.bitmapText(game.world.width / 2, game.world.height / 2, 'mecha_pink', 'GOAL!', 135)
        goalTextPlayer2.anchor.set(0.5,0.5)
        goalTextPlayer2.alpha = 0
        layerText.add(goalTextPlayer2)

        // add left-mouseklick event handler for input handling
        game.input.onDown.add(function(){
            ball.launch()
        }, this)
    },

    update: function() {
        let that = this

        // handle user input via mouse
        paddle1.setY(game.input.y)

        // handle second (CPU) paddle movement --> perfect enemy, always hits the ball
        paddle2.setY(ball.y)

        // Ball Collision Detection
        
        // collision with bottom & top walls
        game.physics.arcade.collide(ball, topBottomWalls, function(ball, topBottomWalls){
            game.camera.shake(0.01, 100)
            
            wallBounceEmitter.updateFireDirection(topBottomWalls.name)
            wallBounceEmitter.fire()

        })

        // collision with goals
        game.physics.arcade.collide(ball, sideWalls, function(ball, sideWalls){
            ball.launch()
            
            game.camera.shake(0.03, 1000)

            if(sideWalls.name === "left"){
                scoreBoard.updateScorePlayer2()

                player2GoalEmitter.fire()

                // configure tween
                const easing = Phaser.Easing.Exponential.In
                const autoStart = false
                const delay = 0
                const repeat = 0
                const yoyo = false
            
                let boxTween = game.add.tween(goalTextBackgroundBox)
                .to( { alpha: 0.5 }, 1, easing, autoStart, delay, repeat, yoyo)
                .to( { alpha: 0, x: game.world.width * 1.5 }, 1500, easing, autoStart, delay, repeat, yoyo)
                
                boxTween.onComplete.add(function(){
                    goalTextBackgroundBox.x = game.world.width / 2
                },this)
                
                boxTween.start()

                let tween = game.add.tween(goalTextPlayer2)
                .to( { alpha: 1 }, 1, easing, autoStart, delay, repeat, yoyo)
                .to( { alpha: 0, x: game.world.width * 1.5  }, 1500, easing, autoStart, delay, repeat, yoyo)
                .start()

                tween.onComplete.add(function(){
                    goalTextPlayer2.x = game.world.width / 2
                },this)
            
                tween.start()

            } else if (sideWalls.name === "right") {
                scoreBoard.updateScorePlayer1()

                player1GoalEmitter.fire()

                // configure tween
                const easing = Phaser.Easing.Exponential.In
                const autoStart = false
                const delay = 0
                const repeat = 0
                const yoyo = false

                let boxTween = game.add.tween(goalTextBackgroundBox)
                .to( { alpha: 0.5 }, 1, easing, autoStart, delay, repeat, yoyo)
                .to( { alpha: 0, x: - game.world.width * 1.5 }, 1500, easing, autoStart, delay, repeat, yoyo)
                
                boxTween.onComplete.add(function(){
                    goalTextBackgroundBox.x = game.world.width / 2
                },this)
                
                
                boxTween.start()

                let tween = game.add.tween(goalTextPlayer1)
                .to( { alpha: 1 }, 1, easing, autoStart, delay, repeat, yoyo)
                .to( { alpha: 0, x: -game.world.width * 1.5  }, 1500, easing, autoStart, delay, repeat, yoyo)
                .start()

                tween.onComplete.add(function(){
                    goalTextPlayer1.x = game.world.width / 2
                },this)
            
                tween.start()

            }
        })

        // collision with paddles
        game.physics.arcade.collide(ball, paddles, function(ball, paddles){
            game.camera.shake(0.01, 100)
            
            if(paddles.name === "player1"){
                player1BounceEmitter.fire()
            } else if (paddles.name === "player2") {
                player2BounceEmitter.fire()
            }
        })

        // Update Paddle Emitters
        paddle1TraceEmitter.updatePosition(paddle1.x, paddle1.y)
        paddle2TraceEmitter.updatePosition(paddle2.x, paddle2.y)

        // Update Ball Emitters
        wallBounceEmitter.updatePosition(ball.body.x,ball.body.y)
        player1BounceEmitter.updatePosition(ball.body.x,ball.body.y)
        player2BounceEmitter.updatePosition(ball.body.x,ball.body.y)

        ballTraceEmitter.updatePosition(ball.body.x + 0.5 * ball.width,ball.body.y + 0.5 * ball.height)
    },

    createCollisionGroup: function() {
        let group = game.add.group()
        group.enableBody = true
        group.physicsBodyType = Phaser.Physics.ARCADE
        
        return group
    },

    createWall: function(x,y,group,width,height,name) {
        let wall = group.create(x,y,"wall")
        wall.width = width
        wall.height = height
        wall.body.immovable = true
        wall.name = name
        wall.alpha = 0
        
        return wall
    }
}