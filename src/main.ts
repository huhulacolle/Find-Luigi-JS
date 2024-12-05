import { Luigi } from "./Luigi";
import Mario from "./Mario";
import "./style.css";

const button = document.getElementById("launchGame") as HTMLElement;

button.addEventListener("click", () => {
  const container = document.getElementById("container") as HTMLElement;
  container.innerHTML =
    '<canvas id="Game" width="400" height="400"></canvas>';
  start();
});

function start() {
  const canvas = document.getElementById("Game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const audio = document.getElementById("audio") as HTMLAudioElement;

  audio.play();

  let head: Mario[] = [];

  const luigi = new Luigi(ctx, canvas);

  head.push(luigi);

  for (let i = 0; i < 100; i++) {
    head.push(new Mario(ctx, canvas));
  }

  const moving = () => {
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      head.forEach((h) => {
        h.update();
        h.drawImage();
      });
    }

    window.requestAnimationFrame(moving);
  };

  moving();

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    head.forEach((h) => {
      const position = h.getPosition();
      if (
        x >= position.x &&
        x <= position.x + h.getSize() &&
        y >= position.y &&
        y <= position.y + h.getSize()
      ) {
        if (h instanceof Luigi) {
          alert("Belle bite");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          head = [];
          start();
        }
      }
    });
  });
}
