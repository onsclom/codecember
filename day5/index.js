// @format
const zoom = 10;
let time = 0;
let unit;

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  particles.push(new Particle(0, 0));
}

function draw() {
  time += 1;
  unit = windowHeight / zoom;
  const bg_color = 0;
  background(bg_color, bg_color, bg_color, 10);
  noStroke();
  fill(255, 255, 255, 50);

  if (mouseIsPressed) {
    let newAmount = floor(random() * 10);
    const randAmount = 1;
    for (let i = 0; i < newAmount; i++) {
      let new_x = mouseX - windowWidth / 2;
      let new_y = mouseY - windowHeight / 2;
      let randAngle = random() * 2 * PI;
      let randRadius = random() * 0.5;
      new_x += cos(randAngle) * randRadius * randAmount * unit;
      new_y += sin(randAngle) * randRadius * randAmount * unit;
      particles.push(new Particle(new_x, new_y));
    }
  }

  let new_particles = [];
  for (let particle of particles) {
    if (particle.update()) {
      new_particles.push(particle);
      particle.draw();
    }
  }
  particles = new_particles;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y) {
    this.diameter = 0.02;
    this.x = x;
    this.y = y;
  }

  draw() {
    circle(
      this.x + windowWidth / 2,
      this.y + windowHeight / 2,
      unit * this.diameter,
    );
  }

  update() {
    this.x += unit * 0.01;
    let xMap = this.x / unit;
    let yMap = this.y / unit;
    let randAngle = noise(xMap, yMap) * 2 * PI;
    randAngle += random() * 1.0;

    this.x += unit * 0.03 * cos(randAngle);
    this.y += unit * 0.03 * sin(randAngle);

    if (abs(this.x) > windowWidth / 2 || abs(this.y) > windowHeight / 2)
      return false;
    return true;
  }
}
