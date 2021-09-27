const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    res.json(resultados)
})

router.post('/fornecedores', async (req, res) => {
    console.log(req.body)
    const fornecedor = new Fornecedor(req.body)
    await fornecedor.criar()
    res.json(fornecedor)
})

module.exports = router