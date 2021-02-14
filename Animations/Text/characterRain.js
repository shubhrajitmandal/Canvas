const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const charString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789一二三四千万上中下左右大小东南西北金木水火土天地日月星黑白红住衣行育乐忠孝仁爱信义和平子曰父母兄弟";
let charArray = [];
let hue = Math.floor(Math.random() * 360);

window.onload = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    charArray = [];
    init();
  });

  class CharacterString {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.floor(Math.random() * 24) + 16;
      this.dy = 100 / this.size;
      this.fontSize = 16;
      this.value = [];
      for (let i = 0; i < this.size; i++) {
        this.value.push(
          charString[Math.floor(Math.random() * charString.length)]
        );
      }
    }

    draw() {
      ctx.beginPath();
      ctx.font = `${this.fontSize}px Noto Serif SC`;
      for (let i = 0; i < this.size; i++) {
        let saturation = 100 - i;
        let lightness = 50 - i;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillText(this.value[i], this.x, this.y - i * this.fontSize);
      }
    }

    update() {
      this.y += this.dy;

      if (this.y - this.size * this.fontSize > innerHeight) {
        this.y = 0;
      }

      this.draw();
    }
  }

  function init() {
    let cols = Math.floor(innerWidth / 20);
    for (let i = 0; i < cols; i++) {
      let y = Math.random() * innerHeight;
      charArray.push(new CharacterString(i * 20, y));
    }
  }

  function characterRain() {
    for (let i = 0; i < charArray.length; i++) {
      charArray[i].update();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    characterRain();
    requestAnimationFrame(animate);
  }

  init();
  animate();
  //   setInterval(animate, 17);
};
