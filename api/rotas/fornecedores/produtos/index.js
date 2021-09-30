const produtoRouter = require('express').Router({ mergeParams: true }) //mergeParams permite que a rota de produtos tenha acesso ao ID do fornecedor passado como parâmetro na rota
const tabelaProduto = require('./tabelaProduto')
const Produto = require('./Produto')

produtoRouter.get('/', async (req, res) => {
    const produtos = await tabelaProduto.listar(req.params.idFornecedor)
    res.json(produtos)
})

produtoRouter.post('/', async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    const dados = Object.assign({}, req.body, { fornecedor: idFornecedor })
    const produto = new Produto(dados)
    await produto.criar()
    res.status(201).json(produto)
})

produtoRouter.delete('/:id', (req, res) => {
    const dados = {
        id: req.params.id,
        idFornecedor: req.params.idFornecedor
    }

    const produto = new Produto(dados)
})

module.exports = produtoRouter