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

  function generatePointOnCircle(x, y, radius, num) {
    const angle = 360 / num;
    const points = [];

    for (let i = 0; i < num; i++) {
      const point = [
        x + radius * Math.cos((i * angle * Math.PI) / 180),
        y + radius * Math.sin((i * angle * Math.PI) / 180),
      ];
      points.push(point);
    }

    return points;
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
    this.inCircle = [];
    this.onCircle = [];

    for (let i = 0; i < size; i++) {
      const s = new Sphere(generateRandomPoint(this.x, this.y, this.radius));
      s.draw();
      this.inCircle.push(s);
    }

    // for (let i = 0; i < 12; i++) {
    //   const s = new Sphere(
    //     generateRandomPoint(this.x, this.y, this.radius, true)
    //   );
    //   s.draw();
    //   this.onCircle.push(s);
    // }

    this.onCircle = generatePointOnCircle(this.x, this.y, this.radius, 12).map(
      (center) => new Sphere(center)
    );

    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    this.drawAll = function () {
      this.inCircle.map((sphere) => {
        for (let i = 0; i < this.inCircle.length; i++) {
          ctx.beginPath();
          ctx.strokeStyle = "#ff5500";
          //   ctx.lineWidth = Math.random() * 1.2 + 0.6;
          ctx.lineWidth = 1;
          ctx.moveTo(sphere.x, sphere.y);
          ctx.lineTo(this.inCircle[i].x, this.inCircle[i].y);
          ctx.stroke();
        }
      });
    };

    this.drawWithinRadius = function (radius) {
      this.onCircle.map((s) => {
        s.draw();
        for (let i = 0; i < this.inCircle.length; i++) {
          if (
            Math.sqrt(
              (this.inCircle[i].x - s.x) ** 2 + (this.inCircle[i].y - s.y) ** 2
            ) < radius
          ) {
            ctx.beginPath();
            ctx.strokeStyle = "#ff5500";
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.inCircle[i].x, this.inCircle[i].y);
            ctx.stroke();
          }
        }
      });

      this.inCircle.map((s) => {
        for (let i = 0; i < this.inCircle.length; i++) {
          if (
            Math.sqrt(
              (this.inCircle[i].x - s.x) ** 2 + (this.inCircle[i].y - s.y) ** 2
            ) < radius
          ) {
            ctx.beginPath();
            ctx.strokeStyle = "#ff5500";
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.inCircle[i].x, this.inCircle[i].y);
            ctx.stroke();
          }
        }
      });
    };

    this.update = () => {
      this.inCircle.map((s) => {
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
      });

      //   this.drawAll();
      this.drawWithinRadius(120);
    };
  }

  const c1 = new Clusters(64, 400);
  //   setInterval(c1.update, 50);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    c1.update();
  }

  animate();
};
