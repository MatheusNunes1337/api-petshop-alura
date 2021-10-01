const routerV2 = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const SerializadorFornecedor = require('../../serializador').SerializadorFornecedor

routerV2.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

routerV2.get('/', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

module.exports = routerV2