const express = require('express')
const app = express()
require('dotenv').config()


const router = require('./rotas/fornecedores')
const routerV2 = require('./rotas/fornecedores/rotas.v2')
const NaoEncontrado = require('./erros/naoEncontrado')
const CampoInvalido = require('./erros/campoInvalido')
const DadosNaoFornecidos = require('./erros/dadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/valorNaoSuportado')
const formatosAceitos = require('./serializador').formatosAceitos
const SerializadorErro = require('./serializador').SerializadorErro

app.use(express.json())

app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-Type', formatoRequisitado)
    res.set('X-Powered-By', 'Gatito Petshop')
    proximo()
})

app.use((req, res, proximo) => {
    res.set('Access-Control-Allow-Origin', '*')
    proximo()
})

app.use('/api/fornecedores', router)

app.use('/api/v2/fornecedores', routerV2)

//middleware para tratamento dos erros não encontrado

app.use((err, req, res, proximo) => {
    let statusCode = 500
    if(err instanceof NaoEncontrado) {
        statusCode = 404
    } 
    if(err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
        statusCode = 400
    }

    if(err instanceof ValorNaoSuportado) {
        statusCode = 406
    }
    res.status(statusCode)

    const serializadorErro = new SerializadorErro(
        res.getHeader('Content-Type')
    )
    res.send(serializadorErro.serializar({
        mensagem: err.message, 
        id: err.idErro
    }))
})


app.listen(process.env.PORT, () => {
    console.log('servidor rodando!')
})