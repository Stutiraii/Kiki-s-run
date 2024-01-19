export class outputs {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "pink";
    context.shadowBlur = 0;
    context.font = this.fontSize + "px" + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;

    const commonFontSize = this.fontSize;

    //score
    context.font = commonFontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    context.fillText("Score: " + this.game.score, 50, 50);

    //timer
    context.font = commonFontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 50, 80);

    //game over messages
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.commonFontSize * 2 + "px " + this.fontFamily;
      context.fillText(
        "TIME UP",
        this.game.width * 0.5,
        this.game.height * 0.5
      );
    }
    context.restore();
  }
}
