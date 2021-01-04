const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// const Colors = ["#f0f", "#ff0", "#0ff"];
const Colors = [
  "#fc5c65",
  "#f6b93b",
  "#079992",
  "#e58e26",
  "#20bf6b",
  "#a55eea",
];

window.onload = () => {
  main();
};

window.onresize = () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
};

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = Colors[Math.floor(Math.random() * Colors.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.strokeStyle = this.color;
    c.lineWidth = 2;
    c.stroke();
  };

  this.update = function () {
    if (this.x > innerWidth - this.radius || this.x < this.radius) {
      this.dx = -this.dx;
    }

    if (this.y > innerHeight - this.radius || this.y < this.radius) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

function main() {
  const circles = [];

  for (let i = 0; i < 256; i++) {
    let radius = Math.floor(Math.random() * 56) + 8,
      x = Math.random() * (innerWidth - 2 * radius) + radius,
      y = Math.random() * (innerHeight - 2 * radius) + radius,
      dx = (Math.random() - 0.5) * 6,
      dy = (Math.random() - 0.5) * 6;

    circles.push(new Circle(x, y, dx, dy, radius));
  }

  animate(circles);
}

function animate(circles) {
  c.clearRect(0, 0, innerWidth, innerHeight);

  circles.forEach((cirlce) => {
    cirlce.update();
  });

  c.font = "96px Quicksand";
  c.fillStyle = "skyblue";
  c.fillText("Hello World!", innerWidth / 2 - 200, innerHeight / 2);

  requestAnimationFrame(() => {
    animate(circles);
  });
}
