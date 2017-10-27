const Tables = require('../../db/models/dataModels');

module.exports = {
  //Create new user on new account login
  createUser: (req, res) => {
    Tables.User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        name: req.body.name,
        email: req.body.email,
        sex: req.body.sex,
        // work: req.body.work,
        // school: req.body.school
      }
    })
    .spread((user, created) => {
      console.log('updated user', user)
      if(created) {
        res.status(201).send(user);
      } else {
        Tables.User.update({
          name: req.body.name
        },
        {
          where: {
            email: req.body.email
          }
        })
          .then(() => {
            console.log('user in .then', user)
            res.status(201).send(user);
          })
          .catch(err => res.status(404).send(err.message))
      }
    })
    .catch(err => res.status(404).send(err.message))
  },
  
  //Grab all users from db
  getAllUsers: (req, res) => {
    Tables.User.findAll({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(err => res.status(404).send(err));
  },
  
  //Grab user from db using id
  getUserById: (req, res) => {
    Tables.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
  },
  
  //Grab user from db using email
  getUserByEmail: (req, res) => {
    Tables.User.findOne({
      where: {
        email: req.params.email
      }
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err));
  },
  
  //Add user interests and social score
  updateUserInfo: (req, res) => {
    Tables.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      user.update({
        interests: req.body.interests,
        social_score: req.body.social_score
      })
    })
      .then((updated) => {
        res.status(202).send(updated);
      })
      .catch(err => res.status(404).send(err.message))
    .catch(err => res.status(404).send(err.message));
  },

  //Add user match interests
  upateMatchInterests: (req, res) => {
    Tables.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      // user.match_weighted_interests.push(req.body.match_weighted_interests);
      user.update({
        match_social_score: req.body.match_social_score,
        match_interests: req.body.match_interests,
        match_weighted_interests: req.body.match_weighted_interests
      })
    })
      .then((updated) => {
        res.status(202).send(updated);
      })
      .catch(err => res.status(404).send(err.message))
    .catch(err => res.status(404).send(err.message));
  }
}