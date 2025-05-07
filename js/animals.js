// 📌 Clase Animal
class Animal {
  constructor(name, damage, speed, mineralDrop, level = 1, upgradeCost = 100, equipment = null) {
    this.name = name;                // Nombre del animal
    this.damage = damage;            // Cuántos clicks genera
    this.speed = speed;              // Cada cuántos segundos actúa
    this.mineralDrop = mineralDrop;  // Posibles minerales y probabilidades
    this.level = level;              // Nivel actual
    this.upgradeCost = upgradeCost;  // Costo de mejora
    this.equipment = equipment;      // Herramienta equipada
    this.interval = null;            // Intervalo de trabajo
  }

  // 🛠️ Iniciar trabajo automático
  startMining() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      let totalDamage = this.getTotalDamage();
      Game.clicks += totalDamage;
      this.mineMinerals();
      Game.updateUI();
    }, this.speed * 1000);
  }

  // ⛏️ Extraer minerales con probabilidad
  mineMinerals() {
    for (let mineral in this.mineralDrop) {
      if (Math.random() < this.mineralDrop[mineral]) {
        Inventory.addMineral(mineral, 1); // Añadir mineral al inventario
      }
    }
  }

  // 🔼 Mejorar animal (Aumenta daño y baja velocidad)
  upgrade() {
    if (Game.clicks >= this.upgradeCost) {
      Game.clicks -= this.upgradeCost;
      this.level++;
      this.damage *= 1.5;
      this.speed *= 0.9;
      this.upgradeCost *= 2;
      this.startMining();
      Game.updateUI();
    }
  }

  // ⚒️ Equipar herramienta
  equip(tool) {
    this.equipment = tool;
    Game.updateUI();
  }

  // 🦾 Calcular daño total (base + equipo)
  getTotalDamage() {
    let extraDamage = this.equipment ? this.equipment.bonusDamage : 0;
    return this.damage + extraDamage;
  }

  // 🔍 Guardar info del animal
  getSaveData() {
    return {
      name: this.name,
      damage: this.damage,
      speed: this.speed,
      level: this.level,
      upgradeCost: this.upgradeCost,
      equipment: this.equipment ? this.equipment.name : null
    };
  }
}

// 📌 Gestor de Animales
const AnimalManager = {
  animals: [],

  // 🦾 Agregar nuevo animal
  addAnimal(animal) {
    this.animals.push(animal);
    animal.startMining();
    this.updateUI();
  },

  // 🔼 Mejorar un animal específico
  upgradeAnimal(index) {
    this.animals[index].upgrade();
    this.updateUI();
  },

  // ⚒️ Equipar herramienta a un animal
  equipAnimal(index, tool) {
    this.animals[index].equip(tool);
    this.updateUI();
  },

  // 📜 Guardar progreso de los animales
  getSaveData() {
    return this.animals.map(animal => animal.getSaveData());
  },

  // 📜 Cargar progreso de los animales
  loadFromData(data) {
    if (!data || !Array.isArray(data)) {
      console.warn("No hay datos válidos para cargar animales.");
      this.animals = [];
    } else {
      this.animals = data.map(animalData => {
        let animal = new Animal(
          animalData.name,
          animalData.damage,
          animalData.speed,
          {},
          animalData.level,
          animalData.upgradeCost
        );
        if (animalData.equipment) {
          animal.equip(EquipmentManager.getToolByName(animalData.equipment));
        }
        return animal;
      });
    }
    this.updateUI();
  },

  // 📜 Actualizar UI con animales activos
  updateUI() {
    let container = document.getElementById("animals-container");
    container.innerHTML = "";
    this.animals.forEach((animal, index) => {
      let animalDiv = document.createElement("div");
      let equipmentText = animal.equipment ? ` (Equipado: ${animal.equipment.name})` : "";
      animalDiv.innerHTML = `
              <p>${animal.name} - Nivel ${animal.level} - Clicks: ${animal.getTotalDamage().toFixed(1)} cada ${animal.speed}s ${equipmentText}</p>
              <button onclick="AnimalManager.upgradeAnimal(${index})">Mejorar (${animal.upgradeCost} clicks)</button>
          `;
      container.appendChild(animalDiv);
    });
  }
};

/*// 🦏 Crear un rinoceronte minero
let rinominero = new Animal("Rinominero", 1, 2, { "Singulita": 0.1, "Hierro Puro": 0.2 });

// 🐢 Crear una tortuga excavadora
let torterranea = new Animal("Torterránea", 2, 3, { "Titanio Puro": 0.15, "Basalto": 0.3 });

// ➕ Añadir los animales al juego
AnimalManager.addAnimal(rinominero);
AnimalManager.addAnimal(torterranea); */