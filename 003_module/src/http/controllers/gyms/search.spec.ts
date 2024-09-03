import request from 'supertest'
import { app } from '@/app'

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym of Jim',
        description: 'Some description',
        phone: '1140028922',
        latitude: -7.2208774,
        longitude: -39.4082317,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym of Jim - Two',
        description: 'Some description',
        phone: '1140028922',
        latitude: -7.2208774,
        longitude: -39.4082317,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Two',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym of Jim - Two',
      }),
    ])
  })
})
