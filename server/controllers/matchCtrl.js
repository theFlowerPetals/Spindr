const Tables = require('../../db/models/dataModels');

module.exports = {
  addMatchesRow: (req, res) => {
    Tables.Match.create({
      user_id: req.params.id
    })
    .then((row) => {
      res.status(200).send(row)
    })
    .catch(err => res.status(404).send(err));
  },

  getUserMatches: (req, res) => {
    Tables.Match.findAll({
      where: {
        user_id: req.params.id
      }
    })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch(err => res.status(404).send(err));
  },

  addUserMatch: (req, res) => {
    Tables.Match.findOne({
      where: {
        user_id: req.params.id
      }
    })
    .then((match) => {
      match.matches.push(req.body.match)
      match.update({
        matches: match.matches
      })
    })
      .then((updated) => {
        console.log('successfully updated', updated);
        res.status(202).send(updated);
      })
      .catch(err => res.status(404).send(err.message))
    .catch(err => res.status(404).send(err.message));
  },

  addUserLike: (req, res) => {
    Tables.Match.findOne({
      where: {
        user_id: req.params.id
      }
    })
    .then((match) => {
      match.likes.push(req.body.like)
      match.update({
        matches: match.likes
      })
    })
      .then((updated) => {
        console.log('successfully updated', updated);
        res.status(202).send(updated);
      })
      .catch(err => res.status(404).send(err.message))
    .catch(err => res.status(404).send(err.message));
  },

  addUserBlock: (req, res) => {
    Tables.Match.findOne({
      where: {
        user_id: req.params.id
      }
    })
    .then((match) => {
      match.blocks.push(req.body.block)
      match.update({
        matches: match.blocks
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