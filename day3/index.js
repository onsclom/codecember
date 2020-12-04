// @format
const zoom = 10;
const lines = 100;
const steps = 500;
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
  fill(125);
  strokeWeight(unit * 0.07);
  noFill();

  for (let cur = 9; cur < lines; cur++) {
    let points = [];
    for (let step = 1; step < steps; step++) {
      let x =
        windowWidth / 2 + windowHeight * (step / steps) - windowHeight / 2;
      let y = windowHeight * (cur / lines);
      const grain = 0.05;
      let offset = noise(step * grain + cur * 777) * unit * 1;
      offset *= 1;

      let distance = abs(step - steps / 2) / (steps / 2);
      distance = 1 - distance;
      distance **= 2;
      points.push([x, y - offset * distance]);
    }
    drawLine(points, cur);
    fillLayer(points);
  }
}

function drawLine(points, cur) {
  push();
  colorMode(HSB, 100);
  stroke(cur, 25, 100);
  beginShape();
  for (let point of points) {
    vertex(point[0], point[1]);
  }
  endShape();
  pop();
}

function fillLayer(points) {
  push();
  noStroke();
  fill(0);
  beginShape();
  vertex(windowWidth / 2 - windowHeight / 2, windowHeight);
  for (let point of points) {
    vertex(point[0], point[1]);
  }
  vertex(windowWidth / 2 + windowHeight / 2, windowHeight);
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
