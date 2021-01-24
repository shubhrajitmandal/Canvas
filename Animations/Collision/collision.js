window.onload = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.dx = (Math.random() - 0.5) * 10;
      this.dy = (Math.random() - 0.5) * 10;
      this.density = Math.random() * 30 + 10;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      // ctx.fillRect(this.x, this.y, this.radius, this.radius);
      ctx.lineWidth = 2;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx *= -1;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy *= -1;
      }
      this.draw();
    }
  }

  let particles = [];
  for (let i = 0; i < 64; i++) {
    particles.push(
      new Particle(
        Math.random() * (innerWidth - 100) + 50,
        Math.random() * (innerHeight - 100) + 50,
        16,
        "#ff0055"
      )
    );
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let j = 0; j < particles.length; j++) {
      for (let i = j + 1; i < particles.length; i++) {
        let maxDistance = particles[i].radius + particles[j].radius;
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let speed1 = Math.sqrt(particles[j].dx ** 2 + particles[j].dy ** 2);
        let speed2 = Math.sqrt(particles[i].dx ** 2 + particles[i].dy ** 2);
        if (distance < maxDistance) {
          particles[j].dx = (-dx / maxDistance) * speed1;
          particles[j].dy = (-dy / maxDistance) * speed1;
          particles[i].dx = (dx / maxDistance) * speed2;
          particles[i].dy = (dy / maxDistance) * speed2;
        }
      }
      particles[j].update();
    }
  }

  animate();
};

// let dx = mouse.x - this.x;
// let dy = mouse.y - this.y;
// let distance = Math.sqrt(dx * dx + dy * dy);
// let maxDistance = mouse.radius;

// let fx = dx / distance;
// let fy = dy / distance;
// let force = (maxDistance - distance) / maxDistance;

// if (distance < maxDistance) {
//   this.x -= fx * this.density * force;
//   this.y -= fy * this.density * force;
// } else {
//   if (this.x !== this.baseX) {
//     let dx = this.x - this.baseX;
//     this.x -= dx * 0.5;
//   }
//   if (this.y !== this.basey) {
//     let dy = this.y - this.baseY;
//     this.y -= dy * 0.5;
//   }
// }
