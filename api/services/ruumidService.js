const db = require('../../db');

const ruumidService = {};

// Tagastab kõik ruumid
  ruumidService.getRuumid = async () => {
  const ruumid = await db.query('SELECT id, description FROM tunniplaanRuumid WHERE deleted = 0');
  return ruumid;
};

// Leiab ruumi id järgi. Tagastab, kas leidis või ei.
  ruumidService.getRuumById = async (id) => {
  const ruum = await db.query('SELECT id, description FROM tunniplaanRuumid WHERE id = ? AND deleted = 0', [id]);
  if (ruum) {
    return ruum;
  }
  return false;
};

// Loob uue ruumi
ruumidService.createRuum = async (newRuum) => {
  const ruum = await db.query('SELECT id FROM tunniplaanRuumid WHERE description = ?', [newRuum.description]);
    if (ruum != 0){
  
      return ruum[0].id;

    } else {  
      const result = await db.query('INSERT INTO tunniplaanRuumid SET ?', [newRuum]);
      return result.insertId;
    }
};


// Muudab ruumi descriptioni
ruumidService.changeRuum = async (ruum) => {
  await db.query('UPDATE tunniplaanRuumid SET description = ? WHERE id = ?', [ruum.description, ruum.id]);
  
  return true;
};

// Kustutab ruumi
  ruumidService.deleteRuum = async (id) => {
    await db.query('UPDATE tunniplaanRuumid SET deleted = 1 WHERE id = ?', [id]);
    
    return true;
};

module.exports = ruumidService;