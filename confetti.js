// Wrap everything in a DOMContentLoaded listener to ensure the HTML button exists first
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("confetti-button");

  // Safety check: ensure the button actually exists in the HTML
  if (!button) {
    console.error("Error: Could not find an element with id 'confetti-button'");
    return;
  }

  // Initialize the confetti canvas overlay
  const jsConfetti = new JSConfetti();

  button.addEventListener("click", () => {
    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 150,
      // Optional: Add custom birthday colors (e.g., pink, gold, teal, purple)
      confettiColors: ['#ff69b4', '#ffd700', '#00ced1', '#9370db', '#ff4500'],
    });
  });
});
