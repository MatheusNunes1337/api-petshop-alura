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

router.get('/fornecedores/:id', async (req, res) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.json(fornecedor)
    } catch(err) {
        res.json({mensagem: err.message})
    }
})

module.exports = router