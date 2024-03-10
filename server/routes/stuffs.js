const express = require('express')

const router = express.Router()

//GET all stuffs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all stuffs'})
})

//GET a single stuff
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single stuff'})
})

module.exports = router

