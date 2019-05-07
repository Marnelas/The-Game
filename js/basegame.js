let baseGame = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  winH: undefined,
  winW: undefined,
  init: function(Id) {
    this.canvas = document.getElementById(Id);
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.setHandlers();
    this.start();
    this.setEventListeners();
    this.colission();
  },
  setDimensions: function() {
    this.canvas.setAttribute("width", window.innerWidth);
    this.canvas.setAttribute("height", window.innerHeight);
    this.winH = window.innerHeight;
    this.winW = window.innerWidth;
  },
  setHandlers: function() {
    window.onresize = () => this.setDimensions();
  },
  start: function() {
    this.fps = 60;
    alert("A jump is a life you decide");

    this.reset();

    this.interval = setInterval(() => {
      this.clear();
      if (this.player.contador == 7) this.gameOver();
      this.player.gravity();
      this.drawAll();
      this.colission();
    }, 1000 / this.fps);
  },
  reset: function() {
    this.player = new Player(this.ctx, this.winW, this.winH, this.keys);
    this.background = new Background(this.winW, this.winH, this.ctx);
    this.obstacles = [];
    this.createObstacle(new Obstacle(this.ctx, this.winW, this.winH, 200, 550));
    this.createObstacle(new Obstacle(this.ctx, this.winW, this.winH, 400, 450));
    this.createObstacle(new Obstacle(this.ctx, this.winW, this.winH, 600, 350));
    this.createObstacle(new Obstacle(this.ctx, this.winW, this.winH, 800, 250));

    this.framesCounter = 0;
  },
  createObstacle(obs) {
    this.obstacles.push(obs);
  },
  drawAll: function() {
    this.background.draw();
    this.obstacles.forEach(function(obstacle) {
      obstacle.draw();
    });
    this.player.draw(this.framesCounter);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  setEventListeners: function() {
    document.onkeydown = e => {
      if (e.keyCode === 37) this.player.moveLeft();
      if (e.keyCode === 39) this.player.moveRight();
      if (e.keyCode === 38) this.player.jump();
    };
  },
  stop: function() {
    clearInterval(this.interval);
  },
  gameOver: function() {
    this.stop();
    alert("Game is over for you");
  },
  colission: function() {
    // if (
    //
    // ) {
    // this.player.positionF = this.obstacle.posY - this.player.h;
    // this.player.floor = true;
    //   console.log("entra");
    // } else {
    //   this.player.floor = false;
    // }
    let index = this.obstacles.findIndex(obstacle => {
      return (
        this.player.x <= obstacle.posX + obstacle.width - 25 &&
        this.player.x + this.player.w - 50 >= obstacle.posX &&
        this.player.y <= obstacle.posY + obstacle.height - 15 &&
        this.player.y + this.player.h >= obstacle.posY
      );
    });
    if (index != -1) {
      this.winCondition(index);
      this.colissionAction(index);
    } else {
      this.player.floor = false;
    }
  },
  colissionAction: function(obs) {
    this.player.positionF = this.obstacles[obs].posY - this.player.h;
    this.player.floor = true;
    console.log("entra");
  },
  winCondition: function(index) {
    if (index == 3) {
      this.stop();
      alert("has ganadoooooo!!!!!!!!!!!!!!");
    }
  }
};
