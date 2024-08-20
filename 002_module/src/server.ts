import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  // const insertTransaction = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Transação de Teste',
  //     amount: 1000,
  //   })
  //   .returning('*')

  // return insertTransaction
  const selectTransaction = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return selectTransaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
