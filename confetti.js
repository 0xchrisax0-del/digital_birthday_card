document.getElementById("card-button").addEventListener("click", () => {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0 }
  });
});