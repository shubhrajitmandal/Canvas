window.onload = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  const Colors = [
    "rgba(255, 0, 85, 1)",
    "rgba(255, 85, 0, 1)",
    "rgba(0, 85, 255, 1)",
    "rgba(0, 255, 85, 1)",
    "rgba(85, 0, 255, 1)",
    "rgba(85, 255, 0, 1)",
    "rgba(255, 255, 255, 1)",
    "rgba(240, 240, 0, 1)",
  ];
  let Ripples = [];
  let RippleCount = 8;
  window.addEventListener("click", (e) => {
    Ripples.push(new Ripple(e.x, e.y, RippleCount));
  });

  class Ring {
    constructor(x, y, radius, dr, maxR) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dr = dr;
      this.maxRadius = maxR;
    }

    draw(color) {
      let opacity = 1;
      if (this.radius < this.maxRadius) {
        this.radius += this.dr;
        opacity = 0.6 - this.radius / this.maxRadius;
        color = color.replace("1", opacity);

        ctx.beginPath();
        // ctx.lineWidth = 128 / this.radius;
        // ctx.strokeStyle = `rgba(124, 252, 0, ${opacity})`;
        ctx.shadowBlur = 32;
        ctx.shadowColor = "#000";
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class Ripple {
    constructor(x, y, n) {
      this.x = x;
      this.y = y;
      this.waveCount = n;
      this.waves = [];
      this.color = Colors[Math.floor(Math.random() * Colors.length)];
      for (let i = 1; i < this.waveCount; i++) {
        this.waves.push(
          new Ring(
            x,
            y,
            (RippleCount - i) * 12,
            3 - 0.4 * i,
            (RippleCount - i) * 64
          )
        );
      }
    }

    drawRipples() {
      this.waves.map((w) => {
        w.draw(this.color);
      });
    }
  }

  setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    Ripples.map((ripple) => {
      ripple.drawRipples();
    });
  }, 17);
};

// !!!### requestAnimationFrame doesn't work properly
// function animate() {
//   requestAnimationFrame(animate);

//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   Ripples.map((r) => r.update());
// }
