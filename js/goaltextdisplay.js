class GoalTextDisplay {
    constructor(game) {
        // setup background box for goal texts
        this.backgroundBox = game.add.sprite(game.world.width / 2, game.world.height / 2, 'wall')
        this.backgroundBox.anchor.set(0.5,0.6)
        this.backgroundBox.width = game.world.width
        this.backgroundBox.height = 150
        this.backgroundBox.tint = 0x000000
        this.backgroundBox.alpha = 0
        layerText.add(this.backgroundBox)

        // setup goal texts for player 1 and player 2
        this.goalTextPlayer1 = game.add.bitmapText(game.world.width / 2, game.world.height / 2, 'mecha_blue', 'GOAL!', 135)
        this.goalTextPlayer1.anchor.set(0.5,0.5)
        this.goalTextPlayer1.alpha = 0
        layerText.add(this.goalTextPlayer1)

        this.goalTextPlayer2 = game.add.bitmapText(game.world.width / 2, game.world.height / 2, 'mecha_pink', 'GOAL!', 135)
        this.goalTextPlayer2.anchor.set(0.5,0.5)
        this.goalTextPlayer2.alpha = 0
        layerText.add(this.goalTextPlayer2)
    }

    updateScorePlayer1() {
        // increment score & display it
        this.scorePlayer1++
        this.scoreTextPlayer1.setText(this.scorePlayer1)

        this.flashScore(this.scoreTextPlayer1)
        this.checkScore()
    }

     updateScorePlayer2() {
        // increment score & display it
        this.scorePlayer2++
        this.scoreTextPlayer2.setText(this.scorePlayer2)

        this.flashScore(this.scoreTextPlayer2)
        this.checkScore()
    }

    flashScore(scoreTextObject) {
        const newAlpha = 1
        const oldAlpha = scoreTextObject.alpha
        
        const easing = Phaser.Easing.Exponential.In
        const autoStart = false
        const delay = 0
        const repeat = 0
        const yoyo = false

        // tween (fast) to new alpha and (slow) back to old one
        game.add.tween(scoreTextObject)
        .to( { alpha: newAlpha }, 1, easing, autoStart, delay, repeat, yoyo)
        .to( { alpha: oldAlpha }, 1000, easing, autoStart, delay, repeat, yoyo)
        .start()

    }

    checkScore() {
        if(this.scorePlayer1 === 10 || this.scorePlayer2 === 10) {
            this.scorePlayer1 = -1
            this.scorePlayer2 = -1
            this.updateScorePlayer1()
            this.updateScorePlayer2()
        }
    }

    show(goal) {
        let factor
        let goalText

        if(goal === "left") {
            factor = 1
            goalText = this.goalTextPlayer2
        } else if(goal === "right") {
            factor = -1
            goalText = this.goalTextPlayer1
        }

        // tween parameters
        const durationIn = 1
        const durationOut = 1500
        const easing = Phaser.Easing.Exponential.In
        const autoStart = false
        const delay = 0
        const repeat = 0
        const yoyo = false
        
        // set up tween for background box
        let boxTween = game.add.tween(this.backgroundBox)
        .to( { alpha: 0.5 }, durationIn, easing, autoStart, delay, repeat, yoyo)
        .to( { alpha: 0, x: factor * game.world.width * 1.5 }, durationOut, easing, autoStart, delay, repeat, yoyo)
        
        boxTween.onComplete.add(function(){
            this.backgroundBox.x = game.world.width / 2
        },this)
        
        // set up tween for goal text
        let tween = game.add.tween(goalText)
        .to( { alpha: 1 }, durationIn, easing, autoStart, delay, repeat, yoyo)
        .to( { alpha: 0, x: factor * game.world.width * 1.5  }, durationOut, easing, autoStart, delay, repeat, yoyo)
        .start()

        tween.onComplete.add(function(){
            goalText.x = game.world.width / 2
        },this)
    
        boxTween.start()
        tween.start()
    }
    
}