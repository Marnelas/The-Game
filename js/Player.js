class player {
  constructor(ctx, w, h, keys) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = keys;
    this.x = this.canvasW * 0.08;
    this.y0 = this.canvasH * 0.8;
    this.y = this.y0;

    
    this.img = new Image();
    this.img.src = "img/sprite.png";
    this.img.frames = 8;
    this.img.frameIndex = 0;
    this.w = 100;
    this.h = 100;
    this.vy = 1;
    this.vx = 20;
    this.floor = false;
    this.positionF = undefined;
    this.contador = 0;
    this.effect = undefined;
  }
  draw(framesCounter) {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      Math.floor(this.img.width / this.img.frames),
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animateImg(framesCounter);
  }

  // draw() {
  //    if (this.y <= - 100 || this.y > this.canvasH - 100) this.changeY();
  //   if (this.x <= 0 || this.x > this.canvasW - 100) this.changeX();
  //   this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  // }
    animateImg(framesCounter) {
      // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
      if (framesCounter % 9 === 0) {
        this.img.frameIndex += 1;

        // Si el frame es el último, se vuelve al primero
        if (this.img.frameIndex > 7) this.img.frameIndex = 0;
      }
    }
  changeY() {
    this.vy *= -1;
  }
  blockY() {
    this.vy = 0;
  }

  blockX() {
    this.vx = 0;
  }
  unblockX() {
    this.vx = 20;
  }
  changeX() {
    this.vx *= -1;
  }
  jump() {
    this.soundJump()
    this.y -= 5;
    this.vy -= 10;
    this.floor = false;
    this.contador++;
  }
  gravity() {
    let gravity = 0.4;

    if (this.y >= this.y0) {
      this.vy = 2;
      this.y = this.y0;
    } else if (this.floor) {
      this.vy = 0;
      this.y = this.positionF;
    } else {
      this.vy += gravity;
      this.y += this.vy;
    }
  }

  moveLeft() {
    if (this.x > 0) this.x -= this.vx;
  }

  moveRight() {
    if (this.x < this.canvasW - this.w) this.x += this.vx;
  }
  soundJump() {
    this.effect = new Audio()
    this.effect.src = "songs/Salto.wav"
    this.effect.play()
  }
}
