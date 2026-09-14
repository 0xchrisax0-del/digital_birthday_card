document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("confetti-button");

  if (!button) {
    console.error("Error: Could not find an element with id 'confetti-button'");
    return;
  }

  // Setup a global native canvas for drawing the particles
  let canvas = document.getElementById("native-confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "native-confetti-canvas";
    // Style it to overlay transparently over the entire screen
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "999"
    });
    document.body.appendChild(canvas);
  }
  
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const colors = ['#ff69b4', '#ffd700', '#00ced1', '#9370db', '#ff4500'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 12; // Side spread
      this.vy = (Math.random() * -12) -12;  // Upward explosion thrust
      this.gravity = 0.35;
      this.opacity = 1;
    }
    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > canvas.height * 0.8) {
        this.opacity -= 0.02; // Fade out as they fall past mid-screen
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => { p.update(); p.draw(); });

    if (particles.length > 0) {
      animationId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  button.addEventListener("click", () => {
    const rect = button.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const spawnY = rect.top;

    // Spawn 80 native physics particles from the button's exact location
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(spawnX, spawnY));
    }

    if (!animationId) loop();
  });
});
