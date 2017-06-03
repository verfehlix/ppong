let loadState = {

    preload: function() {
        // background & decorations
        game.load.image("bg","assets/background/bg.png")
        game.load.spritesheet('line_green', 'assets/background/line_green.png', 16, 32, 32)
        game.load.spritesheet('line_blue', 'assets/background/line_blue.png', 16, 32, 32)
        game.load.spritesheet('line_pink', 'assets/background/line_pink.png', 16, 32, 32)
        game.load.image("mid_point","assets/background/mid_point.png")
        game.load.image("square","assets/background/square.png")
        game.load.image("wall","assets/background/wall.png")

        // paddles & ball
        game.load.image("paddle_blue","assets/player_blue.png")
        game.load.image("paddle_pink","assets/player_pink.png")
        game.load.image("ball","assets/ball.png")

        // particles for emitters
        game.load.image("particle1_green","assets/particles/particle1_green.png")
        game.load.image("particle2_green","assets/particles/particle2_green.png")
        game.load.image("particle3_green","assets/particles/particle3_green.png")
        game.load.image("particle1_blue","assets/particles/particle1_blue.png")
        game.load.image("particle2_blue","assets/particles/particle2_blue.png")
        game.load.image("particle3_blue","assets/particles/particle3_blue.png")
        game.load.image("particle1_pink","assets/particles/particle1_pink.png")
        game.load.image("particle2_pink","assets/particles/particle2_pink.png")
        game.load.image("particle3_pink","assets/particles/particle3_pink.png")
        game.load.image("trace","assets/particles/trace.png")

        // fonts
        game.load.bitmapFont('mecha_green', 'assets/fonts/mecha/mecha_green.png', 'assets/fonts/mecha/mecha.xml');
        game.load.bitmapFont('mecha_blue', 'assets/fonts/mecha/mecha_blue.png', 'assets/fonts/mecha/mecha.xml');
        game.load.bitmapFont('mecha_pink', 'assets/fonts/mecha/mecha_pink.png', 'assets/fonts/mecha/mecha.xml');
    },

    create: function() {
        // start the arcade physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE)

        // transition to play state
        game.state.start("play")
    
    }
}