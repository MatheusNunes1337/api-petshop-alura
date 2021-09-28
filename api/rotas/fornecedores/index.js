const router = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/naoEncontrado')
const DadosNaoFornecidos = require('../../erros/dadosNaoFornecidos')
const SerializadorFornecedor = require('../../serializador').SerializadorFornecedor

router.get('/fornecedores', async (req, res ) => {
    const resultados = await tabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(resultados)
    )
})

router.post('/fornecedores', async (req, res, proximo) => {
    try {
        console.log(req.body)
        const fornecedor = new Fornecedor(req.body)
        await fornecedor.criar()
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.status(201).send(serializador.serializar(fornecedor))
    } catch(err) {
        proximo(err)
    }
})

router.get('/fornecedores/:id', async (req, res, proximo) => {

    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.status(200).json(serializador.serializar(fornecedor))
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
        res.status(204)
        res.end()
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
        res.status(204)
        res.end()
    } catch(err) {
        proximo(err)
    }


})

module.exports = router