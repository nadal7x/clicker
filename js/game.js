//(Manejo del clicker y lógica principal)

// Lógica principal del clicker

const Game = {
  clicks: 0,
  clickValue: 1,
  autoClickers: Array(10).fill(0), // 10 mejoras escalables
  autoClickRates: [0.1, 0.5, 1, 3, 5, 10, 20, 35, 50, 100], // Velocidades escalables
  clickUpgrades: Array(10).fill(false), // Registro de mejoras de click
  autoClickInterval: null,
  init() {
      this.loadGame();
      document.getElementById("click-button").addEventListener("click", () => this.addClick());
      Upgrades.init();
      this.startAutoClickers();
  },
  addClick() {
      this.clicks += this.clickValue;
      Inventory.addMineral("Energonita", 1);
      this.updateUI();
      Storage.saveGame(this);
  },
  updateUI() {
      document.getElementById("click-count").innerText = this.clicks.toFixed(1);
      document.getElementById("cps-count").innerText = this.calculateCPS().toFixed(1);
  },
  calculateCPS() {
      return this.autoClickers.reduce((sum, count, i) => sum + count * this.autoClickRates[i], 0);
  },
  loadGame() {
      const savedData = Storage.loadGame();
      if (savedData) {
          this.clicks = savedData.clicks;
          this.clickValue = savedData.clickValue;
          this.autoClickers = savedData.autoClickers;
          this.clickUpgrades = savedData.clickUpgrades;
          this.updateUI();
          this.startAutoClickers();
      }
  },
  startAutoClickers() {
      if (this.autoClickInterval) clearInterval(this.autoClickInterval);
      this.autoClickInterval = setInterval(() => {
          this.clicks += this.calculateCPS();
          this.updateUI();
          Storage.saveGame(this);
      }, 1000);
  },
  resetGame() {
      this.clicks = 0;
      this.clickValue = 1;
      this.autoClickers = Array(10).fill(0);
      this.clickUpgrades = Array(10).fill(false);
      Storage.clearGame();
      Upgrades.init();
      this.updateUI();
  }
};