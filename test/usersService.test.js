const { expect } = require('chai');
const { usersService } = require('../api/services');

let users;

const existingUser = {
  id: 1,
  firstName: 'Minni',
  lastName: 'Maalikas',
  email: 'minnike@tlu.ee',
  role: 'user'
};
const adminUser = {
  email: 'ahikas@tlu.ee',
  password: 'A1B2C3D4',
};

const newUser = {
  firstName: 'Tiina',
  lastName: 'Tina',
  email: 'tiina2@tiina.ee',
  password: 'tina',
};

const newUserUpdated = {
  firstName: 'Tuuli',
  lastName: 'Tamm',
  email: 'tuuli@tiina.ee',
  password: 'mingiParool'
};

let idToBeUpdated;

describe('Users service', function () {
  describe('GET /users', function () {
    it('should return array of users', async function () {
      users = await usersService.getUsers();
      expect(users).to.be.a('array');
    });
    it('should contain at least 1 user', async function () {
      expect(users.length).to.be.gt(1);
    });
  });
  
  describe('POST /users', function () {
    it('should return the last inserted ID', async function () {
      const user = await usersService.createUser(newUser);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id']);
      idToBeUpdated = user.id;
    });

    it('should return error if user email exists', async function () {
      const user = await usersService.createUser(newUser);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['error']);
    });
  });
  describe('GET /users/id', function () {
    it('should return user object with keys', async function () {
      const user = await usersService.getUserById(idToBeUpdated);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id', 'firstName', 'lastName', 'email', 'role']);
    });
  });
  describe('GET /users by email', function () {
    it('should return user object with keys', async function () {
      const user = await usersService.getUserByEmail(newUser.email);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id', 'email', 'role', 'password']);
    });
  });

  describe('PATCH /users', function () {
    it('should return true if update successful', async function () {
      newUserUpdated.id = idToBeUpdated;
      const user = await usersService.updateUser(newUserUpdated);
      expect(user).to.be.true;
    });
  });
});