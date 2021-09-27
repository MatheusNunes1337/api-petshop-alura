const modelo = require('./modeloTabelaFornecedor')

module.exports = {
    listar() {
        return modelo.findAll()
    },

    inserir(fornecedor) {
        return modelo.create(fornecedor)
    }
}