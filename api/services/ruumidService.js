const database = require('../../database');

const ruumidService = {};

// Tagastab kõik ruumid
  ruumidService.getRuum = () => {
  const { ruumid } = database;
  return ruumid;
};

// Leiab ruumi id järgi. Tagastab, kas leidis või ei.
  ruumidService.getRuumById = (id) => {
  const ruum = database.ruumid.find((element) => element.id === id);
  if (ruum) {
    return ruum;
  }
  return false;
};

// Loob uue ruumi
ruumidService.createRuun = (newRuum) => {
  const id = database.ruumid.length + 1;
  const ruum = {
    id,
    ...newRuum,
  };
  database.ruumid.push(ruum);
  return id;
};

// Kustutab ruumi
  ruumidService.deleteRuum = (id) => {
  // Leiab ruumi id järgi
  const index = database.ruumid.findIndex((element) => element.id === id);
  // eemaldab ruumi 'database' failist
  database.ruumid.splice(index, 1);
  return true;
};

module.exports = ruumidService;