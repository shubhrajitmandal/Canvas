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

  function Sphere([x, y], radius, fixed = false) {
    this.x = x;
    this.y = y;
    if (!fixed) {
      this.dx = Math.random() * 3 - 1.5;
      this.dy = Math.random() * 3 - 1.5;
    }
    this.radius = radius;

    this.draw = () => {
      ctx.beginPath();
      // if (fixed) {
      //   ctx.shadowBlur = 16;
      //   ctx.shadowColor = "#ff5500";
      //   ctx.fillStyle = "#f2f2f2";
      // } else {
      //   ctx.shadowBlur = 0;
      //   ctx.fillStyle = "#ff5500";
      // }
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#ff5500";
      ctx.fillStyle = "#fff";
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
      this.inCircle.push(
        new Sphere(
          generateRandomPoint(this.x, this.y, this.radius),
          generateRandomValue(4, 6)
        )
      );
    }
    this.onCircle = generatePointOnCircle(this.x, this.y, this.radius, 12).map(
      (center) => new Sphere(center, 6, true)
    );

    this.drawAll = function () {
      this.onCircle.map((s) => {
        s.draw();
      });
      this.inCircle.map((s) => {
        s.draw();
      });
    };

    this.update = (radius) => {
      let opacity = 1;
      this.inCircle.map((s) => {
        for (let i = 0; i < this.inCircle.length; i++) {
          let distance = Math.sqrt(
            (this.inCircle[i].x - s.x) ** 2 + (this.inCircle[i].y - s.y) ** 2
          );
          if (distance < radius) {
            ctx.beginPath();
            ctx.shadowBlur = 0;
            ctx.lineWidth = 1.2;
            opacity = 1 - distance / radius;
            ctx.strokeStyle = `rgba(255, 85, 0, ${opacity})`;
            ctx.setLineDash([8, 8]);
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.inCircle[i].x, this.inCircle[i].y);
            ctx.stroke();
          }
        }
      });

      this.onCircle.map((s) => {
        for (let i = 0; i < this.inCircle.length; i++) {
          let distance = Math.sqrt(
            (this.inCircle[i].x - s.x) ** 2 + (this.inCircle[i].y - s.y) ** 2
          );
          if (distance < radius) {
            ctx.beginPath();
            ctx.lineWidth = 1.2;
            opacity = 1 - distance / radius;
            ctx.strokeStyle = `rgba(255, 85, 0, ${opacity})`;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.inCircle[i].x, this.inCircle[i].y);
            ctx.stroke();
          }
        }
      });

      this.onCircle.map((s) => {
        for (let i = 0; i < this.onCircle.length; i++) {
          let distance = Math.sqrt(
            (this.onCircle[i].x - s.x) ** 2 + (this.onCircle[i].y - s.y) ** 2
          );
          if (distance < 400) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            opacity = 1 - distance / 800;
            ctx.strokeStyle = `rgba(255, 85, 0, ${opacity})`;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(this.onCircle[i].x, this.onCircle[i].y);
            ctx.stroke();
          }
        }
      });

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
      });

      this.drawAll();
    };
  }

  const c1 = new Clusters(120, 360);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    c1.update(120);
  }

  animate();
};
