const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Questions = require("./database/Questions");
const Responses = require('./database/Responses');

connection
  .authenticate()
  .then(() => {
    console.log("Successfull connection");
  })
  .catch((msgError) =>{
    console.log(msgError);
  })

//View engine com ejs
app.set('view engine','ejs');
app.use(express.static('public'));

//Comunicação entre ejs e node
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Banco de dados

app.get("/",function(req, res){
  res.render("index_page");
});

app.get("/questions_page",function(req, res){
  res.render("questions_page");
});

app.post("/save_questions", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;

  Questions.create({
    Title: title,
    Description: description
  }).then(()=>{
    console.log("Salvo com sucesso");
    res.redirect("/");
  });
});

app.get("/answers", (req, res) => {
    Questions.findAll({raw:true, order: [
      ['id', 'DESC'] //DESC é em ordem decrescente e ASC é em ordem crescente
    ]}) .then(Questions => {
      res.render("answers", {
        Questions: Questions
      });
    });
});

app.get("/question_described/:id", (req, res) => {
  const id = req.params.id;
  Questions.findOne({
    where: {id: id}
  }).then(question => {
    if(question != undefined){
      Responses.findAll({
        where: {question_responded_id: id},
        order: [['id', 'DESC']]
      }).then(responses => {
        res.render("question_described", {
          question : question,
          Responses: responses
        });
      })
    }else{
        res.redirect("/answers");
    }
  });
});

app.post("/answers_storage", (req,res)=>{
  var response_body = req.body.ResponseBody;
  var question_id = req.body.questionID;

  Responses.create({
    response: response_body,
    question_responded_id: question_id
  }).then(()=>{
    console.log("Salvo com sucesso");
    res.redirect("/question_described/"+question_id);
  });

})
app.listen(8080, () => {
  console.log("App rodando");
});
