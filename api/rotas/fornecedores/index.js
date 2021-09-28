const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/naoEncontrado')
const DadosNaoFornecidos = require('../../erros/dadosNaoFornecidos')

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    res.json(resultados)
})

router.post('/fornecedores', async (req, res, proximo) => {
    try {
        console.log(req.body)
        const fornecedor = new Fornecedor(req.body)
        await fornecedor.criar()
        res.status(201).json(fornecedor)
    } catch(err) {
        proximo(err)
    }
})

router.get('/fornecedores/:id', async (req, res, proximo) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200).json(fornecedor)
    } catch(err) {
        proximo(err)
    }
})

router.put('/fornecedores/:id', async (req, res, proximo) => {
    try {
        const id = req.params.id
        const dados = Object.assign({}, req.body, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(200).json({mensagem: 'informações atualizadas com sucesso'})
    } catch(err) {
        proximo(err)
    }
})

router.delete('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(200).json({mensagem: 'fornecedor deletado com sucesso'})
    } catch(err) {
        proximo(err)
    }


})

module.exports = router