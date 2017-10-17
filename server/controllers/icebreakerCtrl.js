const { Icebreaker } = require('../../db/models/dataModels');

module.exports = {
  //Fetch ice-breaker question from db
  getQuestion: (req, res) => {
    Icebreaker.findAll({})
    .then((questions) => {
      res.status(200).send(questions);
    })
    .catch(err => res.status(404).send(err));
  },
  //Add a new question to db
  addQuestion: (req, res) => {
    Icebreaker.create({
      question: req.body.question
    })
    .then((question) => {
      res.status(200).send(question);
    })
    .catch(err => res.status(404).send(err));
  }
}