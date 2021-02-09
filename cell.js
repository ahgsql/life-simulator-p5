class Cell {
  constructor(x, y, r, soy = null) {
    this.pos = createVector(x, y);
    this.r = r;
    if (soy != null) {
      this.soy = soy;
    } else {
      this.soy = randomInt(1, 4);
    }
    switch (this.soy) {
      case 1:
        this.c = { r: 255, g: 50, b: 50, a: 150 };
        break;
      case 2:
        this.c = { r: 55, g: 250, b: 50, a: 150 };
        break;
      case 3:
        this.c = { r: 55, g: 50, b: 250, a: 150 };
    }
    this.findVel();
    this.speed = 5 - randomInt(1, 4);
    this.alive = true;
  }

  run() {
    if (this.alive) {
      this.move();
      this.lookFood();
      this.eatFood();
      this.kackovala();
      this.draw();
    }
  }
  move() {
    if (frameCount % this.speed == 0) {
      this.pos.add(this.vel);
    }
    if (this.pos.x - this.r < 0 || this.pos.x + this.r > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
      this.vel.y *= -1;
    }
    this.pos.x = constrain(this.pos.x, 0 + this.r, width - this.r);
    this.pos.y = constrain(this.pos.y, 0 + this.r, height - this.r);
  }
  draw() {
    push();
    strokeWeight(this.r / 10);
    stroke(this.c.r + 50, this.c.g + 50, this.c.b, this.c.a);
    fill(this.c.r, this.c.g, this.c.b, this.c.a);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }
  findVel() {
    this.vel = randomVector(-2, 3);
  }
  lookFood() {
    let nearestfood = null;
    let tempDist = width * 2;
    foods.forEach((food) => {
      if (food.alive) {
        let mes = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
        if (mes < this.r * 5) {
          if (mes < tempDist) {
            nearestfood = food;
            tempDist = mes;
          }
        }
      }
    });
    if (nearestfood) {
      this.vel = createVector(
        constrain(nearestfood.pos.x - this.pos.x, -2, 2),
        constrain(nearestfood.pos.y - this.pos.y, -2, 2)
      );
    }
  }
  eatFood() {
    foods.forEach((food) => {
      if (food.alive) {
        let mes = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
        if (mes < this.r) {
          food.alive = false;
          this.r += 1;
          this.speed += 0.5;
          this.findVel();
        }
      }
    });
  }

  kackovala() {
    cels.forEach((cell) => {
      if (cell != this) {
        if (cell.alive) {
          let mes = dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y);

          // Ölüm Çiftleşme Kısmı
          if (mes < this.r - cell.r / 2) {
            //AYNI IRKLAR
            if (this.soy == cell.soy) {
              //yeterince olgunlar, çoğal

              if (this.r > 25 && cell.r > 25) {
                this.r -= 10;
                cell.r -= 10;
                cels.push(new Cell(this.pos.x, this.pos.y, 10, this.soy));
              } else {
                //değiller
              }
            } else {
              //FARKLI IRKLAR
              if (this.r > cell.r) {
                this.r += cell.r / 4;
                cell.alive = false;
                //this.speed += 1;
              } else if (this.r < cell.r) {
                cell.r += this.r / 4;
                cell.speed += 1;
                //this.alive = false;
              }
            }
          }
          // Kaç Kovala Kısmı
          else if (mes < this.r * 3) {
            //AYNI SOYDANLARSA VE YETERİNCE BÜYÜKLERSE YAKLAŞSINLAR
            if (this.soy == cell.soy) {
              if (this.r > 25 && cell.r > 25) {
                this.vel = createVector(
                  constrain(cell.pos.x - this.pos.x, -2, 2),
                  constrain(cell.pos.y - this.pos.y, -2, 2)
                );
              }
            } else {
              if (this.r > cell.r) {
                this.vel = createVector(
                  constrain(cell.pos.x - this.pos.x, -2, 2),
                  constrain(cell.pos.y - this.pos.y, -2, 2)
                );
              } else if (this.r < cell.r) {
                this.vel = createVector(
                  -constrain(cell.pos.x - this.pos.x, -2, 2),
                  -constrain(cell.pos.y - this.pos.y, -2, 2)
                );
              }
            }
          }
        }
      }
    });
  }
}
