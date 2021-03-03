const database = require('../../database');

const oppejoudService = {};

// Tagastab kõik õppejõud
oppejoudService.getOppejoud = () => {
  const { oppejoud } = database;
  return oppejoud;
};

// Leiab oppejou id järgi. Tagastab, kas leidis või ei.
oppejoudService.getOpetajaById = (id) => {
  const opetaja = database.oppejoud.find((element) => element.id === id);
  if (opetaja) {
    return opetaja;
  }
  return false;
};

// Loob uue õppejõu
oppejoudService.createOpetaja = (newOpetaja) => {
  const id = database.oppejoud.length + 1;
  const opetaja = {
    id,
    ...newOpetaja,
  };
  database.oppejoud.push(opetaja);
  return id;
};
// Muudab õppejõu descriptioni
oppejoudService.changeOpetaja = (opetaja) => {
  const index = database.oppejoud.findIndex((element) => element.id === opetaja.id);
  if (opetaja.description) {
    database.oppejoud[index].description = opetaja.description;
  }
  
  return true;
};

// Kustutab õppejõu
oppejoudService.deleteOpetaja = (id) => {
  // Leiab õppejõu id järgi
  const index = database.oppejoud.findIndex((element) => element.id === id);
  // eemaldab üppejõu 'database' failist
  database.oppejoud.splice(index, 1);
  return true;
};

module.exports = oppejoudService;