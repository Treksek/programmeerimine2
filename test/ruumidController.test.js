const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'ahikas@tlu.ee',
  password: 'A1B2C3D4',
};

const newRuum = {
    description: '55555', 
      
};

const newRuumUpdated = {
    description: '99999',
};

let newRuumId;
let adminToken;

describe('Ruumid controller', function () {
    describe('GET /ruumid', function () {
      it('responds with ruumid if logged in and respond in json and statusCode 200', async function () {
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        const response = await request(app).get('/ruumid').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
     });
    });

    
    describe('POST /ruumid', function () {
      it('responds with error message in json and statusCode 400 because of missing data', async function () {
        const response = await request(app).post('/ruumid');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Ruumi nimetus puudub');
      });
      it('responds with id of created ruumid', async function () {
        const response = await request(app).post('/ruumid').set('Authorization', `Bearer ${adminToken}`).send(newRuum);
        newRuumId = response.body.id;
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(newRuumId).to.be.a('number');
      });
      it('responds with error', async function () {
        const response = await request(app).post('/ruumid').send(adminUser);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
      });
    });
    
    describe('GET /ruumid/id', function () {
        it('responds status code 200', async function () {
          const response = await request(app).get(`/ruumid/${newRuumId}`).set('Authorization', `Bearer ${adminToken}`);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a('object');
        }); 
        it('responds with errorcode 400', async function () {
           const response = await request(app).get('/ruumid/9999').set('Authorization', `Bearer ${adminToken}`);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(400); 
        });
      });
    
    
    describe('PATCH /ruumid', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).patch('/ruumid/9999').set('Authorization', `Bearer ${adminToken}`).send(newRuumUpdated);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds status code 200 and success message in object', async function () {
        const response = await request(app).patch(`/ruumid/${newRuumId}`).set('Authorization', `Bearer ${adminToken}`).send(newRuumUpdated);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
        
      });
    });
    
    describe('DELETE /ruumid', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).delete('/ruumid/9999').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds with status code 204', async function () {
        const response = await request(app).delete(`/ruumid/${newRuumId}`).set('Authorization', `Bearer ${adminToken}`);
        expect(response.statusCode).to.equal(204);
      });
    });
  });

