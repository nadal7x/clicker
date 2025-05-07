// 📌 Clase para herramientas
class Equipment {
  constructor(name, bonusDamage) {
      this.name = name;
      this.bonusDamage = bonusDamage;
  }
}

// 📌 Gestor de herramientas
const EquipmentManager = {
  tools: [
      new Equipment("Pico de Hierro", 1),
      new Equipment("Pico de Titanio", 3),
      new Equipment("Taladro Láser", 7),
  ],

  // 🛠️ Obtener herramienta por nombre
  getToolByName(name) {
      return this.tools.find(tool => tool.name === name) || null;
  }
};
