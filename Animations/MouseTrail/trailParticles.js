const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const particleArray = [];
const minRadius = 1;
let hue = 0;

window.onload = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = `hsl(${hue}, 100% , 50%)`;
      this.dx = (Math.random() - 0.5) * 5;
      this.dy = (Math.random() - 0.5) * 5;
      this.radius = Math.random() * 7 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.radius > minRadius) this.radius -= 0.1;

      this.draw();
    }
  }

  canvas.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 10; i++) {
      particleArray.push(new Particle(e.x, e.y));
    }
  });

  function animateParticles() {
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
      for (let j = i; j < particleArray.length; j++) {
        let dx = particleArray[i].x - particleArray[j].x;
        let dy = particleArray[i].y - particleArray[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.strokeStyle = particleArray[i].color;
          ctx.lineWidth = particleArray[i].radius / 10;
          ctx.beginPath();
          ctx.moveTo(particleArray[i].x, particleArray[i].y);
          ctx.lineTo(particleArray[j].x, particleArray[j].y);
          ctx.stroke();
        }
      }
      if (particleArray[i].radius < minRadius) {
        particleArray.splice(i, 1);
        i--;
      }
    }
  }

  function animate() {
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    animateParticles();
    hue += 5;

    requestAnimationFrame(animate);
  }

  animate();
};

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};
