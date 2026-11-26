# Creating a Yu-Gi-Oh! Card Game with JavaScript and CSS

Project developed during the Potência Tech iFood Game Development Bootcamp, under the guidance of expert [Felipe Aguiar](https://github.com/felipeAguiarCode "Felipe Aguiar").

In this project challenge, we will recreate a Yu-Gi-Oh-style game using the mechanics of Rock-Paper-Scissors (Jo-Ken-Po). We will explore advanced concepts for managing state using vanilla JavaScript, structuring files, and creating reusable functions.
Concepts covered:

- Manual state storage and management
- Clean functions
- Code organization

## Technologies Used

- **HTML5** (Semantic structure & ARIA attributes)
- **CSS3** (Custom properties/variables, Flexbox, Media Queries, RPGUI borders)
- **JavaScript (ES6+)** (DOM manipulation, async state transitions, i18n dictionary)

## Features

- **Dark & Light Mode:** Toggle seamlessly between the default **Dark Mode** (`🌙`) and **Light Mode** (`☀️`).
- **Multilingual Support (i18n):** Switch dynamically between **English (`EN-US`)**, **Portuguese (`PT-BR`)**, and **Spanish (`ES-ES`)**.
- **Retro RPG UI:** Custom pixel-art frames, golden RPG buttons, custom Millennium cursors, and *"Press Start 2P"* typography.
- **Audio & Video Immersion:** Background duel music (`egyptian_duel.mp3`), win/lose sound effects (`win.wav`, `lose.wav`), and an animated background loop (`yugi.mp4`).
- **Accessibility & Responsiveness:** Full keyboard navigation (`Tab` + `Enter`/`Space`), ARIA live regions for score/card updates, and adaptive layouts for desktop, tablets, and smartphones.

## How to Run

1. Clone or download this repository.
2. Open the `docs` folder in **Visual Studio Code**.
3. Launch `index.html` using the **Live Server** extension (or open it directly in any modern web browser).

### Game Rules (Jo-Ken-Po Logic)

Each monster card represents an attribute that beats one type and loses to another:

- **Blue Eyes White Dragon** (*Paper*) beats **Dark Magician** (*Rock*)
- **Dark Magician** (*Rock*) beats **Exodia** (*Scissors*)
- **Exodia** (*Scissors*) beats **Blue Eyes White Dragon** (*Paper*)

See [repository original](https://github.com/digitalinnovationone/js-yugioh-assets).

[LICENSE](/LICENSE)
