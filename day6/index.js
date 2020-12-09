// @format
const zoom = 25;
let time = 0;
let unit;

let arcs = [];
let arcAmount = 25;
let curD = 0;

let colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();

  colors = [color(255, 100, 100), color(100, 255, 100), color(100, 100, 255)];

  for (let i = 0; i < arcAmount; i++) {
    let nextThick = random(0.1, 0.7);
    arcs.push(new Arc(curD + nextThick, nextThick + 0.01));
    curD += nextThick * 2;
  }
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(color(0, 0, 0, 100));
  stroke(255);
  strokeWeight(unit * 0.1);
  const speed = 0.05;

  for (let arc of arcs) {
    arc.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Arc {
  constructor(d, thickness) {
    this.d = d;
    this.thickness = thickness;
    this.amount = random(PI / 4, (PI * 3) / 2);
    this.speed = random(0.02, 0.05);
    this.speed *= 0.5;
    this.color = colors[floor(random() * colors.length)];
    this.color = color(floor(random(50, 256)));

    if (random() < 0.5) {
      this.speed *= -1;
    }
  }

  draw() {
    strokeWeight(this.thickness * unit);
    stroke(this.color);
    arc(
      windowWidth / 2,
      windowHeight / 2,
      this.d * unit,
      this.d * unit,
      time * this.speed,
      time * this.speed + this.amount,
    );
  }
}
