const imagens = [
  { src: "assets/arbok.png", nome: "Arbok" },
  { src: "assets/bulbasauro.png", nome: "Bulbasauro" },
  { src: "assets/charmeleon.png", nome: "Charmeleon" },
  { src: "assets/gengar.png", nome: "Gengar" },
  { src: "assets/meowth.png", nome: "Meowth" },
  { src: "assets/pikachu.png", nome: "Pikachu" },
  { src: "assets/psyduck.png", nome: "Psyduck" },
  { src: "assets/squirtle.png", nome: "Squirtle" },
  { src: "assets/cubone.png", nome: "Cubone" },
];

const numTentativas = [15, 20, 25, 30, 35, 40];
let selectedCards = [];
let score = 0;
let tentativasRestantes;

const pontuacao = document.querySelector(".pontuacao");
const textoPontuacao = document.querySelector(".textoPontuacao");
const pokemonNome = document.querySelector(".pokemonNome");
const cards = document.querySelectorAll(".card");
const textoTentativas = document.querySelector('.tentativas');
const btnRestart = document.querySelector('.btnReiniciar');

function exibePontuacao(mensagem, cor) {
  textoTentativas.style.display = "none";
  textoPontuacao.innerHTML = mensagem;
  textoPontuacao.style.color = cor;
  pontuacao.innerHTML = 'Pontuação final: ' + score.toString();

  cards.forEach(card => {
    card.style.display = "none";
  });

  btnRestart.style.display = 'block';
  btnRestart.addEventListener('click', () => {
    iniciarJogo();
    btnRestart.style.display = 'none';
  });
}

function iniciarJogo() {
  score = 0;
  tentativasRestantes = numTentativas[Math.floor(Math.random() * numTentativas.length)];
  selectedCards = [];
  textoPontuacao.innerHTML = '';
  pontuacao.innerHTML = 'Pontuação: ' + score.toString();
  textoTentativas.innerHTML = 'Tentativas Restantes: ' + tentativasRestantes;

  cards.forEach((card, index) => {
    card.classList.remove("show");
    card.style.display = "flex";
    card.querySelector("img").src = imagens[index % imagens.length].src;
    card.querySelector("img").style.display = "none"; // Esconder a imagem inicialmente

    card.onclick = () => mostrarImagem(card, imagens[index % imagens.length].nome);
  });
}

function mostrarImagem(card, nome) {
  if (selectedCards.length < 2 && !card.classList.contains("show")) {
    card.classList.add("show");
    const img = card.querySelector("img");
    img.style.display = "block";

    selectedCards.push({ card, nome });

    if (selectedCards.length === 2) {
      verificarMatch();
    }
  }
}

function verificarMatch() {
  const [primeiroCard, segundoCard] = selectedCards;

  if (primeiroCard.nome === segundoCard.nome) {
    score++;
    pontuacao.innerHTML = 'Pontuação: ' + score.toString();
    pokemonNome.innerHTML = `${primeiroCard.nome} foi encontrado!`;
    pokemonNome.style.display = "block";

    setTimeout(() => {
      primeiroCard.card.style.display = "none";
      segundoCard.card.style.display = "none";
      selectedCards = [];

      console.log(`Score: ${score}, Required Score: ${imagens.length / 2}`);
      if (score === imagens.length) {
        exibePontuacao('FIM DE JOGO! PARABÉNS VOCÊ GANHOU!','#9afc09');
      }
      pokemonNome.style.display = "none"; // Esconder o nome após um tempo
    }, 1000);
  } else {
    tentativasRestantes--;
    textoTentativas.innerHTML = 'Tentativas Restantes: ' + tentativasRestantes;
    textoTentativas.style.display = "block";

    setTimeout(() => {
      primeiroCard.card.classList.remove("show");
      segundoCard.card.classList.remove("show");
      primeiroCard.card.querySelector("img").style.display = "none";
      segundoCard.card.querySelector("img").style.display = "none";
      selectedCards = [];

      if (tentativasRestantes === 0) {
        exibePontuacao('FIM DE JOGO! VOCÊ PERDEU!', '#fc0330');
      }
    }, 1000);
  }
}

iniciarJogo();
