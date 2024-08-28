import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym of Jim - The First',
      description: null,
      phone: null,
      latitude: -7.2208774,
      longitude: -39.4082317,
    })

    await gymsRepository.create({
      title: 'Gym of Jim - Version Two',
      description: null,
      phone: null,
      latitude: -7.2208774,
      longitude: -39.4082317,
    })

    const { gyms } = await sut.execute({
      query: 'Two',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym of Jim - Version Two' }),
    ])
  })

  it('should be able to fectch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym of Jim - ${i}`,
        description: null,
        phone: null,
        latitude: -7.2208774,
        longitude: -39.4082317,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Jim',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym of Jim - 21' }),
      expect.objectContaining({ title: 'Gym of Jim - 22' }),
    ])
  })
})
