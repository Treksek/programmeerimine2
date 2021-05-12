const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'ahikas@tlu.ee',
  password: 'A1B2C3D4',
};

const newKursus = {
    description: 'Test', 
      
};

const newKursusUpdated = {
    description: 'UusTest',
};

let newKursusId;
let adminToken;

describe('Kursused controller', function () {
    describe('GET /kursused', function () {
      it('responds with kursused if logged in and respond in json and statusCode 200', async function () {
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        const response = await request(app).get('/kursused').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
     });
    });

    
    describe('POST /kursused', function () {
      it('responds with error message in json and statusCode 400 because of missing data', async function () {
        const response = await request(app).post('/kursused');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Kursuse nimetus puudub');
      });
      it('responds with id of created kursus', async function () {
        const response = await request(app).post('/kursused').set('Authorization', `Bearer ${adminToken}`).send(newKursus);
        newKursusId = response.body.id;
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(201);
        expect(newKursusId).to.be.a('number');
      });
      it('responds with error', async function () {
        const response = await request(app).post('/kursused').send(adminUser);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
      });
    });
    
    describe('GET /kursused/id', function () {
        it('responds status code 200', async function () {
          const response = await request(app).get(`/kursused/${newKursusId}`).set('Authorization', `Bearer ${adminToken}`);
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a('object');
      }); 
        it('responds with errorcode 400', async function () {
           const response = await request(app).get('/kursused/9999').set('Authorization', `Bearer ${adminToken}`);
           expect(response.body).to.be.a('object');
           expect(response.statusCode).to.equal(400);
           
           
        });
      });
    
    describe('PATCH /kursused', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).patch('/kursused/9999').set('Authorization', `Bearer ${adminToken}`).send(newKursusUpdated);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds status code 200 and success message in object', async function () {
        const response = await request(app).patch(`/kursused/${newKursusId}`).set('Authorization', `Bearer ${adminToken}`).send(newKursusUpdated);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
        
      });
    });
    
    describe('DELETE /kursused', function () {
      it('responds with statusCode 400 because of missing id', async function () {
        const response = await request(app).delete('/kursused/9999').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(400);
        });
      it('responds with status code 204', async function () {
        const response = await request(app).delete(`/kursused/${newKursusId}`).set('Authorization', `Bearer ${adminToken}`);
        expect(response.statusCode).to.equal(204);
      });
    });
  });

