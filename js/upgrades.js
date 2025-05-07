//(Sistema de mejoras y lógica de progresión)

// Sistema de mejoras

const Upgrades = {
  autoClickerCosts: [50, 200, 500, 1000, 3000, 8000, 20000, 50000, 100000, 250000], // Costos escalables
  clickUpgradeCosts: [100, 500, 1500, 5000, 15000, 40000, 100000, 300000, 800000, 2000000],
  init() {
    const clickUpgradesContainer = document.getElementById("click-upgrades");
    const autoClickersContainer = document.getElementById("auto-clickers");
    clickUpgradesContainer.innerHTML = "";
    autoClickersContainer.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let clickUpgradeButton = document.createElement("button");
        clickUpgradeButton.className = "upgrade-button";
        clickUpgradeButton.dataset.type = "click";
        clickUpgradeButton.dataset.index = i;
        clickUpgradeButton.innerText = `Mejorar Click (${this.clickUpgradeCosts[i]} clicks)`;
        clickUpgradesContainer.appendChild(clickUpgradeButton);

        let autoClickUpgradeButton = document.createElement("button");
        autoClickUpgradeButton.className = "upgrade-button";
        autoClickUpgradeButton.dataset.type = "auto";
        autoClickUpgradeButton.dataset.index = i;
        autoClickUpgradeButton.innerText = `Comprar AutoClicker (${this.autoClickerCosts[i]} clicks)`;
        autoClickersContainer.appendChild(autoClickUpgradeButton);
    }

    document.querySelectorAll(".upgrade-button").forEach((button) => {
        button.addEventListener("click", (e) => this.buyUpgrade(e.target.dataset.type, e.target.dataset.index));
    });
},
  buyUpgrade(type, index) {
      index = parseInt(index);
      if (type === "click" && Game.clicks >= this.clickUpgradeCosts[index] && !Game.clickUpgrades[index]) {
          Game.clicks -= this.clickUpgradeCosts[index];
          Game.clickValue *= 2;
          Game.clickUpgrades[index] = true;
          document.querySelector(`[data-type='click'][data-index='${index}']`).remove();
      } else if (type === "auto" && Game.clicks >= this.autoClickerCosts[index]) {
          Game.clicks -= this.autoClickerCosts[index];
          Game.autoClickers[index]++;
          document.querySelector(`[data-type='auto'][data-index='${index}']`).remove();
      }
      Game.updateUI();
      Storage.saveGame(Game);
  }
};