let playState = {
    
    create: function() {
        // create groups for layering sprites
        layerBackground = game.add.group();
        layerGameObjects = game.add.group();
        layerText = game.add.group();
        
        // create background stuff
        let bg = game.add.tileSprite(-100, -100, 1000, 800, "bg")
        bg.alpha = 0.4
        layerBackground.add(bg)

        let midLine1 = game.add.tileSprite(game.world.width / 2, game.world.height / 4, 16, 268, 'line_green')
        midLine1.anchor.setTo(0.5,0.5)
        midLine1.alpha = 1
        midLine1.animations.add('lineMove')
        midLine1.animations.play('lineMove', 100, true)
        layerBackground.add(midLine1)

        let midLine2 = game.add.tileSprite(game.world.width / 2, game.world.height * 3/4, 16, 268, 'line_green')
        midLine2.anchor.setTo(0.5,0.5)
        midLine2.alpha = 1
        midLine2.angle = 180
        midLine2.animations.add('lineMove')
        midLine2.animations.play('lineMove', 100, true)
        layerBackground.add(midLine2)

        let midPoint = game.add.sprite(game.world.width / 2, game.world.height / 2,"mid_point")
        midPoint.anchor.setTo(0.5,0.5)
        layerBackground.add(midPoint)

        let leftLine = game.add.tileSprite(16, game.world.height / 2, 16, 568, 'line_blue')
        leftLine.anchor.setTo(0.5,0.5)
        leftLine.alpha = 1
        leftLine.animations.add('lineMove')
        leftLine.animations.play('lineMove', 100, true)
        layerBackground.add(leftLine)

        let rightLine = game.add.tileSprite(784, game.world.height / 2, 16, 568, 'line_pink')
        rightLine.anchor.setTo(0.5,0.5)
        rightLine.alpha = 1
        rightLine.angle = 180
        rightLine.animations.add('lineMove')
        rightLine.animations.play('lineMove', 100, true)
        layerBackground.add(rightLine)

        let topLine = game.add.tileSprite(game.world.width / 2, 16, 16, 768, 'line_green')
        topLine.anchor.setTo(0.5,0.5)
        topLine.alpha = 1
        topLine.angle = 90
        topLine.animations.add('lineMove')
        topLine.animations.play('lineMove', 100, true)
        layerBackground.add(topLine)

        let bottomLine = game.add.tileSprite(game.world.width / 2, 584, 16, 768, 'line_green')
        bottomLine.anchor.setTo(0.5,0.5)
        bottomLine.alpha = 1
        bottomLine.angle = 270
        bottomLine.animations.add('lineMove')
        bottomLine.animations.play('lineMove', 100, true)
        layerBackground.add(bottomLine)

        let squareTopLeft = game.add.sprite(16,16,"square")
        squareTopLeft.anchor.setTo(0.5,0.5)
        layerBackground.add(squareTopLeft)

        let squareTopRight = game.add.sprite(784,16,"square")
        squareTopRight.anchor.setTo(0.5,0.5)
        layerBackground.add(squareTopRight)

        let squareBottomRight = game.add.sprite(784,584,"square")
        squareBottomRight.anchor.setTo(0.5,0.5)
        layerBackground.add(squareBottomRight)

        let squareBottomLeft = game.add.sprite(16,584,"square")
        squareBottomLeft.anchor.setTo(0.5,0.5)
        layerBackground.add(squareBottomLeft)

        let squareMidTop = game.add.sprite(game.world.width / 2,16,"square")
        squareMidTop.anchor.setTo(0.5,0.5)
        layerBackground.add(squareMidTop)

        let squareMideBottom = game.add.sprite(game.world.width / 2,584,"square")
        squareMideBottom.anchor.setTo(0.5,0.5)
        layerBackground.add(squareMideBottom)

        let squareKickoff = game.add.sprite(game.world.width / 2,game.world.height / 2,"square")
        squareKickoff.anchor.setTo(0.5,0.5)
        layerBackground.add(squareKickoff)

        // reset scores
        scorePlayer1 = 0
        scorePlayer2 = 0

        // display scores
        scoreTextPlayer1 = game.add.bitmapText(100, 125, 'mecha_blue', '' + scorePlayer1, 500)
        scoreTextPlayer1.alpha = 0.1
        layerBackground.add(scoreTextPlayer1)

        scoreTextPlayer2 = game.add.bitmapText(475, 125, 'mecha_pink', '' + scorePlayer2, 500)
        scoreTextPlayer2.alpha = 0.15
        layerBackground.add(scoreTextPlayer2)

        // create particle emitters for winning explosion
        player1WinEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 500)
        player1WinEmitter.makeParticles(['particle1_blue','particle2_blue','particle3_blue'])
        player1WinEmitter.setScale(10, 0, 10, 0, 2000)
        player1WinEmitter.setAlpha(1, 0, 2000)
        player1WinEmitter.setXSpeed(-1000,1000)
        player1WinEmitter.setYSpeed(-1000,1000)
        layerGameObjects.add(player1WinEmitter)

        player2WinEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 500)
        player2WinEmitter.makeParticles(['particle1_pink','particle2_pink','particle3_pink'])
        player2WinEmitter.setScale(10, 0, 10, 0, 2000)
        player2WinEmitter.setAlpha(1, 0, 2000)
        player2WinEmitter.setXSpeed(-1000,1000)
        player2WinEmitter.setYSpeed(-1000,1000)
        layerGameObjects.add(player2WinEmitter)

        // create walls
        topBottomWalls = this.createCollisionGroup()
        sideWalls = this.createCollisionGroup()
        layerGameObjects.add(topBottomWalls)
        layerGameObjects.add(sideWalls)

        this.createWall(0,-25,topBottomWalls,800,25,"top")
        this.createWall(0,600,topBottomWalls,800,25,"bottom")
        
        this.createWall(-25,0,sideWalls,25,600,"left")
        this.createWall(800,0,sideWalls,25,600,"right")

        // create paddles / players
        paddles = this.createCollisionGroup()
        layerGameObjects.add(paddles)

        paddle1 = this.createPaddle(55,game.world.centerY,paddles,"player1")

        paddle1TraceEmitter = game.add.emitter(-1000,-1000,500)
        paddle1TraceEmitter.makeParticles('paddle_blue')
        paddle1TraceEmitter.setScale(1, 0.5, 1, 0.5, 500)
        paddle1TraceEmitter.setAlpha(0.1, 0, 500)
        paddle1TraceEmitter.setXSpeed(0,0)
        paddle1TraceEmitter.setYSpeed(0,0)
        paddle1TraceEmitter.gravity = 0
        paddle1TraceEmitter.setRotation(0,0)
        layerGameObjects.add(paddle1TraceEmitter)

        paddle2 = this.createPaddle(game.world.width - 55,game.world.centerY,paddles,"player2")

        paddle2TraceEmitter = game.add.emitter(-1000,-1000,500)
        paddle2TraceEmitter.makeParticles('paddle_pink')
        paddle2TraceEmitter.setScale(1, 0.5, 1, 0.5, 500)
        paddle2TraceEmitter.setAlpha(0.1, 0, 500)
        paddle2TraceEmitter.setXSpeed(0,0)
        paddle2TraceEmitter.setYSpeed(0,0)
        paddle2TraceEmitter.gravity = 0
        paddle2TraceEmitter.setRotation(0,0)
        layerGameObjects.add(paddle2TraceEmitter)

        // create ball
        ball = this.createBall(game.world.centerX, game.world.centerY)
        layerGameObjects.add(ball)

        // create emitters for the ball
        wallBounceEmitter = game.add.emitter(-1000, -1000, 500)
        wallBounceEmitter.makeParticles(['particle1_green','particle2_green','particle3_green'])
        wallBounceEmitter.setScale(2, 0, 2, 0, 1000)
        wallBounceEmitter.setAlpha(1, 0, 1000)
        layerGameObjects.add(wallBounceEmitter)
        
        player1BounceEmitter = game.add.emitter(-1000, -1000, 500)
        player1BounceEmitter.makeParticles(['particle1_blue','particle2_blue','particle3_blue'])
        player1BounceEmitter.setScale(1, 0, 1, 0, 1000)
        player1BounceEmitter.setAlpha(1, 0, 2000)
        player1BounceEmitter.setXSpeed(0,200)
        player1BounceEmitter.setYSpeed(-500,500)
        layerGameObjects.add(player1BounceEmitter)

        player2BounceEmitter = game.add.emitter(-1000, -1000, 500)
        player2BounceEmitter.makeParticles(['particle1_pink','particle2_pink','particle3_pink'])
        player2BounceEmitter.setScale(1, 0, 1, 0, 1000)
        player2BounceEmitter.setAlpha(1, 0, 2000)
        player2BounceEmitter.setXSpeed(-200,0)
        player2BounceEmitter.setYSpeed(-500,500)
        layerGameObjects.add(player2BounceEmitter)

        ballTraceEmitter = game.add.emitter(-1000,-1000,500)
        ballTraceEmitter.makeParticles('trace')
        ballTraceEmitter.setScale(1, 0.5, 1, 0.5, 500)
        ballTraceEmitter.setAlpha(0.5, 0, 500)
        ballTraceEmitter.setXSpeed(0,0)
        ballTraceEmitter.setYSpeed(0,0)
        ballTraceEmitter.gravity = 0
        layerGameObjects.add(ballTraceEmitter)

        // pre-emit all emitters off screen to prevent initial fps drop on first emit
        this.emitBounceParticles(wallBounceEmitter)
        this.emitBounceParticles(player1BounceEmitter)
        this.emitBounceParticles(player2BounceEmitter)

        // start emitting the paddle trace emitters
        this.emitTraceParticles(paddle1TraceEmitter)
        this.emitTraceParticles(paddle2TraceEmitter)

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
        game.input.onDown.add(this.launchBall, this)
    },

    update: function() {
        let that = this

        // handle user input via mouse
        this.controlPaddle(paddle1, game.input.y)

        // handle second (CPU) paddle movement --> perfect enemy, always hits the ball
        this.controlPaddle(paddle2, ball.y)

        // Ball Collision Detection
        
        // collision with bottom & top walls
        game.physics.arcade.collide(ball, topBottomWalls, function(ball, topBottomWalls){
            game.camera.shake(0.01, 100)
            
            if(topBottomWalls.name === "top"){
                wallBounceEmitter.setXSpeed(-500,500)
                wallBounceEmitter.setYSpeed(0,200)
            } else if (topBottomWalls.name === "bottom") {
                wallBounceEmitter.setXSpeed(-500,500)            
                wallBounceEmitter.setYSpeed(-200,0)
            }

            that.emitBounceParticles(wallBounceEmitter)
        })

        // collision with goals
        game.physics.arcade.collide(ball, sideWalls, function(ball, sideWalls){
            that.launchBall()
            
            game.camera.shake(0.03, 1000)

            if(sideWalls.name === "left"){
                scorePlayer2++
                that.updateText(scoreTextPlayer2,scorePlayer2)
                that.emitWinParticles(player2WinEmitter)

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
                scorePlayer1++
                this.updateText(scoreTextPlayer1,scorePlayer1)
                this.emitWinParticles(player1WinEmitter)

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

            that.checkScore()
        })

        // collision with paddles
        game.physics.arcade.collide(ball, paddles, function(ball, paddles){
            game.camera.shake(0.01, 100)
            
            if(paddles.name === "player1"){
                that.emitBounceParticles(player1BounceEmitter)
            } else if (paddles.name === "player2") {
                that.emitBounceParticles(player2BounceEmitter)
            }
        })

        // Update Paddle Emitters
        paddle1TraceEmitter.x = paddle1.x
        paddle1TraceEmitter.y = paddle1.y

        paddle2TraceEmitter.x = paddle2.x
        paddle2TraceEmitter.y = paddle2.y

        // Update Ball Emitters
        wallBounceEmitter.x = ball.body.x
        wallBounceEmitter.y = ball.body.y

        player1BounceEmitter.x = ball.body.x
        player1BounceEmitter.y = ball.body.y

        player2BounceEmitter.x = ball.body.x
        player2BounceEmitter.y = ball.body.y

        ballTraceEmitter.x = ball.body.x + 0.5 * ball.width
        ballTraceEmitter.y = ball.body.y + 0.5 * ball.height
    },

    checkScore: function() {


        if(scorePlayer1 === 10 || scorePlayer2 === 10) {
            scorePlayer1 = 0
            scorePlayer2 = 0
            this.updateText(scoreTextPlayer1,scorePlayer1)
            this.updateText(scoreTextPlayer2,scorePlayer2)
        }
    },

    updateText: function(textObject,newText) {
        textObject.setText(newText)

        const newAlpha = 1
        const oldAlpha = textObject.alpha
        
        // configure tween
        const easing = Phaser.Easing.Exponential.In
        const autoStart = false
        const delay = 0
        const repeat = 0
        const yoyo = false

        // tween (fast) to new alpha and (slow) back to old one
        game.add.tween(textObject)
        .to( { alpha: newAlpha }, 1, easing, autoStart, delay, repeat, yoyo)
        .to( { alpha: oldAlpha }, 1000, easing, autoStart, delay, repeat, yoyo)
        .start()
    },

    emitBounceParticles: function(emitter) {
        const explode = true
        const lifeSpan = 1000
        const amount = 10

        emitter.start(explode, lifeSpan, null, amount)
    },

    emitTraceParticles: function(emitter) {
        const explode = false
        const lifeSpan = 500
        const particlesPerFrame = 1

        emitter.start(explode, lifeSpan, particlesPerFrame)
    },

    emitWinParticles: function(emitter) {
        const explode = true
        const lifeSpan = 2000
        const amount = 100

        emitter.start(explode, lifeSpan, null, amount)
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
    },

    createPaddle: function(x,y, group, name) {
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
    },

    controlPaddle: function(paddle,y) {
        paddle.y = y
        
        if(paddle.y < paddle.height / 2){
            paddle.y = paddle.height / 2
        } else if (paddle.y > game.world.height - paddle.height / 2) {
            paddle.y = game.world.height - paddle.height / 2
        }
    },

    createBall: function(x,y) {
        let ball = game.add.sprite(x,y,"ball")
        
        ball.anchor.setTo(0.5,0.5)
        
        game.physics.arcade.enable(ball)
        
        ball.body.bounce.setTo(1.05,1.05)

        ball.smoothed = false

        return ball
    },

    launchBall: function() {
        if(ballLaunched){
            ball.kill()
            ball = this.createBall(game.world.width / 2, game.world.height / 2)
            layerGameObjects.add(ball)

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

            this.emitTraceParticles(ballTraceEmitter)
            ballTraceEmitter.on = true


            ballLaunched = true
        }
    }
}