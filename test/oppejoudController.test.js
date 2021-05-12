const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'ahikas@tlu.ee',
  password: 'A1B2C3D4',
};

const newOpetaja = {
    description: 'Rumal Opetaja', 
      
};

const newOpetajaUpdated = {
    description: 'Tark Opetaja',
};

let newOpetajaId;
let adminToken;

describe('Õppejõud controller', function () {
    describe('GET /oppejoud', function () {
      it('responds with õppejõud if logged in and respond in json and statusCode 200', async function () {
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        const response = await request(app).get('/oppejoud').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
     });
    });

    
    describe('POST /oppejoud', function () {
      it('responds with error message in json and statusCode 400 because of missing data', async function () {
        const response = await request(app).post('/oppejoud');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Õppejõu nimi puudub');
      });
      it('responds with id of created oppejoud', async function () {
        const response = await request(app).post('/oppejoud').set('Authorization', `Bearer ${adminToken}`).send(newOpetaja);
        newOpetajaId = response.body.id;
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(newOpetajaId).to.be.a('number');
      });
      it('responds with error', async function () {
        const response = await request(app).post('/oppejoud').send(adminUser);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
      });
    });
    
    describe('GET /oppejoud/id', function () {
        it('responds status code 200', async function () {
          const response = await request(app).get(`/oppejoud/${newOpetajaId}`).set('Authorization', `Bearer ${adminToken}`);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a('object');
        }); 
        it('responds with errorcode 400', async function () {
           const response = await request(app).get('/oppejoud/9999').set('Authorization', `Bearer ${adminToken}`);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(400);
        });
      });
      
    describe('PATCH /oppejoud', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).patch('/oppejoud/9999').set('Authorization', `Bearer ${adminToken}`).send(newOpetajaUpdated);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds status code 200 and success message in object', async function () {
        const response = await request(app).patch(`/oppejoud/${newOpetajaId}`).set('Authorization', `Bearer ${adminToken}`).send(newOpetajaUpdated);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
        
      });
    });
    
    describe('DELETE /oppejoud', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).delete('/oppejoud/9999').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds with status code 204', async function () {
        const response = await request(app).delete(`/oppejoud/${newOpetajaId}`).set('Authorization', `Bearer ${adminToken}`);
        expect(response.statusCode).to.equal(204);
      });
    });
  });

