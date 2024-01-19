// Importing player states from a separate file
import { Idle, Walk, Jump, Fall } from "./playerStates.js";
export { Player };

// Player class definition
class Player {
  constructor(game) {
    this.game = game;
    this.originalWidth = 32;
    this.originalHeight = 32;
    this.scaleFactor = 3;
    this.width = this.originalWidth * this.scaleFactor;
    this.height = this.originalHeight * this.scaleFactor;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.vy = 0; // Vertical velocity
    this.speed = 1; // Horizontal speed
    this.weight = 0.8;
    this.maxFrame;
    this.fps = 4;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.maxSpeed = 1;
    this.states = [
      new Idle(this),
      new Walk(this),
      new Jump(this),
      new Fall(this),
    ];
    this.currentState = this.states[0]; // Initial state is Idle
    this.currentState.enter(); // Enter the initial state
  }

  // Update method called in each frame
  update(input, deltaTime) {
    this.Collisions();
    this.currentState.handleInput(input);

    // Horizontal movement
    this.x += this.speed * this.scaleFactor;

    // Adjust speed based on input
    if (input.includes("ArrowRight"))
      this.speed = this.maxSpeed * this.scaleFactor;
    else if (input.includes("ArrowLeft"))
      this.speed = -this.maxSpeed * this.scaleFactor;
    else this.speed = 0;

    // Apply friction to gradually stop the player when no input is received
    this.speed *= 0.5;

    // Ensure the player stays within the game boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // Vertical movement
    this.y += this.vy * this.scaleFactor;

    // Apply gravity if not on the ground
    if (!this.onGround()) this.vy += this.weight * this.scaleFactor;
    else {
      this.vy = 0;
      this.y = this.game.height - this.height; // Snap the player to the ground
    }

    // Sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  // Draw method for rendering the player
  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.originalWidth,
      this.frameY * this.originalHeight,
      this.originalWidth,
      this.originalHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // Check if the player is on the ground
  onGround() {
    return this.y >= this.game.height - this.height;
  }

  // Set the player's state
  setState(state) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * this.speed;
    this.currentState.enter();
  }
  //
  Collisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.score++;
      }
    });
  }
}
