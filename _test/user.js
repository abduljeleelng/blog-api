const chai = require('chai');
const request = require('supertest');
const app = require('../src');
const { expect } = chai;

const userProperty = {
  id: 1,
  firstName: 'John Doe',
  lastName: 'Ola',
  email: 'abduljelelng@gmail.com',
  password: 'adminOla',
  createdAt: '2021-02-08T00:00:00.000Z',
  updatedAt: '2021-02-08T00:00:00.000Z',
};


describe('user services endpoint', async () => {
  it('get all users sucess', async () => {
    const { body, status } = await request(app).get('/api/v1/user');
    expect(status).to.equal(200);
    expect(body.message).to.equal("user successfully fetched");
  });

  it('get a single users success', async () => {
    const { body, status } = await request(app).get('/api/v1/user/1');
    console.log(JSON.stringify({body, status}))
    expect(status).to.equal(200);
    expect(body.message).to.equal("user successfully fetched");
  });
});