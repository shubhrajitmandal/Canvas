window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const color = "#5500ff";

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  window.addEventListener("resize", () => {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
  });

  function Particle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = () => {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 16;
      ctx.shadowColor = color;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    };

    this.update = function () {
      if (this.x > innerWidth - this.radius || this.x < this.radius) {
        this.dx = -this.dx;
      }

      if (this.y > innerHeight - this.radius || this.y < this.radius) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      // Events
      // if (
      //   mouse.x - this.x < 50 &&
      //   mouse.x - this.x > -50 &&
      //   mouse.y - this.y < 50 &&
      //   mouse.y - this.y > -50
      // ) {
      //   if (this.radius < maxRadius) {
      //     this.radius += 2;
      //   }
      // } else if (this.radius > this.minRadius) {
      //   this.radius -= 2;
      // }

      this.draw();
    };
  }

  const main = (size, radius) => {
    const Particles = [];

    for (let i = 0; i < size; i++) {
      let radius = Math.floor(Math.random() * 1) + 5,
        x = Math.random() * (innerWidth - 2 * radius) + radius,
        y = Math.random() * (innerHeight - 2 * radius) + radius,
        dx = (Math.random() - 0.5) * 4,
        dy = (Math.random() - 0.5) * 4;

      Particles.push(new Particle(x, y, dx, dy, radius));
    }

    animate(Particles, radius);
  };

  function animate(Particles, radius) {
    requestAnimationFrame(() => {
      animate(Particles, radius);
    });

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    Particles.forEach((s) => {
      let opacity = 1;
      s.update();
      for (let i = 0; i < Particles.length; i++) {
        const distance = Math.sqrt(
          (Particles[i].x - s.x) ** 2 + (Particles[i].y - s.y) ** 2
        );
        opacity = 1 - distance / radius;
        if (distance < radius) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(85, 0, 255, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
          // ctx.setLineDash([5, 20]);
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(Particles[i].x, Particles[i].y);
          ctx.stroke();
        }
      }
    });
  }

  // const size = (canvas.height * canvas.width) / 9000;
  // const radius = (canvas.height + canvas.width) / 20;
  // console.log(size, radius);
  main(180, 150);
};
