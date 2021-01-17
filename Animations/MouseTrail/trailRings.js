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
    "rgba(255, 255, 255, 1)",
    "rgba(255, 0, 85, 1)",
    "rgba(255, 85, 0, 1)",
    "rgba(0, 85, 255, 1)",
    "rgba(0, 255, 85, 1)",
    "rgba(85, 0, 255, 1)",
    "rgba(85, 255, 0, 1)",
    "rgba(240, 240, 0, 1)",
  ];
  let Ripples = [];
  let RippleCount = 6;

  window.addEventListener("mousemove", (e) => {
    if (Ripples.length === 0) {
      Ripples.push(new Ripple(e.x, e.y, RippleCount));
    } else if (
      Math.sqrt(
        (Ripples[Ripples.length - 1].x - e.x) ** 2 +
          (Ripples[Ripples.length - 1].y - e.y) ** 2
      ) > 150
    ) {
      Ripples.push(new Ripple(e.x, e.y, RippleCount));
    }
  });

  class Ring {
    constructor(x, y, radius, dr, maxR) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dr = dr;
      this.maxRadius = maxR;
    }

    draw(color, i) {
      let opacity = 1;
      if (this.radius < this.maxRadius) {
        this.radius += this.dr;
        opacity = 1.6 - this.radius / this.maxRadius;
        color = color.replace("1", opacity);

        ctx.beginPath();
        ctx.lineWidth = 1 + 2 / (i + 1);
        ctx.shadowBlur = 16;
        ctx.shadowColor = Colors[3];
        ctx.strokeStyle = color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  class Ripple {
    constructor(x, y, n) {
      this.x = x;
      this.y = y;
      this.waveCount = n;
      this.waves = [];
      this.color = Colors[0];
      for (let i = 1; i < this.waveCount; i++) {
        this.waves.push(
          new Ring(x, y, (RippleCount - i) * 20, 2, (RippleCount - i) * 48)
        );
      }
    }

    drawRipples() {
      this.waves.map((w, i) => {
        w.draw(this.color, i);
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    Ripples.map((ripple) => {
      ripple.drawRipples();
    });
  }

  animate();
};
