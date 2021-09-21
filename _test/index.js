const chai = require('chai');
const request = require('supertest');
const app = require('../src');
const { expect } = chai;

describe('Testing Base Endpoint', async () => {
  it('Enpoint Base', async () => {
    const { body, status } = await request(app).get('/');
    // console.log({body, status})
    // const { data } = body;
    expect(status).to.equal(200);
    // expect(data).to.deep.include({ message: 'hellow word', doc: '' });
  });
  it('version one endpoint', async () => {
    const { body, status } = await request(app).get('/api/v1');
    // console.log({body, status})
    // const { data } = body;
    expect(status).to.equal(200);
    // expect(data).to.deep.include({ message: 'hellow word', doc: '' });
  });
});