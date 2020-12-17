const Users = require('./users-model')
const db = require('../../data/dbConfig')

const user1 = { name: 'Johnny' }
const user2 = { name: 'Peng' }
const user3 = { name: 'Chang' }

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

describe('User-model', () => {
    describe('User.getAll', () => {
        it('User.getAll returns empty array if no users', async () => {
            const results = await Users.getAll()
            expect(results).toHaveLength(0)
        })
        it('User.getAll returns array of users if users', async () => {
            await db('users').insert(user1)
            let res = await Users.getAll()
            expect(res).toHaveLength(1)
            await db('users').insert(user2)
            res = await Users.getAll()
            expect(res).toHaveLength(2)
        })
    })
    describe('User.create', () => {
        it('User.createUser returns user object with id', async () => {
            const res = await Users.create(user2)
            expect(res).toMatchObject(user2)
        })
        it('User.createUser to have created a new user in database', async () => {
            await Users.create(user3)
            const data = await db('users')
            expect(data[0]).toMatchObject(user3)
        })
    })
    describe('User.delete', () => {
        it('User.delete returns 0 if user was not found', async () => {
            const user = await Users.delete(4)
            expect(user).toBe(0)
        })
        it('User.delete return user object with id if deleted', async () => {
            await db('users').insert(user1)
            await db('users').insert(user2)
            await db('users').insert(user3)
            const user = await Users.delete(3)
            expect(user).toMatchObject(user3)
        })
    })
})