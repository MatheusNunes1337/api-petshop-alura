const produtoRouter = require('express').Router({ mergeParams: true }) //mergeParams permite que a rota de produtos tenha acesso ao ID do fornecedor passado como parâmetro na rota
const tabelaProduto = require('./tabelaProduto')
const Produto = require('./Produto')
const { SerializadorProduto } = require('../../../serializador')
const router = require('..')

produtoRouter.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

produtoRouter.get('/', async (req, res) => {
    const produtos = await tabelaProduto.listar(req.fornecedor.id)
    const serializadorProduto = new SerializadorProduto(
        res.getHeader('Content-Type')
    )
    res.send(serializadorProduto.serializar(produtos))
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
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime())
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/fornecedores/${produto.fornecedor}/produto/${produto.id}`)
        res.status(201).send(serializadorProduto.serializar(produto))
    } catch(err) {
        proximo(err)
    }
})

produtoRouter.options('/:id', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, PUT, HEAD')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
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
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime())
        res.set('Last-Modified', timestamp)
        res.status(200).send(serializadorProduto.serializar(produto))
    } catch(err) {
        proximo(err)
    }
})

produtoRouter.head('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
    
        const produto = new Produto(dados)
        await produto.carregar()
    
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime())
        res.set('Last-Modified', timestamp)
        res.status(200).end()
    } catch(err) {
        proximo(err)
    }
})


produtoRouter.put('/:id', async (req, res, proximo) => {
    try {
        let dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }

        dados = Object.assign({}, req.body, dados)
    
        const produto = new Produto(dados)
        await produto.atualizar()
        await produto.carregar()
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime())
        res.set('Last-Modified', timestamp)
        res.status(204).end()
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

produtoRouter.options('/:id/diminuir-estoque', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, PUT, HEAD')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

produtoRouter.post('/:id/diminuir-estoque', async(req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor: req.fornecedor.id
        }
        const produto = new Produto(dados)

        await produto.carregar()
        produto.estoque = produto.estoque - req.body.quantidade //quantidade = quantidade vendida
        await produto.diminuirEstoque()
        await produto.carregar()
        res.set('ETag', produto.versao)
        const timestamp = (new Date(produto.dataAtualizacao).getTime())
        res.set('Last-Modified', timestamp)
        res.status(204).end()
    } catch(err) {
        proximo(err)
    }
})

module.exports = produtoRouter