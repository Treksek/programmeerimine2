const db = require('../../db');

const oppejoudService = {};

// Tagastab kõik õppejõud
oppejoudService.getOppejoud = async () => {
  const oppejoud = await db.query('SELECT id, description FROM tunniplaanOppejoud WHERE deleted = 0');
  return oppejoud;
};

// Leiab oppejou id järgi. Tagastab, kas leidis või ei.
oppejoudService.getOpetajaById = async (id) => {
  const opetaja = await db.query('SELECT id, description FROM tunniplaanOppejoud WHERE id = ? AND deleted = 0', [id]);
  if (opetaja) {
    return opetaja;
  }
  return false;
};

// Loob uue õppejõu
oppejoudService.createOpetaja = async (newOpetaja) => {
  const opetaja = await db.query('SELECT id FROM tunniplaanOppejoud WHERE description = ?', [newOpetaja.description]);
    if (opetaja != 0){
  
      return opetaja[0].id;

    } else {  
      const result = await db.query('INSERT INTO tunniplaanOppejoud SET ?', [newOpetaja]);
      return result.insertId;
    }
};

// Muudab õppejõu descriptioni
oppejoudService.changeOpetaja = async (opetaja) => {
  await db.query('UPDATE tunniplaanOppejoud SET description = ? WHERE id = ?', [opetaja.description, opetaja.id]);
  
  return true;
};

// Kustutab õppejõu
oppejoudService.deleteOpetaja = async (id) => {
  await db.query('UPDATE tunniplaanOppejoud SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = oppejoudService;