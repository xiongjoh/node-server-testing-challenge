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
    await db('hobbits').truncate()
})
afterAll( async () => {
    await db.destroy()
})

describe('User-model', () => {
    describe('User.getAll', () => {
        it('User.getAll returns empty array if no users', async () => {

        })
        it('User.getAll returns array of users if users', async () => {
    
        })
    })
    describe('User.create', () => {
        it('User.createUser returns user object with id', async () => {

        })
    })
    describe('User.delete', () => {
        it('User.delete returns 0 if user was not found', async () => {

        })
        it('User.delete return user object with id if deleted', async () => {
            
        })
    })
})