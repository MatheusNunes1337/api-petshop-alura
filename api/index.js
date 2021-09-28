const express = require('express')
const app = express()
require('dotenv').config()

const router = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/naoEncontrado')
const CampoInvalido = require('./erros/campoInvalido')
const DadosNaoFornecidos = require('./erros/dadosNaoFornecidos')

app.use(express.json())
app.use(router)

//middleware para tratamento dos erros não encontrado

app.use((err, req, res, proximo) => {
    let statusCode = 500
    if(err instanceof NaoEncontrado) {
        statusCode = 404
    } 
    if(err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
        statusCode = 400
    }
    res.status(statusCode)
    res.json({mensagem: err.message})
})


app.listen(process.env.PORT, () => {
    console.log('servidor rodando!')
})