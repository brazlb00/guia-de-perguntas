const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    titulo: {
        type: Sequelize.STRING,
        allowNulll: false},
    descricao:{
        type: Sequelize.TEXT,
        allowNulll:false
    }
});

Pergunta.sync({force:false}).then(() =>{
    console.log("Tabela Pergunta criada!")
});
module.exports = Pergunta;