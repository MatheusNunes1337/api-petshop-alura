const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    res.json(resultados)
})

router.post('/fornecedores', async (req, res) => {
    try {
        console.log(req.body)
        const fornecedor = new Fornecedor(req.body)
        await fornecedor.criar()
        res.json(fornecedor)
    } catch(err) {
        res.json({mensagem: err.message})
    }
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

router.put('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dados = Object.assign({}, req.body, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.json({mensagem: 'informações atualizadas com sucesso'})
    } catch(err) {
        res.send({mensagem: err.message})
    }
})

router.delete('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.json({mensagem: 'fornecedor deletado com sucesso'})
    } catch(err) {
        res.send({mensagem: err.message})
    }


})

module.exports = router