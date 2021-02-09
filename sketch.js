let cels = [];
let foods = [];
function setup() {
  frameRate(150);
  createCanvas(1280, 720);
  for (let c = 0; c < 10; c++) {
    cels.push(new Cell(random(width), random(height), 15));
  }
  for (let c = 0; c < 500; c++) {
    foods.push(new Food(random(30, width - 30), random(30, height - 30)));
  }
}
setInterval(() => {
  foods.push(new Food(randomInt(30, width - 30), randomInt(30, height - 30)));
}, 250);
function draw() {
  background(255);
  cels.forEach((c) => c.run());
  foods.forEach((c) => c.run());
}
