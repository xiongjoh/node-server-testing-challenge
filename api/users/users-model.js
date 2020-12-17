const db = require('../../data/dbConfig')

module.exports = {
    getAll(){
        return db('users')
    },
    async create(user){
        try {
            const [id] = await db('users').insert(user, 'id')
            return db('users').where({id}).first() 
        } catch(err) {
            return `fail to add user`
        }
    },
    async delete(id){
        try {
            const user = await db('users').where({id}).first()
            const isDeleted = await db('users').where({id}).delete()
            return isDeleted ? user : isDeleted
        } catch(err) {
            return `something went wrong, failed to delete user`
        }

    },
}