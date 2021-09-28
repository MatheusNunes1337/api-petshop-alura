const modelo = require('./modeloTabelaFornecedor')

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
            throw new Error('Fornecedor não encontrado')
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