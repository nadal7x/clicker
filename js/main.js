//(Código principal del juego, inicializa todo)

// Inicializa el juego

document.addEventListener("DOMContentLoaded", () => {
  Game.init();
  document.getElementById("reset-button").addEventListener("click", () => Game.resetGame());
});