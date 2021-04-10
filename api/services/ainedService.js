const db = require('../../db');

const ainedService = {};

// Tagastab kõik ained
ainedService.getAined = async () => {
  const ained  = await db.query(
    `SELECT
     a.id, a.description, o.description AS õppejõud, r.description AS ruum, k.description AS kursus
     FROM tunniplaanAined a
     INNER JOIN tunniplaanOppejoud o ON a.oppejoudID = o.id
     INNER JOIN tunniplaanRuumid r ON a.ruumID = r.id
     INNER JOIN tunniplaanKursused k ON a.kursusID = k.id
     WHERE
     a.deleted = 0`);

  return ained;
};

// Leiab aine id järgi. Tagastab, kas leidis või ei.
ainedService.getAineById = async (id) => {
  const aine  = await db.query(
    `SELECT
     a.id, a.description, o.description AS õppejõud, r.description AS ruum, k.description AS kursus
     FROM tunniplaanAined a
     INNER JOIN tunniplaanOppejoud o ON a.oppejoudID = o.id
     INNER JOIN tunniplaanRuumid r ON a.ruumID = r.id
     INNER JOIN tunniplaanKursused k ON a.kursusID = k.id
     WHERE
     a.id = ? AND a.deleted = 0`, [id]);
  if (aine) {
    return aine;
  }
  return false;
};

// Loob uue aine

ainedService.createAine = async (newAine) => {

 /* 
 const existingAine = await db.query('SELECT id FROM tunniplaanAined WHERE description = ?', [newAine.description]); 
  if (existingAine) {
    return { error: 'Aine on juba olemas' };
  }*/
  const aine = {
    description: newAine.description,
    oppejoudID: newAine.oppejoudID,
    ruumID: newAine.ruumID,
    kursusID: newAine.kursusID
  };
  const result = await db.query('INSERT INTO tunniplaanAined SET ?', [aine]);
  return { id: result.insertId };
};




// Muudab aine 

ainedService.changeAine = async (aine) => {
  const aineToUpdate = {};
  if (aine.description) {
    aineToUpdate.description = aine.description;
  }
  if (aine.oppejoudID) {
    aineToUpdate.oppejoudID = aine.oppejoudID;
  }
  if (aine.ruumID) {
    aineToUpdate.ruumID = aine.ruumID;
  }
  if (aine.kursusID) {
    aineToUpdate.kursusID = aine.kursusID;
  }
  await db.query('UPDATE tunniplaanAined SET ? WHERE id = ?', [aineToUpdate, aine.id]);
  return true;
};

// Kustutab aine
ainedService.deleteAine = async (id) => {
  await db.query('UPDATE tunniplaanAined SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = ainedService;