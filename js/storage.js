//(Guardado y carga del progreso con localStorage)

// Guardado de progreso en localStorage

const Storage = {
    saveGame(game) {
        localStorage.setItem("clickerGame", JSON.stringify({
            clicks: game.clicks,
            clickValue: game.clickValue,
            autoClickers: game.autoClickers,
            clickUpgrades: game.clickUpgrades,
            animals: AnimalManager.getSaveData()  // 🆕 Guardar animales
        }));
    },
    loadGame() {
        let savedData = JSON.parse(localStorage.getItem("clickerGame")) || null;
        if (savedData) {
            Game.clicks = savedData.clicks;
            Game.clickValue = savedData.clickValue;
            Game.autoClickers = savedData.autoClickers;
            Game.clickUpgrades = savedData.clickUpgrades;
            AnimalManager.loadFromData(savedData.animals);  // 🆕 Cargar animales
            Game.updateUI();
        }

    },
    clearGame() {
        localStorage.removeItem("clickerGame");
    },
    saveInventory(inventory) {
        localStorage.setItem("inventory", JSON.stringify(inventory));
    },
    loadInventory() {
        return JSON.parse(localStorage.getItem("inventory")) || {};
    },
    clearInventory() {
        localStorage.removeItem("inventory");
    }
};
