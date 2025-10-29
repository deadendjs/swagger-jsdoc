import request from 'supertest';

import { app, setupApp, server } from '../examples/app/app.js';
import swaggerSpec from '../examples/app/swagger-spec.json';

describe('Example application written in swagger specification (v2)', () => {
  beforeAll(async () => {
    await setupApp();
  });

  it('should be healthy', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return the expected specification', async () => {
    const response = await request(app).get('/api-docs.json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(swaggerSpec);
  });

  afterAll(() => {
    server.close();
  });
});
