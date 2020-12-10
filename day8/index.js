// @format
const zoom = 10;
let time = 0;
let unit;
const speed = 0.05;
const squareSize = 25;

let points = [];
for (let x = 0; x < squareSize; x++) {
  points.push([]);
  for (let y = 0; y < squareSize; y++) {
    points[x].push(0);
  }
}
console.log(points);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  rectMode(CENTER);
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(0, 0, 0);
  stroke(255);
  strokeWeight(unit * 0.02);
  for (let y = 0; y < squareSize; y++) {
    for (let x = 0; x < squareSize; x++) {
      points[y][x] = drawPart(x, y);
    }
  }

  drawLines();
}

function drawPart(x, y) {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  let distanceMod = 8;
  const noiseAmount = 1;
  const noiseOffset = 0.2;

  let curMult = 0;
  let offsetx = y % 2 ? 0.25 : -0.25;
  offsetx *= (unit / squareSize) * distanceMod;
  offsetx +=
    (-0.5 +
      noise(
        x * noiseOffset,
        y * noiseOffset,
        sin(time * speed) * noiseOffset,
      )) *
    unit *
    noiseAmount;
  let offsety = 0;
  offsety =
    (-0.5 +
      noise(
        100 + x * noiseOffset,
        100 + y * noiseOffset,
        sin(time * speed) * noiseOffset,
      )) *
    unit *
    noiseAmount;

  push();
  translate(
    offsetx +
      centerX +
      (x - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
    offsety +
      centerY +
      (y - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
  );

  let angle = 0;

  //square(0, 0, (unit * 5) / squareSize);

  pop();

  return [
    offsetx +
      centerX +
      (x - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
    offsety +
      centerY +
      (y - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
  ];
}

function drawLines() {
  let lines = [];
  //horizontal lines
  for (let y = 0; y < squareSize; y++) {
    for (let x = 0; x < squareSize; x++) {
      if (x + 1 < squareSize) {
        lines.push([...points[y][x], ...points[y][x + 1]]);
      }
      if (y + 1 < squareSize) {
        lines.push([...points[y][x], ...points[y + 1][x]]);
      }
      if (y % 2 == 1 && x + 1 < squareSize && y + 1 < squareSize) {
        lines.push([...points[y][x], ...points[y + 1][x + 1]]);
      } else if (y % 2 == 0 && x - 1 >= 0 && y + 1 < squareSize) {
        lines.push([...points[y][x], ...points[y + 1][x - 1]]);
      }
    }
  }
  for (let part of lines) {
    line(...part);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
