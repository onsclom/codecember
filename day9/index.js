// @format
let time = 0;
let unit;
const gridSize = 20;
const zoom = gridSize * 2;
const resetProb = 0.9;

let circles = [];
let last = [];
let changed;
let resetHit = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
  colorMode(HSB, 100);

  resetCircles();

  updateAlive();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log('left hit');
    changed = 0;
    resetHit = true;
  }
}

function resetCircles() {
  circles = [];
  for (let x = 0; x < gridSize; x++) {
    circles.push([]);
    for (let y = 0; y < gridSize; y++) {
      circles[x].push([]);
      for (let z = 0; z < gridSize; z++) {
        let outcome = Math.random() > resetProb ? 1 : 0;

        circles[x][y].push(outcome);
      }
    }
  }
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(color(0, 0, 0, 100));

  rotateY(time * 0.0025);

  if (time % 10 == 0) {
    last = [];

    updateAlive();

    if (changed == 0 || resetHit) {
      resetHit = false;
      console.log('this triggered');
      resetCircles();
    }
  }

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        push();
        fill(color((x * 10 + y * 20 + z * 30) % 100, 40, 100));
        translate(
          (x - gridSize / 2 + 0.5) * unit,
          (y - gridSize / 2 + 0.5) * unit,
          (z - gridSize / 2 + 0.5) * unit,
        );
        if (circles[x][y][z]) sphere(unit * 0.3);
        pop();
      }
    }
  }
}

function updateAlive() {
  changed = 0;

  let copy = [];
  for (let x = 0; x < gridSize; x++) {
    copy.push([]);
    for (let y = 0; y < gridSize; y++) {
      copy[x].push([]);
      for (let z = 0; z < gridSize; z++) {
        copy[x][y].push(circles[x][y][z]);
      }
    }
  }

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        neighbors = getNeighborAmount(copy, x, y, z);

        if (circles[x][y][z]) {
          if (neighbors != 4 && neighbors != 5) {
            circles[x][y][z] = 0;
            changed++;
          }
        } else {
          if (neighbors == 5) {
            circles[x][y][z] = 1;
            changed++;
          }
        }
      }
    }
  }
}

function getNeighborAmount(circles, x, y, z) {
  let count = 0;
  for (let xoff = -1; xoff < 2; xoff++) {
    for (let yoff = -1; yoff < 2; yoff++) {
      for (let zoff = -1; zoff < 2; zoff++) {
        if (
          x + xoff >= 0 &&
          y + yoff >= 0 &&
          z + zoff >= 0 &&
          x + xoff < gridSize &&
          y + yoff < gridSize &&
          z + zoff < gridSize
        ) {
          if (circles[x + xoff][y + yoff][z + zoff] == 1) {
            count += 1;
          }
        } else {
        }
      }
    }
  }
  return count;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
