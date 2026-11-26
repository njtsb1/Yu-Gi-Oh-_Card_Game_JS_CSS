const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playerSides: {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
  settings: {
    lang: "en-US",
    theme: "dark",
    isPlayingBgm: false,
    selectedCardId: null,
  },
};

const pathImages = "./assets/icons/";

const translations = {
  "en-US": {
    win_label: "Win",
    lose_label: "Lose",
    select_prompt: "Select",
    card_prompt: "a card",
    attribute_label: "Attribute",
    duel_win: "WIN",
    duel_lose: "LOSE",
    duel_draw: "DRAW",
    btn_next: "NEXT DUEL",
    theme_to_light: "Switch to Light Theme",
    theme_to_dark: "Switch to Dark Theme",
    types: {
      Paper: "Paper",
      Rock: "Rock",
      Scissors: "Scissors",
    },
    cards: {
      0: "Blue Eyes White Dragon",
      1: "Dark Magician",
      2: "Exodia",
    },
  },
  "pt-BR": {
    win_label: "Vitórias",
    lose_label: "Derrotas",
    select_prompt: "Selecione",
    card_prompt: "uma carta",
    attribute_label: "Atributo",
    duel_win: "GANHOU",
    duel_lose: "PERDEU",
    duel_draw: "EMPATE",
    btn_next: "PRÓXIMO DUELO",
    theme_to_light: "Mudar para Tema Claro",
    theme_to_dark: "Mudar para Tema Escuro",
    types: {
      Paper: "Papel",
      Rock: "Pedra",
      Scissors: "Tesoura",
    },
    cards: {
      0: "Dragão Branco de Olhos Azuis",
      1: "Mago Negro",
      2: "Exodia",
    },
  },
  "es-ES": {
    win_label: "Victorias",
    lose_label: "Derrotas",
    select_prompt: "Selecciona",
    card_prompt: "una carta",
    attribute_label: "Atributo",
    duel_win: "GANASTE",
    duel_lose: "PERDISTE",
    duel_draw: "EMPATE",
    btn_next: "SIGUIENTE DUELO",
    theme_to_light: "Cambiar a Tema Claro",
    theme_to_dark: "Cambiar a Tema Oscuro",
    types: {
      Paper: "Papel",
      Rock: "Piedra",
      Scissors: "Tijera",
    },
    cards: {
      0: "Dragón Blanco de Ojos Azules",
      1: "Mago Oscuro",
      2: "Exodia",
    },
  },
};

const cardData = [
  {
    id: 0,
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf: [ 1 ],
    LoseOf: [ 2 ],
  },
  {
    id: 1,
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf: [ 2 ],
    LoseOf: [ 0 ],
  },
  {
    id: 2,
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    WinOf: [ 0 ],
    LoseOf: [ 1 ],
  },
];

function getT() {
  return translations[state.settings.lang] || translations["en-US"];
}

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", `${pathImages}card-back.png`);
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  if (fieldSide === state.playerSides.player1) {
    const t = getT();
    cardImage.setAttribute("tabindex", "0");
    cardImage.setAttribute("role", "button");
    cardImage.setAttribute("aria-label", t.cards[idCard]);

    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });

    cardImage.addEventListener("focus", () => {
      drawSelectCard(idCard);
    });

    cardImage.addEventListener("click", () => {
      setCardsField(Number(cardImage.getAttribute("data-id")));
    });

    cardImage.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setCardsField(Number(cardImage.getAttribute("data-id")));
      }
    });
  } else {
    cardImage.setAttribute("alt", "Computer Face-Down Card");
  }

  return cardImage;
}

async function setCardsField(cardId) {
  await removeAllCardsImages();

  const computerCardId = await getRandomCardId();

  await showHiddenCardFieldsImages(true);
  await hiddenCardDetails();
  await drawCardsInField(cardId, computerCardId);

  const duelResultKey = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResultKey);
}

async function drawCardsInField(cardId, computerCardId) {
  const t = getT();
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.player.alt = t.cards[cardId];

  state.fieldCards.computer.src = cardData[computerCardId].img;
  state.fieldCards.computer.alt = t.cards[computerCardId];
}

