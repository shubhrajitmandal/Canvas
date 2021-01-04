window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  function generateRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateRandomPoint(x, y, radius) {
    const dist = generateRandomValue(0.1 * radius, 0.99 * radius);
    const angle = generateRandomValue(0, 360);

    return [
      x + dist * Math.cos((angle * Math.PI) / 180),
      y + dist * Math.sin((angle * Math.PI) / 180),
    ];
  }

  function Sphere([x, y]) {
    this.x = x;
    this.y = y;
    this.dx = generateRandomValue(0, 4) * (-1) ** generateRandomValue(0, 2);
    this.dy = generateRandomValue(0, 4) * (-1) ** generateRandomValue(0, 2);
    this.radius = generateRandomValue(4, 8);

    this.draw = () => {
      ctx.beginPath();
      ctx.fillStyle = "#ff5500";
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function Clusters(size, radius) {
    this.x = generateRandomValue(radius, innerWidth - radius);
    this.y = generateRandomValue(radius, innerHeight - radius);
    this.radius = radius;
    this.spheres = [];

    for (let i = 0; i < size; i++) {
      const s = new Sphere(generateRandomPoint(this.x, this.y, this.radius));
      s.draw();
      this.spheres.push(s);
    }

    this.drawAll = function () {
      this.spheres.map((sphere) => {
        for (let i = 0; i < this.spheres.length; i++) {
          ctx.beginPath();
          ctx.strokeStyle = "#ff5500";
          //   ctx.lineWidth = Math.random() * 1.2 + 0.6;
          ctx.lineWidth = 1;
          ctx.moveTo(sphere.x, sphere.y);
          ctx.lineTo(this.spheres[i].x, this.spheres[i].y);
          ctx.stroke();
        }
      });
    };

    this.drawWithinRadius = function (radius) {
      this.spheres.map((s) => {
        for (let i = 0; i < this.spheres.length; i++) {
          if (
            Math.sqrt(
              (this.spheres[i].x - s.x) ** 2 + (this.spheres[i].y - s.y) ** 2
            ) < radius
          ) {
            ctx.beginPath();
            ctx.strokeStyle = "#ff5500";
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.spheres[i].x, this.spheres[i].y);
            ctx.stroke();
          }
        }
      });
    };

    this.update = () => {
      this.spheres.map((s) => {
        if (
          Math.sqrt((this.x - s.x) ** 2 + (this.y - s.y) ** 2) >
          this.radius - s.radius
        ) {
          s.dx = -s.dx;
          s.dy = -s.dy;
        }

        s.x += s.dx;
        s.y += s.dy;

        s.draw();

        // ctx.moveTo(500, 400);
        // ctx.arc(500, 400, 300, 0, 2 * Math.PI);
        // ctx.stroke();
      });

      //   this.drawAll();
      this.drawWithinRadius(150);
    };
  }

  const c1 = new Clusters(100, 450);
  //   const c2 = new Clusters(12);
  //   setInterval(c1.update, 50);

  function animate() {
    setTimeout(() => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      c1.update();
    }, 30);
  }

  animate();
};
