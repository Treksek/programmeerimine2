const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'ahikas@tlu.ee',
  password: 'A1B2C3D4',
};

const newAine = {
    description: 'Testimine', 
    oppejoudID: '8', 
    ruumID: '10', 
    kursusID: '8',
  
};

const newAineUpdated = {
    description: 'Uuendamine',
};

let newAineId;
let adminToken;

describe('Ained controller', function () {
    describe('GET /ained', function () {
      it('responds with ained if logged in and respond in json and statusCode 200', async function () {
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        const response = await request(app).get('/ained').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
     });
    });

    describe('GET /ained/id', function () {
      it('responds status code 200', async function () {
        const response = await request(app).get(`/ained/1`).set('Authorization', `Bearer ${adminToken}`);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
      }); 
      it('responds with errorcode 400', async function () {
         const response = await request(app).get('/ained/9999').set('Authorization', `Bearer ${adminToken}`);
         expect(response.body).to.be.a('object');
         expect(response.statusCode).to.equal(400);  
      });
    });
    describe('POST /ained', function () {
      it('responds with error message in json and statusCode 400 because of missing data', async function () {
        const response = await request(app).post('/ained');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Andmed on puudulikud');
      });
      it('responds with id of created aine', async function () {
        const response = await request(app).post('/ained').set('Authorization', `Bearer ${adminToken}`).send(newAine);
        newAineId = response.body.id;
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(newAineId).to.be.a('number');
      });
      it('responds with error', async function () {
        const response = await request(app).post('/ained').send(adminUser);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
      });
    });
    
    
    
    describe('PATCH /aineD', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).patch('/ained/9999').set('Authorization', `Bearer ${adminToken}`).send(newAineUpdated);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds status code 200 and success message in object', async function () {
        const response = await request(app).patch(`/ained/${newAineId}`).set('Authorization', `Bearer ${adminToken}`).send(newAineUpdated);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
      });
      
    });
    
    describe('DELETE /aine', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).delete('/ained/9999').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds with status code 204', async function () {
        const response = await request(app).delete(`/ained/${newAineId}`).set('Authorization', `Bearer ${adminToken}`);
        expect(response.statusCode).to.equal(204);
      });
    });
  });

