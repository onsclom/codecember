// @format
const zoom = 10;
const amount = 8;
const spacing = 0.5;
const len = 0.2;
let time = 0;
let unit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(0);
  stroke(255);
  strokeWeight(unit * 0.02);
  for (let x = -amount; x <= amount; x++) {
    for (let y = -amount; y <= amount; y++) {
      const r = 0.2;
      draw_line(x, y);
    }
  }
}

function draw_line(x, y) {
  const origin = [
    unit * spacing * x + windowWidth * 0.5,
    unit * spacing * y + windowHeight * 0.5,
  ];

  const angle = PI / 2 + x * 0.1 + y * 0.1 + time * 0.015;

  const start = [
    origin[0] + cos(angle) * len * unit,
    origin[1] + sin(angle) * len * unit,
  ];
  const end = [
    origin[0] - cos(angle) * len * unit,
    origin[1] - sin(angle) * len * unit,
  ];

  line(start[0], start[1], end[0], end[1]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
