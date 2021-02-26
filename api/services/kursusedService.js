const database = require('../../database');

const kursusedService = {};

// Tagastab kõik kursused
kursusedService.getKursus = () => {
  const { kursused } = database;
  return kursused;
};

// Leiab kursuse id järgi. Tagastab, kas leidis või ei.
kursusedService.getKursusById = (id) => {
  const kursus = database.kursused.find((element) => element.id === id);
  if (kursus) {
    return kursus;
  }
  return false;
};

// Loob uue kursuse
kursusedService.createKursus = (newKursus) => {
  const id = database.kursused.length + 1;
  const kursus = {
    id,
    ...newKursus,
  };
  database.kursused.push(kursus);
  return id;
};

// Kustutab kursuse
kursusedService.deleteKursus = (id) => {
  // Leiab kursuse id järgi
  const index = database.kursused.findIndex((element) => element.id === id);
  // eemaldab kursuse 'database' failist
  database.kursused.splice(index, 1);
  return true;
};

module.exports = kursusedService;