const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    res.json(resultados)
})

module.exports = router