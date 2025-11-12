// === LETRAS FLUTUANTES ===
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let i = 0; i < 25; i++) {
  const span = document.createElement("span");
  span.classList.add("letra");
  span.textContent = letras[Math.floor(Math.random() * letras.length)];
  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDelay = Math.random() * 5 + "s";
  span.style.animationDuration = 6 + Math.random() * 5 + "s";
  span.style.color = `hsl(${Math.random() * 360}, 70%, 80%)`;
  document.body.appendChild(span);
}

// === BOTÕES ===
const btnJogar = document.getElementById("btnJogar");
const btnComoJogar = document.getElementById("btnComoJogar");

// Quando clicar em "Jogar", vai para tela de modos
btnJogar.addEventListener("click", () => {
  window.location.href = "tela-modos.html";
});


btnComoJogar.addEventListener("click", () => {
  alert("🧩 Como Jogar:\nDescubra a palavra escondida!\nDigite as letras certas para vencer!");
});
