const { expect } = require('chai');
const { ainedService } = require('../api/services');


const newAine = {
    description: 'Testimine', 
    oppejoudID: '8', 
    ruumID: '10', 
    kursusID: '8',
  
};

const newAineUpdated = {
    description: 'Uuendamine',
};


let newAineID;

describe('Ained service', function () {
  describe('GET /ained', function () {
    it('should return array of subjects', async function () {
      ained = await ainedService.getAined();
      expect(ained).to.be.a('array');
    });
    it('should contain at least 1 aine', async function () {
      expect(ained.length).to.be.gt(1);
    });
  });

  describe('POST /ained', function () {
    it('should return the last inserted ID', async function () {
      const aine = await ainedService.createAine(newAine);
      newAineID = aine;
      expect(aine).to.be.a('number');
      
    });

  });
  describe('GET /ained/id', function () {
    it('should return user object with keys', async function () {
      const aine = await ainedService.getAineById(newAineID);
      expect(aine).to.be.a('object');
      expect(aine).to.have.keys(['id', 'description', 'õppejõud', 'ruum', 'kursus']);
    });
    
  });
  describe('PATCH /ained', function () {
    it('should return true if update successful', async function () {
      newAineUpdated.id = newAineID;
      const aine = await ainedService.changeAine(newAineUpdated);
      expect(aine).to.be.true;
    });
  });

  describe('DELETE /ained', function () {
    it('should return true if deleted', async function () {
      const aine = await ainedService.deleteAine(newAineID);
      expect(aine).to.be.true;
    });
  });

});