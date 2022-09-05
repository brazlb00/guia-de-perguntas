/*
IMPORTAÇÃO DAS DEPENDÊNCIAS:
npm install express --save
npm i nodemon
npm install body-parser
npm install ejs
npm install sequelize sqlite3
*/

//importação de módulos
const express = require("express"); 
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")


//Body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
//Caso a conexão apresente erro de autenticação de protocolo rode o seguinte script no mysql: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'troquepelasenha'
connection.authenticate()
.then(() => {
    console.log("Conexão realizada com Mysql!!")
}).catch((msgErro) =>{
    console.log(msgErro);
})

//definição da view engine
app.set('view engine', 'ejs');

//definição de caminho de arquivos estáticos
app.use(express.static('public'));

//Rotas
app.get("/", (req,res)=>{
    Pergunta.findAll({raw: true,order:[
        ['id', 'DESC']  //criação de um vetor que definirá a ordem das perguntas pelo maior id.
    ]}).then(perguntas => {
        res.render("index.ejs", {
            perguntas: perguntas
        });
    });
    
});
app.get("/perguntar", (req,res)=>{
    res.render("perguntar.ejs")
});

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ 
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']  //ordenação das respostas mais recentes
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta:pergunta,
                    respostas: respostas
                });
            });
        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder", (req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    });
});

app.listen(8080,()=>{console.log("App rodando!");});