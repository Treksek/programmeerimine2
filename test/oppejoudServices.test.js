const { expect } = require('chai');
const { oppejoudService } = require('../api/services');


const newOpetaja = {
    description: 'Rumal Õpetaja',
 
};

const newOpetajaUpdated = {
    description: 'Tark Õpetaja',
  
};

let newOpetajaID;

describe('Õppejõud service', function () {
  describe('GET /oppejoud', function () {
    it('should return array of õppejõud', async function () {
      oppejoud = await oppejoudService.getOppejoud();
      expect(oppejoud).to.be.a('array');
    });
    it('should contain at least 1 teacher', async function () {
      expect(oppejoud.length).to.be.gt(1);
    });
  });


  



  describe('POST /oppejoud', function () {
    it('should return the last inserted ID', async function () {
      const opetaja = await oppejoudService.createOpetaja(newOpetaja);
      newOpetajaID = opetaja;
      expect(opetaja).to.be.a('number');      
    });

  });

  describe('GET /oppejoud/id', function () {
    it('should return user object with keys', async function () {
      const opetaja = await oppejoudService.getOpetajaById(newOpetajaID);
      expect(opetaja).to.be.a('object');
      expect(opetaja).to.have.keys(['id', 'description']);
    });
    
  });
  

  describe('PATCH /oppejoud', function () {
    it('should return true if update successful', async function () {
      newOpetajaUpdated.id = newOpetajaID;
      const opetaja = await oppejoudService.changeOpetaja(newOpetajaUpdated);
      expect(opetaja).to.be.true;
    });
  });

  describe('DELETE /oppejoud', function () {
    it('should return true if deleted', async function () {
      const opetaja = await oppejoudService.deleteOpetaja(newOpetajaID);
      expect(opetaja).to.be.true;
    });
  });

});