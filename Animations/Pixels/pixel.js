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
    x: undefined,
    y: undefined,
    radius: 120,
  };
  let pixelArray = [];

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseout", (e) => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  const image = new Image();
  image.src = "./blossoms.jpg";
  let Colors = [];

  image.onload = () => {
    ctx.drawImage(image, 50, 100, 400, 240);
    const imgObj = ctx.getImageData(50, 100, 400, 240);

    const data = imgObj.data;
    const greyImg = ctx.createImageData(400, 240);
    for (var i = 0; i < data.length; i += 4) {
      Colors.push(
        `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3] / 255})`
      );
      // let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      // greyImg.data[i] = avg;
      // greyImg.data[i + 1] = avg;
      // greyImg.data[i + 2] = avg;
      // greyImg.data[i + 3] = 255;

      // data[i] = avg;
      // data[i + 1] = avg;
      // data[i + 2] = avg;
    }

    // ctx.putImageData(imgObj, 550, 100);
    // ctx.putImageData(greyImg, 1050, 100);

    for (let y = 0; y < 240; y += 2) {
      for (let x = 0; x < 400; x += 2) {
        const pixel = new Particle(
          x * 2 + 100,
          y * 2 + 100,
          2,
          Colors[y * 400 + x]
        );
        pixel.draw();
        pixelArray.push(pixel);
      }
    }

    animate();
  };

  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 30 + 10;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      // ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let maxDistance = mouse.radius;

      let fx = dx / distance;
      let fy = dy / distance;
      let force = (maxDistance - distance) / maxDistance;

      if (distance < maxDistance) {
        this.x -= fx * this.density * force;
        this.y -= fy * this.density * force;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx * 0.5;
        }
        if (this.y !== this.basey) {
          let dy = this.y - this.baseY;
          this.y -= dy * 0.5;
        }
      }

      this.draw();
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pixelArray.map((p) => {
      p.update();
    });
  }
};
