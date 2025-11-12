// === Letras de fundo ===
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

// === Botões ===
const botoes = document.querySelectorAll(".modo");
const btnVoltar = document.getElementById("btnVoltar");

// Quando o usuário clicar em um modo, vai para a tela do jogo
botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    const modo = btn.textContent.trim().toLowerCase();
    // Redireciona para a tela de jogo com o modo selecionado na URL
    window.location.href = `tela-jogo.html?modo=${modo}`;
  });
});

btnVoltar.addEventListener("click", () => {
  window.location.href = "tela-inicial.html"; // volta para tela inicial
});
