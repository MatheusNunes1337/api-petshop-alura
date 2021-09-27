const express = require('express')
const app = express()
require('dotenv').config()

const router = require('./rotas/fornecedores')

app.use(express.json())
app.use(router)


app.listen(process.env.PORT, () => {
    console.log('servidor rodando!')
})