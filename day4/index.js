// @format
const zoom = 15;
let time = 0;
let unit;
let x, y, i, t;
x = y = t = 0;

a = 3.423232231;
b = -2.4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(color(255, 255, 255, 100));
}

function draw() {
  background(color(0, 0, 0, 25));

  unit = windowHeight / zoom;
  noStroke();

  const dist = unit * 3;
  for (i = 2000; i--; ) {
    time += 0.0005;
    d = sin(time * 0.01) * -1.663;
    c = cos(time * 0.01) * 0.771;
    circle(
      x * dist + windowWidth / 2,
      y * dist + windowHeight / 2,
      unit * 0.01,
    );
    x = sin(a * y) - cos(b * x);
    y = sin(c * x) - cos(d * y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  time = 0;
  x = y = t = 0;
}
