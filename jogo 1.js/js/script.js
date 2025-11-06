// Sorteia um número secreto da lista numerosPossiveis
let numeroSecreto = numerosPossiveis[Math.floor(Math.random() * numerosPossiveis.length)];
let chances = 3;

const chuteInput = document.getElementById("chute");
const btnChutar = document.getElementById("btnChutar");
const btnDica = document.getElementById("btnDica");
const btnNovo = document.getElementById("btnNovo");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// Função ao clicar em "Chutar"
btnChutar.addEventListener("click", () => {
  let chute = Number(chuteInput.value);

  if (!chute || chute < 1 || chute > 100) {
    mensagem.textContent = "Digite um número entre 1 e 100!";
    mensagem.className = "mensagem error";
    return;
  }

  if (chute === numeroSecreto) {
    mensagem.textContent = "Parabéns! Você acertou!";
    mensagem.className = "mensagem success";
    finalizarJogo();
  } else {
    chances--;
    if (chances === 0) {
      mensagem.textContent = `Perdeu! O número era ${numeroSecreto}`;
      mensagem.className = "mensagem error";
      finalizarJogo();
    } else {
      mensagem.textContent = chute < numeroSecreto ? "Tente um número maior!" : "Tente um número menor!";
      mensagem.className = "mensagem error";
      contador.textContent = chances;
    }
  }

  chuteInput.value = "";
});

// Função ao clicar em "Dica"
btnDica.addEventListener("click", () => {
  const faixa = 10; 
  let min = Math.max(1, numeroSecreto - faixa);
  let max = Math.min(100, numeroSecreto + faixa);
  mensagem.textContent = `Dica: O número está entre ${min} e ${max}`;
  mensagem.className = "mensagem";
});

// Função para finalizar o jogo
function finalizarJogo() {
  chuteInput.disabled = true;
  btnChutar.disabled = true;
  btnDica.disabled = true;
  btnNovo.classList.remove("hidden");
}

// Botão "Tentar de novo"
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
