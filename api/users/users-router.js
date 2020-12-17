const express = require('express')

const Users = require('./users-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await Users.getAll()
        res.status(200).json(users)
    } catch(err) {
        res.status(500)
    }
})
router.post('/', async (req, res) => {
    try {
        const user = await Users.create(req.body)
        if(!user) {
            res.status(400).json({message:`User already exists`})
        } else {
            res.status(201).json(user)
        }
    } catch(err) {
        res.status(500)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.delete(req.params.id)
        if(!user) {
            res.status(404).json(user)
        } else {
            res.json(user)
        }
    } catch(err) {
        res.status(500)
    }
})

module.exports = router