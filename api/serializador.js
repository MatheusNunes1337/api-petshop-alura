const ValorNaoSuportado = require('./erros/valorNaoSuportado')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    serializar(dados) {
        if(this.contentType === 'application/json') {
            return this.json(this.filtrarObjeto(dados))
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados) {
        const novoObjeto = {}

        this.camposPublicos.forEach(campo => {
            if(dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType) {
        super()
        this.camposPublicos = ['id', 'empresa', 'categoria']
        this.contentType = contentType
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}