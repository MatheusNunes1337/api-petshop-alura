const ValorNaoSuportado = require('./erros/valorNaoSuportado')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    serializar(dados) {
        if(this.contentType === 'application/json') {
            this.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }
}

class SerializadorFornecedor {
    constructor(contentType) {
        super()
        this.contentType = contentType
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}