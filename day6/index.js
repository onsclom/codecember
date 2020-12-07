// @format
const zoom = 10;
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
  //  circle(windowWidth / 2, windowHeight / 2, unit * 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
