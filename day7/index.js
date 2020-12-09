// @format
const zoom = 10;
let time = 0;
let unit;
const speed = 0.02;
const squareSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  rectMode(CENTER);
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(0, 0, 0, 20);
  stroke(255);
  strokeWeight(unit * 0.02);
  //  circle(windowWidth / 2, windowHeight / 2, unit * 2);
  for (let y = 0; y < squareSize; y++) {
    for (let x = 0; x < squareSize; x++) {
      drawPart(x, y);
    }
  }
}

function drawPart(x, y) {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  let distanceMod = 8 + sin(time * speed);

  let curMult = sin(time * speed) / 2 + 0.5;
  let offsetx = (noise(x, y) - 0.5) * curMult * unit;
  let offsety = (noise(y, x) - 0.5) * curMult * unit;

  push();
  translate(
    offsetx +
      centerX +
      (x - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
    offsety +
      centerY +
      (y - squareSize / 2 + 0.5) * ((unit / squareSize) * distanceMod),
  );

  let angle = (x + y) % PI;
  console.log(angle);
  angle *= sin(time * speed) / 2 + 0.5;

  rotate(angle);

  square(0, 0, (unit * 5) / squareSize);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
