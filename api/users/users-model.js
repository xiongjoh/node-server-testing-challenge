const db = require('../../data/dbConfig')

module.exports = {
    getAll(){
        return db('users')
    },
    async create(user){
        const [id] = await db('users').insert(user, 'id')
        return db('users').where({id}).first()
    },
    async delete(id){
        const user = await db('users').where({id}).first()
        const isDeleted = await db('users').where({id}).delete()
        return isDeleted ? user : isDeleted
    },
}