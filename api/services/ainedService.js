const database = require('../../database');

const ainedService = {};

// Tagastab kõik ained
ainedService.getAined = () => {
  const { ained } = database;
  return ained;
};

// Leiab aine id järgi. Tagastab, kas leidis või ei.
ainedService.getAineById = (id) => {
  const aine = database.ained.find((element) => element.id === id);
  if (aine) {
    return aine;
  }
  return false;
};

// Loob uue aine
ainedService.createAine = (newAine) => {
  const id = database.ained.length + 1;
  const aine = {
    id,
    ...newAine,
  };
  database.ained.push(aine);
  return id;
};

// Kustutab aine
ainedService.deleteAine = (id) => {
  // Leiab aine id järgi
  const index = database.ained.findIndex((element) => element.id === id);
  // eemaldab aine 'database' failist
  database.ained.splice(index, 1);
  return true;
};

module.exports = ainedService;