async function showHiddenCardFieldsImages(value) {
  if (value === true) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  } else {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardDetails() {
  state.settings.selectedCardId = null;
  state.cardSprites.avatar.src = `${pathImages}card-back.png`;
  state.cardSprites.name.innerText = "";
  state.cardSprites.type.innerText = "";
}

async function drawButton(resultKey) {
  const t = getT();
  state.actions.button.dataset.resultKey = resultKey;
  state.actions.button.innerText = t[resultKey];
  state.actions.button.style.display = "inline-flex";
  state.actions.button.focus();
}

async function updateScore() {
  const t = getT();
  state.score.scoreBox.innerText = `${t.win_label} : ${state.score.playerScore} | ${t.lose_label}: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResultKey = "duel_draw";
  const playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResultKey = "duel_win";
    state.score.playerScore++;
    await playAudio("win");
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResultKey = "duel_lose";
    state.score.computerScore++;
    await playAudio("lose");
  }

  return duelResultKey;
}

async function removeAllCardsImages() {
  let { computerBOX, player1BOX } = state.playerSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
  const t = getT();
  state.settings.selectedCardId = index;
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.avatar.alt = t.cards[index];
  state.cardSprites.name.innerText = t.cards[index];
  state.cardSprites.type.innerText = `${t.attribute_label} : ${t.types[cardData[index].type]}`;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

async function resetDuel() {
  const t = getT();
  state.settings.selectedCardId = null;
  state.cardSprites.avatar.src = `${pathImages}card-back.png`;
  state.cardSprites.name.innerText = t.select_prompt;
  state.cardSprites.type.innerText = t.card_prompt;

  state.actions.button.style.display = "none";
  delete state.actions.button.dataset.resultKey;

  await showHiddenCardFieldsImages(false);

  await drawCards(5, state.playerSides.player1);
  await drawCards(5, state.playerSides.computer);
}

async function playAudio(status) {
  const audio = new Audio(`./assets/audios/${status}.wav`);
  try {
    await audio.play();
  } catch (err) {}
}

function initTheme() {
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const applyTheme = (theme) => {
    state.settings.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    const t = getT();

    if (theme === "dark") {
      themeIcon.textContent = "🌙";
      themeBtn.setAttribute("aria-label", t.theme_to_light);
      themeBtn.setAttribute("title", t.theme_to_light);
    } else {
      themeIcon.textContent = "☀️";
      themeBtn.setAttribute("aria-label", t.theme_to_dark);
      themeBtn.setAttribute("title", t.theme_to_dark);
    }
  };

  themeBtn.addEventListener("click", () => {
    const nextTheme = state.settings.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  applyTheme("dark");
}

function applyLanguage(lang) {
  state.settings.lang = lang;
  document.documentElement.lang = lang;
  const t = getT();

  updateScore();

  if (state.settings.selectedCardId !== null) {
    drawSelectCard(state.settings.selectedCardId);
  } else if (state.actions.button.style.display === "none" || !state.actions.button.style.display) {
    state.cardSprites.name.innerText = t.select_prompt;
    state.cardSprites.type.innerText = t.card_prompt;
  }

  const currentResultKey = state.actions.button.dataset.resultKey;
  if (currentResultKey && t[currentResultKey]) {
    state.actions.button.innerText = t[currentResultKey];
  } else {
    state.actions.button.innerText = t.btn_next;
  }

  const playerCards = state.playerSides.player1BOX.querySelectorAll("img");
  playerCards.forEach((card) => {
    const id = Number(card.getAttribute("data-id"));
    card.setAttribute("aria-label", t.cards[id]);
  });

  const themeBtn = document.getElementById("theme-toggle");
  const labelKey = state.settings.theme === "dark" ? "theme_to_light" : "theme_to_dark";
  themeBtn.setAttribute("aria-label", t[labelKey]);
  themeBtn.setAttribute("title", t[labelKey]);
}
function initLanguage() {
  const langSelect = document.getElementById("language-select");
  langSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

function initAudio() {
  const bgm = document.getElementById("bgm");
  const audioBtn = document.getElementById("audio-toggle");

  const startBgmOnFirstInteraction = () => {
    if (!state.settings.isPlayingBgm) {
      bgm.play().then(() => {
        state.settings.isPlayingBgm = true;
        audioBtn.textContent = "🔊";
      }).catch(() => {});
    }
    document.removeEventListener("click", startBgmOnFirstInteraction);
  };

  document.addEventListener("click", startBgmOnFirstInteraction);

  audioBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (bgm.paused) {
      bgm.play();
      state.settings.isPlayingBgm = true;
      audioBtn.textContent = "🔊";
    } else {
      bgm.pause();
      state.settings.isPlayingBgm = false;
      audioBtn.textContent = "🔇";
    }
  });
}

function init() {
  initTheme();
  initLanguage();
  initAudio();

  showHiddenCardFieldsImages(false);
  drawCards(5, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);
  applyLanguage("en-US");
}

init();
