const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

let produtos = [];
let countIndex = 1;

app.post('/CriarProduto',(req,res)=>{

    const {nome,data,departamento,preco,quantidade} =req.body;

    const novoProduto = {id: countIndex ++ , nome,data,departamento,preco,quantidade};

    const nomeProduto = req.params.nome;
    const produto = produtos.find(e=>e.nome === nomeProduto);

    if(novoProduto){
        if(nome != null && nome != produto.nome){
            novoProduto.nome = nome;
        }  
        if(preco != null && preco >0 ){
            novoProduto.preco = preco;
        }  
        if(quantidade != null && quantidade >0 ){
            novoProduto.quantidade = quantidade;
        }  
    }else{
    res.status(400).json({message:"informação invalida,verifique o nome ou os vlores do produto"});
    }
    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
    
})

app.get('/MostrarProdutos',(req,res)=>{

    res.json(produtos);
})

app.get('/relatorio',(req,res)=>{

    res.json(produtos);     
})


app.put('/AtualizarProduto/:id',(req,res)=>{
    const idProduto = parseInt(req.params.id);
    const {nome,data,departamento,preco,quantidade} = req.body;

    const produto = produtos.find(e=>e.id === idProduto);

    if(produto){
    if(nome != null && nome != produto.nome){
        produto.nome = nome;
    }  

    if(data != null && data != produto.data){
        produto.data = data;
    }

    if(departamento != null && departamento != produto.departamento){
        produto.departamento = departamento;
    } 

    if(preco != null && preco != produto.preco && preco >0 ){
        produto.preco = preco;
    }

    if(quantidade != null && quantidade != produto.quantidade && quantidade >0){
        produto.quantidade = quantidade;
    }

    res.json(produto);    
    }else{
        res.status(404).json({message:"produto não encontrado"});
    }
})

app.delete('/DeletarProduto/:id',(req,res)=>{
    const idProduto = parseInt(req.params.id);

    const produto = produtos.find(e=>e.id === idProduto);

    if(produto){
        const index = produtos.indexOf(produto);
        produtos.splice(index,1);
        
        res.json({message:"Produto removido com sucesso",produto})
    }else{
        res.status(404).json({message:"Produto não encontrado"})
    }
})

app.listen(port,()=>{
    console.log("Servidor rodando na porta:" + port);
    
})