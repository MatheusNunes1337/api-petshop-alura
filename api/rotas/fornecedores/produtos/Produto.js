const Tabela = require('./tabelaProduto')

class Produto {
    constructor({ id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    validar() {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error('O campo de título está inválido')
        }

        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error('O campo de preço está inválido')
        }

        if(typeof this.estoque !== 'number') {
            throw new Error('O campo de estoque está inválido')
        }
    }

    async criar() {
        this.validar()
        const resultado = await Tabela.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor,
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async apagar() {
        console.log(this.id, this.fornecedor)
        return await Tabela.remover(this.id, this.fornecedor)
    }
}

module.exports = Produto