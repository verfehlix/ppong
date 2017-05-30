class BounceEmitter {
    constructor(game, group, particles) {
        this.emitter = game.add.emitter(-1000,-1000,500)
        this.emitter.makeParticles(particles)
        this.emitter.setScale(1,0,1,0,2000)
        this.emitter.setAlpha(1, 0, 2000)

        this.explode = true
        this.lifeSpan = 1000
        this.amount = 10

        group.add(this.emitter)

        // pre-fire emitter off screen to prevent initial fps drop on first fire
        this.fire()
    }

    updatePosition(x,y) {
        this.emitter.x = x
        this.emitter.y = y
    }

    updateFireDirection(direction) {
        if(direction === "top") {
            this.emitter.setXSpeed(-500,500)
            this.emitter.setYSpeed(0,200)
        } else if (direction === "bottom") {
            this.emitter.setXSpeed(-500,500)            
            this.emitter.setYSpeed(-200,0)
        }
    }

    fire() {
        this.emitter.start(this.explode, this.lifeSpan, null, this.amount)
    }
}

/*
==========================================================================================
*/

class TraceEmitter {
    constructor(game, group, particles, maxAlpha) {
        this.emitter = game.add.emitter(-1000,-1000,500)
        this.emitter.makeParticles(particles)
        this.emitter.setScale(1, 0.5, 1, 0.5, 500)
        this.emitter.setAlpha(maxAlpha, 0, 500)
        this.emitter.setXSpeed(0,0)
        this.emitter.setYSpeed(0,0)
        this.emitter.setRotation(0,0)
        this.emitter.gravity = 0

        this.explode = false
        this.lifeSpan = 500
        this.particlesPerFrame = 1

        group.add(this.emitter)
        
        // start firing / tracing
        this.fire()
    }

    updatePosition(x,y) {
        this.emitter.x = x
        this.emitter.y = y
    }

    fire() {
        this.emitter.start(this.explode, this.lifeSpan, this.particlesPerFrame)
    }
}

/*
==========================================================================================
*/

class GoalEmitter {
    constructor(game, group, particles) {
        this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 500)
        this.emitter.makeParticles(particles)
        this.emitter.setScale(10, 0, 10, 0, 2000)
        this.emitter.setAlpha(1, 0, 2000)
        this.emitter.setXSpeed(-1000,1000)
        this.emitter.setYSpeed(-1000,1000)

        this.explode = true
        this.lifeSpan = 2000
        this.amount = 100

        group.add(this.emitter)
        
    }

    fire() {
        this.emitter.start(this.explode, this.lifeSpan, null, this.amount)
    }
}