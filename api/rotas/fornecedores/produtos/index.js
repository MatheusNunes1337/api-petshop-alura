const produtoRouter = require('express').Router({ mergeParams: true }) //mergeParams permite que a rota de produtos tenha acesso ao ID do fornecedor passado como parâmetro na rota
const tabelaProduto = require('./tabelaProduto')
const Produto = require('./Produto')
const { SerializadorProduto } = require('../../../serializador')
const router = require('..')

produtoRouter.get('/', async (req, res) => {
    const produtos = await tabelaProduto.listar(req.fornecedor.id)
    const serializadorProduto = new SerializadorProduto(
        res.getHeader('Content-Type')
    )
    res.send(serializadorProduto.serializar(produtos))
})

produtoRouter.get("/:id", async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
    
        const produto = new Produto(dados)
        await produto.carregar()
        const serializadorProduto = new SerializadorProduto(
            res.getHeader('Content-Type'),
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.status(200).send(serializadorProduto.serializar(produto))
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
        const serializadorProduto = new SerializadorProduto(
            res.getHeader('Content-Type')
        )
        res.status(201).send(serializadorProduto.serializar(produto))
    } catch(err) {
        proximo(err)
    }
})

produtoRouter.put('/:id', async (req, res) => {
    let dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.id
    }
    dados = Object.assign({}, req.body, dados)

    const produto = new Produto(dados)
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