
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = document.createElement("canvas");
    this.canvas.id = 'mycanvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.ctx.imageSmoothingEnabled = false;
    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Game Scene", new GameScene());
    this.mManager.addScene("Scoreboard", new ScoreboardScene());
    this.mManager.setCurrentScene("Game Scene");
    

    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/Pacman72.png";

    this.spr = new Sprite(50, 100, 32, 32, img, 50, 50, true, 8);
  }

  run() {
    this.loop();
  }

  loop() {
    this.update();
    this.render();

    /** Use bind function to keep the 'this' context throughout loop usage */
    window.requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    const dt = this.calculateDt();

    //Update the menu manager and pass in dt for any time related functions
    this.mManager.update(dt);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    this.mManager.draw(this.ctx);
    this.spr.draw();
  }

  calculateDt() {
    const now = Date.now();
    const dt = (now - this.prevDt) / 1000;
    this.prevDt = now;
    return dt;
  }
}
