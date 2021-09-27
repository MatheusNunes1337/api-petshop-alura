const modelo = require('./modeloTabelaFornecedor')

module.exports = {
    listar() {
        return modelo.findAll()
    }
}