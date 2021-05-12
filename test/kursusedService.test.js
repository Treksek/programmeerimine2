const { expect } = require('chai');
const { kursusedService } = require('../api/services');


const newKursus = {
    description: 'Test',
 
};

const newKursusUpdated = {
    description: 'UusTest',
  
};

let newKursusID;

describe('Kursused service', function () {
  describe('GET /kursused', function () {
    it('should return array of kursused', async function () {
      kursused = await kursusedService.getKursused();
      expect(kursused).to.be.a('array');
    });
    it('should contain at least 1 kursus', async function () {
      expect(kursused.length).to.be.gt(1);
    });
  });
  describe('POST /kursused', function () {
    it('should return the last inserted ID', async function () {
      const kursus = await kursusedService.createKursus(newKursus);
      newKursusID = kursus;
      expect(kursus).to.be.a('number');
      
    });

  });

  describe('GET /kursused/id', function () {
    it('should return user object with keys', async function () {
      const kursus = await kursusedService.getKursusById(newKursusID);
      expect(kursus).to.be.a('object');
      expect(kursus).to.have.keys(['id', 'description']);
    });
    
  });

  

 

  describe('PATCH /kursused', function () {
    it('should return true if update successful', async function () {
      newKursusUpdated.id = newKursusID;
      const kursus = await kursusedService.changeKursus(newKursusUpdated);
      expect(kursus).to.be.true;
    });
  });

  describe('DELETE /kursused', function () {
    it('should return true if deleted', async function () {
      const kursus = await kursusedService.deleteKursus(newKursusID);
      expect(kursus).to.be.true;
    });
  });

});