const { InsertQueryBuilder } = require('typeorm')
const Modelo = require('./modeloTabelaProduto')
const instancia = require('../../../database/')
const NaoEncontrado = require('../../../erros/naoEncontrado')

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
        })
    },

    inserir(dados) {
        return Modelo.create(dados)
    },

    remover(idProduto, idFornecedor) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    },

    async pegarPorId(idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if(!encontrado) {
            throw new NaoEncontrado('Produto')
        }

        return encontrado
    },

    atualizar(idProduto, idFornecedor, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar, {
            where: {
                    id: idProduto,
                    fornecedor: idFornecedor
            }
        })
    },

    async diminuir(idProduto, idFornecedor, campo, quantidade) {
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = quantidade

            await produto.save()

            return produto
        })
    }
}