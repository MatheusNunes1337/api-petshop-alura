const produtoRouter = require('express').Router()

produtoRouter.get('/', (req, res) => {
    res.json([])
})

module.exports = produtoRouter