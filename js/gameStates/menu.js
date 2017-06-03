let menuState = {
    create: function() {

        let bg = game.add.tileSprite(-100, -100, 1000, 800, "bg")
        bg.alpha = 0.5

        
        // tween options
        const easingIn = Phaser.Easing.Linear.None
        const easingOut = Phaser.Easing.Linear.None
        const autoStart = false
        const delay = 0
        const repeat = -1
        const yoyo = true
        
        let titleText = game.add.bitmapText(game.world.width / 2 - 100, game.world.height / 2 - 100, "mecha_blue", "POWER", 100)
        titleText.anchor.set(0.5,0.5)

        game.add.tween(titleText.scale)
        .to( { x: 0.8, y: 0.8 }, 1000, easingIn, true, 0, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 1000, easingOut, true, 0, repeat, yoyo)

        let titleText2 = game.add.bitmapText(game.world.width / 2 + 100, game.world.height / 2 - 100, "mecha_pink", "PONG", 100)
        titleText2.anchor.set(0.5,0.5)

        game.add.tween(titleText2.scale)
        .to( { x: 0.8, y: 0.8 }, 1000, easingIn, true, 0, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 1000, easingOut, true, 0, repeat, yoyo)

        // setup hitbox for start button
        let startBox = game.add.sprite(game.world.width / 2, game.world.height / 2 + 100, 'wall')
        startBox.anchor.set(0.5,0.6)
        startBox.width = 300
        startBox.height = 80
        startBox.tint = 0x000000
        startBox.alpha = 0.3
        
        // setup button for start
        let startText = game.add.bitmapText(game.world.width / 2, game.world.height / 2 + 100, "mecha_green", "START", 70)
        startText.anchor.set(0.5,0.5)

        // setup tween for start button
        let startTween = game.add.tween(startText.scale)
        .to( { x: 0.8, y: 0.8 }, 350, easingIn, autoStart, delay, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 350, easingOut, autoStart, delay, repeat, yoyo)
        startTween.start().pause()
        
        // setup interactions with start button hitbox
        startBox.inputEnabled = true;
        startBox.events.onInputDown.add(function(){
            game.state.start("play")
        }, this);
        startBox.events.onInputOver.add(function(){
            startTween.resume()
            startBoxTopLine.animations.play('lineMove', 100, true)
            startBoxBottomLine.animations.play('lineMove', 100, true)
            startBoxLeftLine.animations.play('lineMove', 100, true)
            startBoxRightLine.animations.play('lineMove', 100, true)
        }, this);
        startBox.events.onInputOut.add(function(){
            startTween.pause()
            startBoxTopLine.animations.stop(null, true)
            startBoxBottomLine.animations.stop(null, true)
            startBoxLeftLine.animations.stop(null, true)
            startBoxRightLine.animations.stop(null, true)

        }, this);

        // setup lines around rematch button hitbox
        let startBoxTopLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 55, 16, 300, 'line_green')
        startBoxTopLine.anchor.setTo(0.5,0.5)
        startBoxTopLine.alpha = 1
        startBoxTopLine.angle = 90
        startBoxTopLine.animations.add('lineMove')

        let startBoxBottomLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 130, 16, 300, 'line_green')
        startBoxBottomLine.anchor.setTo(0.5,0.5)
        startBoxBottomLine.alpha = 1
        startBoxBottomLine.angle = 270
        startBoxBottomLine.animations.add('lineMove')

        let startBoxLeftLine = game.add.tileSprite(game.world.width / 2 - 150, game.world.height / 2 + 92, 16, 75, 'line_green')
        startBoxLeftLine.anchor.setTo(0.5,0.5)
        startBoxLeftLine.alpha = 1
        startBoxLeftLine.angle = 0
        startBoxLeftLine.animations.add('lineMove')

        let startBoxRightLine = game.add.tileSprite(game.world.width / 2 + 150, game.world.height / 2 + 92, 16, 75, 'line_green')
        startBoxRightLine.anchor.setTo(0.5,0.5)
        startBoxRightLine.alpha = 1
        startBoxRightLine.angle = 180
        startBoxRightLine.animations.add('lineMove')

        // setup squares where lines meet
        let startBoxSquareTopLeft = game.add.sprite(game.world.width / 2 - 150,game.world.height / 2 + 55,"square")
        startBoxSquareTopLeft.anchor.setTo(0.5,0.5)

        let startBoxSquareTopRight = game.add.sprite(game.world.width / 2 + 150,game.world.height / 2 + 55,"square")
        startBoxSquareTopRight.anchor.setTo(0.5,0.5)

        let startBoxSquareBottomLeft = game.add.sprite(game.world.width / 2 - 150,game.world.height / 2 + 130,"square")
        startBoxSquareBottomLeft.anchor.setTo(0.5,0.5)

        let startBoxSquareBottomRight = game.add.sprite(game.world.width / 2 + 150,game.world.height / 2 + 130,"square")
        startBoxSquareBottomRight.anchor.setTo(0.5,0.5)

        // show mouse cursor
        let canvas = document.querySelectorAll("canvas")[0]
        canvas.classList.add("showCursor")
    }
}