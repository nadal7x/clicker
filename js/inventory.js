const Inventory = {
  minerals: {},

  init() {
      this.minerals = Storage.loadInventory() || {}; // Carga desde localStorage
      this.updateUI();
  },

  addMineral(type, amount) {
      if (!this.minerals[type]) {
          this.minerals[type] = 0;
      }
      this.minerals[type] += amount;
      this.updateUI();
      Storage.saveInventory(this.minerals);
  },

  removeMineral(type, amount) {
      if (this.minerals[type] && this.minerals[type] >= amount) {
          this.minerals[type] -= amount;
          if (this.minerals[type] === 0) {
              delete this.minerals[type]; // Elimina si queda en 0
          }
          this.updateUI();
          Storage.saveInventory(this.minerals);
          return true;
      }
      return false; // No hay suficientes minerales
  },

  updateUI() {
      const inventoryContainer = document.getElementById("inventory");
      inventoryContainer.innerHTML = "";
      for (const [type, amount] of Object.entries(this.minerals)) {
          let mineralElement = document.createElement("p");
          mineralElement.innerText = `${type}: ${amount}`;
          inventoryContainer.appendChild(mineralElement);
      }
  }
};
