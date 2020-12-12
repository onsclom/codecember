// @format
let time = 0;
let unit;
const gridSize = 5;
const zoom = gridSize * 2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(0);

  rotateY(time * 0.01);
  rotateX(time * 0.008);

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        push();
        fill(256, 256, 256);
        translate(
          (x - gridSize / 2 + 0.5) * unit,
          (y - gridSize / 2 + 0.5) * unit,
          (z - gridSize / 2 + 0.5) * unit,
        );
        //box(unit * 0.9, unit * 0.9);
        sphere(unit * 0.3);
        pop();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
