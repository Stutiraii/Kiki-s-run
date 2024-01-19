// Base Enemy class
class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    // Update method for enemy movement and animation
    update(deltaTime) {
        // Movement
        this.x -= this.speedX;
        this.y += this.speedY;

        // Animation frame update
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        // Check if off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    // Draw method for rendering the enemy
    draw(context) {
        if(this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

// FlyingEnemy class, extending the Enemy class
export class flyingEnemy extends Enemy {
    constructor(game) {
       
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.7;
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image =new Image;
        this.image.src='/kiki run/images/enemy_fly.png';
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    // Update method for flying enemy specific behavior
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}


//Could not figure out why it was not working

// // GroundEnemy class, extending the base Enemy class
// export class GroundEnemy extends Enemy {
// //     constructor(game) {
// //         super();
// //         this.game = game;
// //         this.width = 60;
// //         this.height = 87;
// //         this.x = this.game.width;
// //         this.y = this.game.height - this.height;
// //         this.speedX = 0;
// //         this.speedY = 0;
// //         this.maxFrame = 1;
// //        this.image = document.getElementById('enemy_plant');
// //     }
// // }
