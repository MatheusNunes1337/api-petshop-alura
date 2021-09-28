const tabelaFornecedor = require('./tabelaFornecedor')
const CampoInvalido = require('../../erros/campoInvalido')

class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await tabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        }) 
        
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const fornecedor = await tabelaFornecedor.getById(this.id)
        this.empresa = fornecedor.empresa
        this.email = fornecedor.email
        this.categoria = fornecedor.categoria
        this.dataCriacao = fornecedor.dataCriacao
        this.dataAtualizacao = fornecedor.dataAtualizacao
        this.versao = fornecedor.versao
    }

    async atualizar() {
        await tabelaFornecedor.getById(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach(async (campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }

            if(Object.keys(dadosParaAtualizar).length === 0) {
                throw new Error('Não foram fornecidos dados para atualizar')
            }

            await tabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
        })
    }

    remover() {
        return tabelaFornecedor.remover(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }

}

module.exports = Fornecedor