const express = require('express')
const app = express()
require('dotenv').config()

const router = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/naoEncontrado')

app.use(express.json())
app.use(router)

//middleware para tratamento dos erros não encontrado

app.use((err, req, res, proximo) => {
    if(err instanceof NaoEncontrado) {
        res.status(404)
    } else {
        res.status(400)
    }
    res.json({mensagem: err.message})
})


app.listen(process.env.PORT, () => {
    console.log('servidor rodando!')
})