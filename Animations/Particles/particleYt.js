const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 100) * (canvas.width / 100),
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

class Particle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dy = -this.dy;
    }

    //check collision
    if (
      Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2) <
      mouse.radius + this.radius
    ) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
      }
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numParticles = (canvas.height * canvas.width) / 9000;
  console.log(numParticles);
  for (let i = 0; i < numParticles; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 2 - radius * 2) + radius * 2;
    let y =
      Math.random() * (innerHeight - radius * 2 - radius * 2) + radius * 2;
    let dx = Math.random() * 5 - 2.5;
    let dy = Math.random() * 5 - 2.5;
    let color = "yellow";

    particlesArray.push(new Particle(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

function connect() {
  let opacity = 1;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      let distance =
        (particlesArray[i].x - particlesArray[j].x) ** 2 +
        (particlesArray[i].y - particlesArray[j].y) ** 2;

      opacity = 1 - distance / 30000;

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        ctx.strokeStyle = `rgba(255, 210, 0, ${opacity})`;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();
