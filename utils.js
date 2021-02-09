function randomColor() {
  r = random(255); // r is a random number between 0 - 255
  g = random(11, 250); // g is a random number betwen 100 - 200
  b = random(255); // b is a random number between 0 - 100
  a = random(150, 255); // a is a random number between 200 - 255
  return { r, g, b, a };
}
function randomVector(min, max) {
  let r1 = random(5);
  let r2 = random(5);
  let x, y;
  x = r1 < 3 ? min : max;
  y = r2 < 3 ? min : max;
  return createVector(x, y);
}
function randomInt(min, max) {
  return floor(random(min, max));
}
function findDirection(x1, y1, x2, y2) {
  return createVector(x2 - x1, y2 - y1);
}
