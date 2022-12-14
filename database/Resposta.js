const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false}).then(()=>{
    console.log("Tabela Resposta criada!")
});
module.exports = Resposta;  //para usar o module Resposta em qualquer arquivo do pacote. 