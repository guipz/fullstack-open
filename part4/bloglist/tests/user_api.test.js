const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const userTestHelper = require('./user_test_helper');

const api = supertest(app);

beforeEach(async () => {
  await userTestHelper.testUsersSetup();
});

describe('adding an user', () => {
  test('succeeds if valid', async () => {
    await api.post('/api/users').send(userTestHelper.getRandomUserCreationData());
    const usersAfter = await userTestHelper.usersInDB();
    expect(usersAfter).toHaveLength(userTestHelper.getLengthInitialUsersAdded() + 1);
  });

  test('fails if do not contain required values', async () => {
    const userWithoutName = { ...userTestHelper.getRandomUserCreationData };
    delete userWithoutName.name;
    const res = await api.post('/api/users').send(userWithoutName);
    expect(res.status).toBe(400);
  });

  test('fails if password is not valid', async () => {
    const userWithInvalidPass = { ...userTestHelper.getRandomUserCreationData, password: 'dw' };
    const res = await api.post('/api/users').send(userWithInvalidPass);
    expect(res.status).toBe(400);
  });

  test('fails if username is not valid', async () => {
    const userWithInvalidUsername = { ...userTestHelper.getRandomUserCreationData, username: 'gr' };
    const res = await api.post('/api/users').send(userWithInvalidUsername);
    expect(res.status).toBe(400);
  });

  test('returns bearer token', async () => {
    const res = await api.post('/api/users').send(userTestHelper.getRandomUserCreationData());
    expect(res.body.token).not.toBe(undefined);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
