window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const unit = 20;
  let ref = null;

  canvas.height = 720;
  canvas.width = 1080;

  const startX = canvas.width / 2;
  const startY = canvas.height / 2;

  function Food() {
    this.x =
      Math.floor((Math.random() * (canvas.width - unit)) / unit) * unit + unit;
    this.y =
      Math.floor((Math.random() * (canvas.height - unit)) / unit) * unit + unit;

    this.draw = () => {
      ctx.beginPath();
      // ctx.fillStyle = "#ffc400";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "red";
      ctx.strokeRect(this.x, this.y, -unit, unit);
    };
  }

  function Snake() {
    this.body = [
      [startX, startY],
      [startX - unit, startY],
      [startX - 2 * unit, startY],
      [startX - 3 * unit, startY],
    ];
    this.dx = unit;
    this.dy = 0;
    this.food = new Food();
    this.gameOver = false;

    window.addEventListener("keydown", (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 38 && this.dy === 0) {
        this.dx = 0;
        this.dy = -unit;
      } else if (e.keyCode === 39 && this.dx === 0) {
        this.dx = unit;
        this.dy = 0;
      } else if (e.keyCode === 40 && this.dy === 0) {
        this.dx = 0;
        this.dy = unit;
      } else if (e.keyCode === 37 && this.dx === 0) {
        this.dx = -unit;
        this.dy = 0;
      }
    });

    this.getHead = () => {
      return this.body[0];
    };

    this.draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.strokeStyle = "blue";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "blue";

      this.body.forEach(([x, y]) => {
        ctx.fillRect(x, y, -unit, unit);
        ctx.strokeRect(x, y, -unit, unit);
      });

      this.food.draw();
    };

    this.update = () => {
      if (!this.gameOver) {
        let [x, y] = this.getHead();
        x += this.dx;
        y += this.dy;

        let head = [x, y];
        this.body.map(([x, y]) => {
          if (head[0] === x && head[1] === y) {
            this.gameOver = true;
          }
        });

        this.body.unshift(head);
        this.body.pop();

        if (this.body[0][0] > canvas.width || this.body[0][0] + this.dx < 0) {
          this.gameOver = true;
        }

        if (this.body[0][1] + this.dy > canvas.height || this.body[0][1] < 0) {
          this.gameOver = true;
        }

        if (
          this.food.x === this.body[0][0] &&
          this.food.y === this.body[0][1]
        ) {
          // this.food = new Food();  // this teleports the snake
          head = [this.food.x, this.food.y];
          this.body.unshift(head);
          this.food = new Food();
        }

        this.draw();
      } else {
        ctx.font = "48px Ubuntu";
        ctx.fillStyle = "crimson";
        ctx.shadowBlur = 0;
        ctx.strokeText(
          "GAME OVER!",
          canvas.width / 2 - 100,
          canvas.height / 2 - 24
        );
        cancelAnimationFrame(ref);
      }
    };
  }

  const s = new Snake();
  s.draw();

  function run() {
    setTimeout(() => {
      ref = requestAnimationFrame(run);

      s.update();
    }, 1000 / 10);
  }

  run();
};

// class Snake {
//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     // this.len = 1;
//     // this.dx = unit;
//     // this.dy = 0;
//   }

//   // draw = () => {
//   //   ctx.beginPath();
//   //   ctx.moveTo(this.x, this.y);
//   //   ctx.fillRect(this.x, this.y, unit, unit);
//   // };
// }
