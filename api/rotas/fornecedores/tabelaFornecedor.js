const modelo = require('./modeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/naoEncontrado')
const CampoInvalido = require('../../erros/campoInvalido')

module.exports = {
    listar() {
        return modelo.findAll()
    },

    inserir(fornecedor) {
        return modelo.create(fornecedor)
    },

    async getById(id) {
        const fornecedor = await modelo.findOne({
            where: {
                id: id
            }
        })

        if(!fornecedor) {
            throw new NaoEncontrado()
        }

        return fornecedor
    },

    async atualizar(id, dadosParaAtualizar) {
        return modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    },

    remover(id) {
        return modelo.destroy({
            where: {id: id}
        })
    }
}