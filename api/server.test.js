const request = require('supertest')

const server = require('./server')
const db = require('../data/dbConfig')

beforeAll( async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach( async () => {
    await db('users').truncate()
})
afterAll( async () => {
    await db.destroy()
})

describe('Server connection', () => {
    it('responds with 200 if it is up', async() => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
    })
    it('able to access routes for /api/users', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(200)
    })
})