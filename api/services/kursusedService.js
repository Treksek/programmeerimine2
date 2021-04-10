const db = require('../../db');

const kursusedService = {};

// Tagastab kõik kursused
kursusedService.getKursused = async () => {
  const kursused = await db.query('SELECT id, description FROM tunniplaanKursused WHERE deleted = 0');
  return kursused;
};

// Leiab kursuse id järgi. Tagastab, kas leidis või ei.
kursusedService.getKursusById = async (id) => {
  const kursus = await db.query('SELECT id, description FROM tunniplaanKursused WHERE id = ? AND deleted = 0', [id]);
  if (kursus) {
    return kursus;
  }
  return false;
};

// Loob uue kursuse
kursusedService.createKursus = async (newKursus) => {
  const kursus = await db.query('SELECT id FROM tunniplaanKursused WHERE description = ?', [newKursus.description]);
    if (kursus != 0){
  
      return kursus[0].id;

    } else {  
      const result = await db.query('INSERT INTO tunniplaanKursused SET ?', [newKursus]);
      return result.insertId;
    }
};

// Muudab kursuse descriptioni
kursusedService.changeKursus = async (kursus) => {
  await db.query('UPDATE tunniplaanKursused SET description = ? WHERE id = ?', [kursus.description, kursus.id]);
  
  
  return true;
};

// Kustutab kursuse
kursusedService.deleteKursus = async (id) => {
  await db.query('UPDATE tunniplaanKursused SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = kursusedService;