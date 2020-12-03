// @format
const zoom = 10;
const radius = 2.75;
const edge_range = 3;
const distance = 1.5;
let time = 0;
let unit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  background(color(0, 0, 0, 125));
  stroke(255);
  fill(color(0, 0, 0, 0));
  strokeWeight(unit * 0.06);

  let sides = sin(time * 0.01) * edge_range + edge_range + 2;
  //console.log(sides);

  make_polygon((sides - 2) ** 2 + 2, sides, 0);
  make_polygon((sides - 2) ** 2 + 2, sides, (PI * 2) / 3);
  make_polygon((sides - 2) ** 2 + 2, sides, (PI * 4) / 3);
}

function make_polygon(sides, angle, offset) {
  beginShape();
  for (let cur = 0; cur < sides; cur++) {
    let sx =
      windowWidth / 2 + cos((cur / sides) * 2 * PI + angle) * radius * unit;
    let sy =
      windowHeight / 2 + sin((cur / sides) * 2 * PI + angle) * radius * unit;
    vertex(
      sx + cos(offset + time * 0.01) * unit * distance,
      sy + sin(offset + time * 0.01) * unit * distance,
    );
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
