const { User } = require('../../db/models/dataModels');

module.exports = {
  //Create new user on new account login
  createUser: (req, res) => {
    console.log("this is user req: ", req.body)
    User.create({
      name: req.body.name,
      email: req.body.email,
      work: req.body.work,
      school: req.body.school
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(err => res.status(404).send(err.message))
  },
  //Grab all users from db
  getAllUsers: (req, res) => {
    User.findAll({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(err => res.status(404).send(err));
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
        id: req.params.id
      }
    })
    .then((user) => {
      console.log('found user: ', user)
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
  },
  //add interests
  addInterests: (req, res) => {
    console.log('this is the req: ', req.body)
    User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      user.interests.push(req.body.interests)
      user.update({
        interests: user.interests
      })
    })
      .then((updated) => {
        console.log('successfully updated', updated);
        res.status(202).send(updated);
      })
      .catch(err => res.status(404).send(err.message))
    .catch(err => res.status(404).send(err.message));
  }
}