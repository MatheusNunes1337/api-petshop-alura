const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const SerializadorFornecedor = require('../../serializador').SerializadorFornecedor

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

router.get('/', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

module.exports = router