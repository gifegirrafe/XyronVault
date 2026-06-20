function applySavedTheme() {
  const savedTheme = localStorage.getItem("zyron_theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  updateThemeButtons(savedTheme);
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-mode");
  const newTheme = isLight ? "light" : "dark";

  localStorage.setItem("zyron_theme", newTheme);
  updateThemeButtons(newTheme);
}

function updateThemeButtons(theme) {
  document.querySelectorAll(".theme-toggle").forEach(button => {
    button.textContent = theme === "light" ? "🌙 Dark" : "☀️ Light";
  });
}

function addBackgroundCircles() {
  if (document.querySelector(".background-circles")) return;

  const bg = document.createElement("div");
  bg.className = "background-circles";

  bg.innerHTML = `
    <span class="bg-circle c1"></span>
    <span class="bg-circle c2"></span>
    <span class="bg-circle c3"></span>
    <span class="bg-circle c4"></span>
    <span class="bg-circle c5"></span>

    <span class="bg-dot d1"></span>
    <span class="bg-dot d2"></span>
    <span class="bg-dot d3"></span>
    <span class="bg-dot d4"></span>
    <span class="bg-dot d5"></span>
    <span class="bg-dot d6"></span>
    <span class="bg-dot d7"></span>
    <span class="bg-dot d8"></span>
    <span class="bg-dot d9"></span>
    <span class="bg-dot d10"></span>
  `;

  document.body.prepend(bg);
}

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
});