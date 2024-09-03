import request from 'supertest'
import { app } from '@/app'

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym of Jim',
        description: 'Some description',
        phone: '1140028922',
        latitude: -7.2208774,
        longitude: -39.4082317,
      })

    expect(response.statusCode).toEqual(201)
  })
})
