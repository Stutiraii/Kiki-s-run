import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { flyingEnemy } from "./enemies.js";
import { outputs } from "./outputs.js";

// Wait for the window to load before initializing the game
window.addEventListener("load", function () {
  // Get the canvas and its 2D context
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 580;
  let loggedInUsername = sessionStorage.getItem("loggedInUsername");

  // Game class definition
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.time = 0;
      this.maxTime = 30000;
      this.gameOver = false;
      this.img = new Image();
      this.img.src = "../images/gamebg.jpeg";
      this.imgwidth = 0;
      this.outputs = new outputs(this);
      this.scrollSpeed = 8;
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 800;
      this.debug = true;
      this.score = 0;
      this.fontColor = "white";
    }

    // Update function called in each frame
    update(deltaTime) {
      //game timer
      if (!isNaN(deltaTime)) {
        this.time += deltaTime;
      }

      if (this.time > this.maxTime) {
        this.gameOver = true;
        this.player.update(this.input.keys, deltaTime);

        if (sessionStorage.loggedInUsername !== undefined) {
          const user = JSON.parse(localStorage[loggedInUsername]);
          if (game.score > user.score) {
            user.score += game.score;
            localStorage[loggedInUsername] = JSON.stringify(user);
          }
        }
      }

      this.imgwidth += this.scrollSpeed;
      if (this.imgwidth >= canvas.width) {
        this.imgwidth = 0;
      }

      this.player.update(this.input.keys, deltaTime);

      // Handle enemies
      if (isNaN(this.enemyTimer)) {
        this.enemyTimer = 0;
      }

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
    }

    // Draw function for rendering game elements
    draw(context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the scrolling background
      context.drawImage(
        this.img,
        this.imgwidth,
        0,
        canvas.width,
        canvas.height
      );
      context.drawImage(
        this.img,
        this.imgwidth - canvas.width,
        0,
        canvas.width,
        canvas.height
      );

      // Draw the player
      this.player.draw(context);

      // Draw enemies
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      //drawing scores and timers
      this.outputs.draw(context);
    }
    // Function to add new enemies to the game
    addEnemy() {
      if (this.scrollSpeed > 0 && Math.random() < 0.9) {
        //   this.enemies.push(new GroundEnemy(this));
        this.enemies.push(new flyingEnemy(this));
      }
    }
  }
  // Instantiate the Game class and set up the game loop
  const game = new Game(canvas.width, canvas.height);
  let lastTimeStamp = 0;

  // Animation loop function
  function animate(timeStamp) {
    if (!lastTimeStamp) lastTimeStamp = timeStamp;
    const deltaTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the game
    game.update(deltaTime);
    game.draw(ctx);

    // Request the next frame
    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }

  // Start the animation loop
  animate();
});
