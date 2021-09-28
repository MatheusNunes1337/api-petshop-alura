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