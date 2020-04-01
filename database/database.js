const sequelize = require('sequelize');

const connection = new sequelize("tera_questions", "root", "Ericktomaz12",{
  host:"localhost",
  dialect: 'mysql'
});

module.exports = connection;
