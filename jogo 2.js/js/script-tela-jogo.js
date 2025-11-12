// === ELEMENTOS DA TELA ===
const palavraContainer = document.getElementById("palavraContainer");
const entradaLetra = document.getElementById("entradaLetra");
const btnChutar = document.getElementById("btnChutar");
const mensagem = document.getElementById("mensagem");
const tentativas = document.getElementById("tentativas");
const btnNovoJogo = document.getElementById("btnNovoJogo");
const btnVoltar = document.getElementById("btnVoltar");

// === VARIÁVEIS DE ESTADO ===
let palavraEscolhida = "";
let letrasCorretas = [];
let letrasErradas = [];
let palavras = [];

// === CARREGAR JSON COM AS PALAVRAS ===
async function carregarPalavras() {
  try {
    const resposta = await fetch("frutas.json"); // está na MESMA PASTA do HTML
    if (!resposta.ok) throw new Error("Erro ao carregar JSON");
    const dados = await resposta.json();

    // suporta tanto {"palavras": [...]} quanto apenas [...]
    if (Array.isArray(dados)) {
      palavras = dados;
    } else if (Array.isArray(dados.palavras)) {
      palavras = dados.palavras;
    } else {
      throw new Error("Formato inválido do JSON");
    }

    iniciarJogo();
  } catch (erro) {
    mensagem.textContent = "⚠️ Não foi possível carregar o arquivo frutas.json";
    console.error(erro);
  }
}

// === INICIAR UM NOVO JOGO ===
function iniciarJogo() {
  palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
  letrasCorretas = [];
  letrasErradas = [];
  atualizarPalavra();
  atualizarTentativas();
  mensagem.textContent = "";
  entradaLetra.value = "";
  entradaLetra.focus();
}

// === ATUALIZAR EXIBIÇÃO DA PALAVRA ===
function atualizarPalavra() {
  palavraContainer.innerHTML = palavraEscolhida
    .split("")
    .map((letra) => `<span class="letra">${letrasCorretas.includes(letra) ? letra : "_"}</span>`)
    .join(" ");
}

// === ATUALIZAR AS LETRAS TENTADAS ===
function atualizarTentativas() {
  tentativas.innerHTML = `
    <strong>Letras tentadas:</strong>
    ${[...letrasCorretas, ...letrasErradas]
      .map((l) => {
        const cor = letrasCorretas.includes(l) ? "blue" : "red";
        return `<span style="color:${cor}; background:#fff; padding:5px; margin:3px; border-radius:5px;">${l}</span>`;
      })
      .join("")}
  `;
}

// === VERIFICAR CHUTE ===
function chutarLetra() {
  const letra = entradaLetra.value.toUpperCase();

  if (!letra.match(/[A-ZÀ-ÿ]/i) || letra.length === 0) {
    mensagem.textContent = "Digite uma letra válida!";
    return;
  }

  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    mensagem.textContent = "Você já tentou essa letra!";
    entradaLetra.value = "";
    return;
  }

  if (palavraEscolhida.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "✅ Boa! A letra está na palavra!";
  } else {
    letrasErradas.push(letra);
    mensagem.textContent = "❌ Letra errada!";
  }

  atualizarPalavra();
  atualizarTentativas();
  entradaLetra.value = "";

  verificarFim();
}

// === VERIFICAR FIM DE JOGO ===
function verificarFim() {
  const palavraCompleta = palavraEscolhida
    .split("")
    .every((letra) => letrasCorretas.includes(letra));

  if (palavraCompleta) {
    mensagem.textContent = `🎉 Parabéns! Você acertou a palavra: ${palavraEscolhida}`;
  }
}

// === EVENTOS ===
btnChutar.addEventListener("click", chutarLetra);
entradaLetra.addEventListener("keypress", (e) => {
  if (e.key === "Enter") chutarLetra();
});
btnNovoJogo.addEventListener("click", iniciarJogo);
btnVoltar.addEventListener("click", () => {
  window.location.href = "tela-modos.html";
});

// === INÍCIO ===
carregarPalavras();
