const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

// const Colors = ["#fb5500", "#bbc", "#a8dadc", "#457b9d", "#003049"];
const Colors = ["#e71d36", "#ddf", "#2ec4b6", "#ff9f1c", "#011627"];
const mouse = {
  x: undefined,
  y: undefined,
};
const maxRadius = 64;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onload = () => {
  main();
};

window.addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function Sphere(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = Colors[Math.floor(Math.random() * Colors.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
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
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 2;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 2;
    }

    this.draw();
  };
}

const main = () => {
  const Spheres = [];

  for (let i = 0; i < 1500; i++) {
    let radius = Math.floor(Math.random() * 6) + 1,
      x = Math.random() * (innerWidth - 2 * radius) + radius,
      y = Math.random() * (innerHeight - 2 * radius) + radius,
      dx = (Math.random() - 0.5) * 4,
      dy = (Math.random() - 0.5) * 4;

    console.log(x, y, dx, dy);
    Spheres.push(new Sphere(x, y, dx, dy, radius));
  }

  animate(Spheres);
};

const animate = (Spheres) => {
  c.clearRect(0, 0, innerWidth, innerHeight);

  Spheres.forEach((s) => {
    s.update();
  });

  requestAnimationFrame(() => {
    animate(Spheres);
  });
};
