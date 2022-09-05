const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root', 'Lucn@t120620',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;
