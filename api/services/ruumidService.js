const database = require('../../database');

const ruumidService = {};

// Tagastab kõik ruumid
  ruumidService.getRuumid = () => {
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
ruumidService.createRuum = (newRuum) => {
  const id = database.ruumid.length + 1;
  const ruum = {
    id,
    ...newRuum,
  };
  database.ruumid.push(ruum);
  return id;
};
// Muudab ruumi descriptioni
ruumidService.changeRuum = (ruum) => {
  const index = database.ruumid.findIndex((element) => element.id === ruum.id);
  if (ruum.description) {
    database.ruumid[index].description = ruum.description;
  }
  
  return true;
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