import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Jim - The Gym',
      description: null,
      phone: null,
      latitude: -7.2208774,
      longitude: -39.4082317,
    })

    await gymsRepository.create({
      title: 'Far Jim - The Gym',
      description: null,
      phone: null,
      latitude: -7.5875298,
      longitude: -39.2854363,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.2301454,
      userLongitude: -39.4064851,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Jim - The Gym' }),
    ])
  })
})
