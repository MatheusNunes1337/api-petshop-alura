const produtoRouter = require('express').Router({ mergeParams: true }) //mergeParams permite que a rota de produtos tenha acesso ao ID do fornecedor passado como parâmetro na rota
const tabelaProduto = require('./tabelaProduto')
const Produto = require('./Produto')
const { SerializadorProduto } = require('../../../serializador')

produtoRouter.get('/', async (req, res) => {
    const produtos = await tabelaProduto.listar(req.fornecedor.id)
    res.json(produtos)
})

produtoRouter.get("/:id", async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
    
        const produto = new Produto(dados)
        await produto.carregar()
        res.status(200).json(produto)
    } catch(err) {
        proximo(err)
    }
})

produtoRouter.post('/', async (req, res, proximo) => {
    try {
        const idFornecedor = req.fornecedor.id
        const dados = Object.assign({}, req.body, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201).json(produto)
    } catch(err) {
        proximo(err)
    }
})

produtoRouter.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id
    }
    console.log(dados)
    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204).end()
})

module.exports = produtoRouter