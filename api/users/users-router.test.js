const request = require('supertest')
const express = require('express')

const router = require('./users-router')
const db = require('../../data/dbConfig')

const server = express()

const user1 = { name: 'Johnny' }
const user2 = { name: 'Peng' }
const user3 = { name: 'Chang' }

server.use(express.urlencoded({ extended: false}))
server.use(express.json())
server.use("/", router)

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

describe('endpoints for /api/users', () => {
    describe('[GET] /', () => {
        it('responds with 200 on success', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
        it('responds with empty array if no users', async () => {
            const res = await request(server).get('/')
            expect(res.body).toHaveLength(0)
        })
        it('responds with an array of user objects if not empty', async () => {
            await db('users').insert(user1)
            await db('users').insert(user2)
            await db('users').insert(user3)
            const res = await request(server).get('/')
            expect(res.body).toHaveLength(3)
            expect(res.body[0]).toMatchObject(user1)
            expect(res.body[1]).toMatchObject(user2)
            expect(res.body[2]).toMatchObject(user3)
        })
    })
    describe('[POST] /', () => {
        it('returns newly created user', async () => {
            const user = await request(server).post('/').send(user1)
            expect(user.body).toMatchObject(user1)
        })
        it('return error message if we add user twice', async () => {
            await request(server).post('/').send(user2)
            const user = await request(server).post('/').send(user2)
            expect(JSON.stringify(user.body)).toMatch(/fail/)
        })
    })
    describe('[DELETE] /:id', () => {
        it('returns user object if user is deleted', async () => {
            await db('users').insert(user1)
            const user = await request(server).delete('/1')
            expect(user.body).toMatchObject(user1)
        })
        it('returns 404 status if user does not exist', async () => {
            const user = await request(server).delete('/3')
            expect(user.status).toBe(404)
        })
    })
})