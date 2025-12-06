
const paulQuotes = [
  "I haven’t loved yet. But I’m still dressing for the day I do.",
  "Try this jacket. It says what you’re not ready to.",
  "That hem’s running from your ankle. Let’s fix it.",
  "Wear it. Dance it. Don’t just walk it.",
  "I made this look for you. Yes, for you."
];

document.addEventListener("DOMContentLoaded", () => {
  const quote = paulQuotes[Math.floor(Math.random() * paulQuotes.length)];
  document.getElementById("paul-quote").textContent = quote;
});
