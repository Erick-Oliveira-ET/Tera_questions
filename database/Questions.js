const Sequelize = require('sequelize');
const connection = require('./database');

const Questions = connection.define('Questions', {
  Title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  Description:{
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Questions.sync({force: false}).then(()=>{});

module.exports = Questions;
