let winState = {
    
    init: function(playerName) {
        this.winningPlayer = playerName
    },

    create: function() {
        // set values depending on which player won
        if(this.winningPlayer === "player1") {
            this.font = "mecha_blue"
            this.message = "PLAYER 1 WINS!"
            this.particles = ["particle1_blue","particle2_blue","particle3_blue"]
        } else if (this.winningPlayer === "player2") {
            this.font = "mecha_pink"
            this.message = "PLAYER 2 WINS!"
            this.particles = ["particle1_pink","particle2_pink","particle3_pink"]
        }

        // shake the camera because "old" camera shake from goal
        // gets cut off at game state transition
        game.camera.shake(0.03, 1000)

        // setup black tinted background for better readable text 
        let backgroundBox = game.add.sprite(game.world.width / 2, game.world.height / 2, 'wall')
        backgroundBox.anchor.set(0.5,0.5)
        backgroundBox.width = game.world.width
        backgroundBox.height = game.world.height
        backgroundBox.tint = 0x000000
        backgroundBox.alpha = 0.7

        // setup text message announcing who won
        let winningText = game.add.bitmapText(game.world.width / 2, game.world.height / 2, this.font, this.message, 135)
        winningText.anchor.set(0.5,0.5)

        // tween text message
        const easingIn = Phaser.Easing.Linear.None
        const easingOut = Phaser.Easing.Linear.None
        const autoStart = false
        const delay = 0
        const repeat = -1
        const yoyo = true

        // tween (fast) to new alpha and (slow) back to old one
        game.add.tween(winningText.scale)
        .to( { x: 0.8, y: 0.8 }, 350, easingIn, autoStart, delay, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 350, easingOut, autoStart, delay, repeat, yoyo)
        .start()

        // setup emitters in the corners
        this.emitSpeed = 300
        let emitterTopLeft = new WinEmitter(game, 0, 0, 0, this.emitSpeed, 0, this.emitSpeed, this.particles)
        let emitterTopRight = new WinEmitter(game, game.world.width, 0, -this.emitSpeed, 0, 0, this.emitSpeed, this.particles)
        let emitterBottomLeft = new WinEmitter(game, 0, game.world.height, 0, this.emitSpeed, -this.emitSpeed, 0, this.particles)
        let emitterBottomRight = new WinEmitter(game, game.world.width, game.world.height, -this.emitSpeed, 0, -300, 0, this.particles)


        // setup button for re-match
        let rematchText = game.add.bitmapText(game.world.width / 2, game.world.height / 2 + 100, "mecha_green", "REMATCH", 70)
        rematchText.anchor.set(0.5,0.5)

        // setup tween for re-match button
        let rematchTween = game.add.tween(rematchText.scale)
        .to( { x: 0.8, y: 0.8 }, 350, easingIn, autoStart, delay, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 350, easingOut, autoStart, delay, repeat, yoyo)
        rematchTween.start().pause()
        
        // setup hitbox for re-match button
        let rematchBox = game.add.sprite(game.world.width / 2, game.world.height / 2 + 100, 'wall')
        rematchBox.anchor.set(0.5,0.6)
        rematchBox.width = 300
        rematchBox.height = 80
        rematchBox.tint = 0xffffff
        rematchBox.alpha = 0

        // setup interactions with re-match button hitbox
        rematchBox.inputEnabled = true;
        rematchBox.events.onInputDown.add(function(){
            game.state.start("play")
        }, this);
        rematchBox.events.onInputOver.add(function(){
            rematchTween.resume()
            rematchBoxTopLine.animations.play('lineMove', 100, true)
            rematchBoxBottomLine.animations.play('lineMove', 100, true)
            rematchBoxLeftLine.animations.play('lineMove', 100, true)
            rematchBoxRightLine.animations.play('linelineMove', 100, true)
        }, this);
        rematchBox.events.onInputOut.add(function(){
            rematchTween.pause()
            rematchBoxTopLine.animations.stop(null, true)
            rematchBoxBottomLine.animations.stop(null, true)
            rematchBoxLeftLine.animations.stop(null, true)
            rematchBoxRightLine.animations.stop(null, true)

        }, this);

        // setup lines around rematch button hitbox
        let rematchBoxTopLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 55, 16, 300, 'line_green')
        rematchBoxTopLine.anchor.setTo(0.5,0.5)
        rematchBoxTopLine.alpha = 1
        rematchBoxTopLine.angle = 90
        rematchBoxTopLine.animations.add('lineMove')

        let rematchBoxBottomLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 130, 16, 300, 'line_green')
        rematchBoxBottomLine.anchor.setTo(0.5,0.5)
        rematchBoxBottomLine.alpha = 1
        rematchBoxBottomLine.angle = 270
        rematchBoxBottomLine.animations.add('lineMove')

        let rematchBoxLeftLine = game.add.tileSprite(game.world.width / 2 - 150, game.world.height / 2 + 92, 16, 75, 'line_green')
        rematchBoxLeftLine.anchor.setTo(0.5,0.5)
        rematchBoxLeftLine.alpha = 1
        rematchBoxLeftLine.angle = 360
        rematchBoxLeftLine.animations.add('lineMove')

        let rematchBoxRightLine = game.add.tileSprite(game.world.width / 2 + 150, game.world.height / 2 + 92, 16, 75, 'line_green')
        rematchBoxRightLine.anchor.setTo(0.5,0.5)
        rematchBoxRightLine.alpha = 1
        rematchBoxRightLine.angle = 0
        rematchBoxRightLine.animations.add('lineMove')

        // setup button for back-to-menu
        let menuText = game.add.bitmapText(game.world.width / 2, game.world.height / 2 + 200, "mecha_green", "MAIN MENU", 70)
        menuText.anchor.set(0.5,0.5)

        // setup tween for back-to-menu button
        let menuTween = game.add.tween(menuText.scale)
        .to( { x: 0.8, y: 0.8 }, 350, easingIn, autoStart, delay, repeat, yoyo)
        .to( { x: 1,   y: 1   }, 350, easingOut, autoStart, delay, repeat, yoyo)
        menuTween.start().pause()

        let menuBox = game.add.sprite(game.world.width / 2, game.world.height / 2 + 200, 'wall')
        menuBox.anchor.set(0.5,0.6)
        menuBox.width = 300
        menuBox.height = 80
        menuBox.tint = 0xffffff
        menuBox.alpha = 0

        menuBox.inputEnabled = true;
        menuBox.events.onInputDown.add(function(){
            alert("there is no main menu yet.")
        }, this);
        menuBox.events.onInputOver.add(function(){
            menuTween.resume()
            menuBoxTopLine.animations.play('lineMove', 100, true)
            menuBoxBottomLine.animations.play('lineMove', 100, true)
            menuBoxLeftLine.animations.play('lineMove', 100, true)
            menuBoxRightLine.animations.play('linelineMove', 100, true)
        }, this);
        menuBox.events.onInputOut.add(function(){
            menuTween.pause()
            menuBoxTopLine.animations.stop(null, true)
            menuBoxBottomLine.animations.stop(null, true)
            menuBoxLeftLine.animations.stop(null, true)
            menuBoxRightLine.animations.stop(null, true)
        }, this);

        // setup lines around rematch button hitbox
        let menuBoxTopLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 155, 16, 300, 'line_green')
        menuBoxTopLine.anchor.setTo(0.5,0.5)
        menuBoxTopLine.alpha = 1
        menuBoxTopLine.angle = 90
        menuBoxTopLine.animations.add('lineMove')

        let menuBoxBottomLine = game.add.tileSprite(game.world.width / 2, game.world.height / 2 + 230, 16, 300, 'line_green')
        menuBoxBottomLine.anchor.setTo(0.5,0.5)
        menuBoxBottomLine.alpha = 1
        menuBoxBottomLine.angle = 270
        menuBoxBottomLine.animations.add('lineMove')

        let menuBoxLeftLine = game.add.tileSprite(game.world.width / 2 - 150, game.world.height / 2 + 192, 16, 75, 'line_green')
        menuBoxLeftLine.anchor.setTo(0.5,0.5)
        menuBoxLeftLine.alpha = 1
        menuBoxLeftLine.angle = 360
        menuBoxLeftLine.animations.add('lineMove')

        let menuBoxRightLine = game.add.tileSprite(game.world.width / 2 + 150, game.world.height / 2 + 192, 16, 75, 'line_green')
        menuBoxRightLine.anchor.setTo(0.5,0.5)
        menuBoxRightLine.alpha = 1
        menuBoxRightLine.angle = 0
        menuBoxRightLine.animations.add('lineMove')

        // show mouse cursor
        let canvas = document.querySelectorAll("canvas")[0]
        canvas.classList.add("showCursor")
    }
}