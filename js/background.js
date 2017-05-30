function setupBackground() {

    // repeating background image
    let bg = game.add.tileSprite(-100, -100, 1000, 800, "bg")
    bg.alpha = 0.4
    layerBackground.add(bg)

    // moving lines
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

    // litte white squares to connect the lines
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

    // kickoff point
    let midPoint = game.add.sprite(game.world.width / 2, game.world.height / 2,"mid_point")
    midPoint.anchor.setTo(0.5,0.5)
    layerBackground.add(midPoint)

    let squareKickoff = game.add.sprite(game.world.width / 2,game.world.height / 2,"square")
    squareKickoff.anchor.setTo(0.5,0.5)
    layerBackground.add(squareKickoff)   
}