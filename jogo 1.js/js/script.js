// === LISTA DE NÚMEROS POSSÍVEIS (1 a 100) ===
const numerosPossiveis = Array.from({ length: 100 }, (_, i) => i + 1);

// === VARIÁVEIS INICIAIS ===
let numeroSecreto = numerosPossiveis[Math.floor(Math.random() * numerosPossiveis.length)];
let chances = 3;

// === ELEMENTOS DA INTERFACE ===
const chuteInput = document.getElementById("chute");
const btnChutar = document.getElementById("btnChutar");
const btnDica = document.getElementById("btnDica");
const btnNovo = document.getElementById("btnNovo");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// === AÇÃO: CHUTAR ===
btnChutar.addEventListener("click", () => {
  const chute = Number(chuteInput.value);

  if (!chute || chute < 1 || chute > 100) {
    mensagem.textContent = "Digite um número entre 1 e 100!";
    mensagem.className = "mensagem error";
    return;
  }

  if (chute === numeroSecreto) {
    mensagem.textContent = "🎉 Parabéns! Você acertou!";
    mensagem.className = "mensagem success";
    finalizarJogo();
  } else {
    chances--;
    if (chances === 0) {
      mensagem.textContent = `💥 Que pena! O número era ${numeroSecreto}.`;
      mensagem.className = "mensagem error";
      finalizarJogo();
    } else {
      mensagem.textContent = chute < numeroSecreto
        ? "📈 Tente um número maior!"
        : "📉 Tente um número menor!";
      mensagem.className = "mensagem error";
      contador.textContent = chances;
    }
  }

  chuteInput.value = "";
});

// === AÇÃO: DICA ===
btnDica.addEventListener("click", () => {
  const faixa = 10;
  const min = Math.max(1, numeroSecreto - faixa);
  const max = Math.min(100, numeroSecreto + faixa);
  mensagem.textContent = `💡 Dica: O número está entre ${min} e ${max}.`;
  mensagem.className = "mensagem";
});

// === FUNÇÃO: FINALIZAR JOGO ===
function finalizarJogo() {
  chuteInput.disabled = true;
  btnChutar.disabled = true;
  btnDica.disabled = true;
  btnNovo.classList.remove("hidden");
}

// === AÇÃO: NOVO JOGO ===
btnNovo.addEventListener("click", () => {
  numeroSecreto = numerosPossiveis[Math.floor(Math.random() * numerosPossiveis.length)];
  chances = 3;
  contador.textContent = chances;
  chuteInput.disabled = false;
  btnChutar.disabled = false;
  btnDica.disabled = false;
  chuteInput.value = "";
  mensagem.textContent = "";
  btnNovo.classList.add("hidden");
});
