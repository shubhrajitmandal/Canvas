window.onload = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  const mouse = {
    x: null,
    y: null,
    radius: 150,
  };
  let particleArray;

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseout", (e) => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  ctx.font = "48px Calibri";
  ctx.fillStyle = "#ff0055";
  ctx.fillText("Hello World!", 0, 64);
  const text = ctx.getImageData(0, 0, 320, 64);
  console.log(text, text.data);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 31 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = "#00ff55";
      ctx.fillStyle = "#fff";
      ctx.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
      ctx.stroke();
      // ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let maxDistance = mouse.radius;

      let fx = dx / distance;
      let fy = dy / distance;
      let force = (maxDistance - distance) / maxDistance;

      if (distance < mouse.radius) {
        this.x -= fx * force * this.density;
        this.y -= fy * force * this.density;
      } else {
        if (this.x != this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y != this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    }
  }

  function init() {
    particleArray = [];
    let adjustX = 20;
    let adjustY = 20;
    for (let y = 0, y2 = text.height; y < y2; y++) {
      for (let x = 0, x2 = text.width; x < x2; x++) {
        if (text.data[y * 4 * text.width + x * 4 + 3] > 128) {
          let posX = x + adjustX;
          let posY = y + adjustY;

          particleArray.push(new Particle(posX * 7, posY * 7));
        }
      }
    }

    // for (let i = 0; i < 1000; i++) {
    //   particleArray.push(
    //     new Particle(Math.random() * innerWidth, Math.random() * innerHeight)
    //   );
    // }
  }

  // function connect() {
  //   particleArray.map((p) => {
  //     for (let i = 0; i < particleArray.length; i++) {
  //       let distance = Math.sqrt(
  //         (particleArray[i].x - p.x) ** 2 + (particleArray[i].y - p.y) ** 2
  //       );
  //       if (distance < 16) {
  //         ctx.beginPath();
  //         ctx.fillStyle = "#ff0055";
  //         ctx.moveTo(p.x, p.y);
  //         ctx.lineTo(particleArray[i].x, particleArray[i].y);
  //         ctx.fill();
  //       }
  //     }
  //   });
  // }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    particleArray.map((p) => {
      p.draw();
      p.update();
    });

    // connect();
  }

  init();
  animate();
};
