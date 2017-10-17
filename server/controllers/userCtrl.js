const { User } = require('../../db/models/dataModels');

module.exports = {
  //Create new user on new account login
  createUser: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      work: req.body.work,
      school: req.body.school
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(err => res.status(404).send(err))
  },
  //Grab user from db using email
  getUserByEmail: (req, res) => {
    User.findOne({
      where: {
        email: req.params.email
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
  },
  //Grab user from db using id
  getUserById: (req, res) => {
    User.findOne({
      where: {
        email: req.params.id
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
  },
}