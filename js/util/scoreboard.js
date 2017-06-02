class ScoreBoad {
    constructor(game) {
        // setup initial scores
        this.scorePlayer1 = 0
        this.scorePlayer2 = 0

        // setup texts displaying the scores
        this.scoreTextPlayer1 = game.add.bitmapText(100, 125, 'mecha_blue', '' + this.scorePlayer1, 500)
        this.scoreTextPlayer1.alpha = 0.1

        this.scoreTextPlayer2 = game.add.bitmapText(475, 125, 'mecha_pink', '' + this.scorePlayer2, 500)
        this.scoreTextPlayer2.alpha = 0.15

        layerBackground.add(this.scoreTextPlayer1)
        layerBackground.add(this.scoreTextPlayer2)
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
        if(this.scorePlayer1 === 10) {
            game.state.start("win", false, false,"player1")
        } else if(this.scorePlayer2 === 10) {
            game.state.start("win", false, false,"player2")
        }
    }
    
}