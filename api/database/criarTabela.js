const modelos = [ 
    require('../rotas/fornecedores/modeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/modeloTabelaProduto')

]    

async function criarTabelas() {
    for(let i = 0; i < modelos.length; i++) {
        const modelo = modelos[i]
        await modelo.sync()
    }
}

criarTabelas()