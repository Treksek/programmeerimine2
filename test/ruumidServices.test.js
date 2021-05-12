const { expect } = require('chai');
const { ruumidService } = require('../api/services');


const newRuum = {
    description: '55555',
 
};

const newRuumUpdated = {
    description: '99999',
  
};

let newRuumID;

describe('Ruumid service', function () {
  describe('GET /ruumid', function () {
    it('should return array of ruumid', async function () {
      ruumid = await ruumidService.getRuumid();
      expect(ruumid).to.be.a('array');
    });
    it('should contain at least 1 ruum', async function () {
      expect(ruumid.length).to.be.gt(1);
    });
  });


  



  describe('POST /ruumid', function () {
    it('should return the last inserted ID', async function () {
      const ruum = await ruumidService.createRuum(newRuum);
      newRuumID = ruum;
      expect(ruum).to.be.a('number');
      
    });

  });
  describe('GET /ruumid/id', function () {
    it('should return user object with keys', async function () {
      const ruum = await ruumidService.getRuumById(newRuumID);
      expect(ruum).to.be.a('object');
      expect(ruum).to.have.keys(['id', 'description']);
    });
    
  });
  
  describe('PATCH /ruumid', function () {
    it('should return true if update successful', async function () {
      newRuumUpdated.id = newRuumID;
      const ruum = await ruumidService.changeRuum(newRuumUpdated);
      expect(ruum).to.be.true;
    });
  });

  describe('DELETE /ruumid', function () {
    it('should return true if deleted', async function () {
      const ruum = await ruumidService.deleteRuum(newRuumID);
      expect(ruum).to.be.true;
    });
  });

});