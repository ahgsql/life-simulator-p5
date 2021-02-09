class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 6;
    this.c = { r: 0, g: 206, b: 245, a: 255 };
    this.type = "food";
    this.alive = true;
  }

  run() {
    if (this.alive) {
      this.draw();
    }
  }

  draw() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.c.r, this.c.g, this.c.b, 205);
    rect(this.pos.x, this.pos.y, this.r, this.r);
    pop();
  }
}
