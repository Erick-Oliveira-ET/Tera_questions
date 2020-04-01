const Sequelize = require('sequelize');
const connection = require('./database');

const Responses = connection.define('responses', {
  response:{
    type: Sequelize.STRING,
    allowNull: false
  },
  question_responded_id:{
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Responses.sync({force: false}).then(()=>{});

module.exports = Responses;
