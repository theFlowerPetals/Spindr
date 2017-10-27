const Tables = require('../../db/models/dataModels');

module.exports = {
  getChats: (req, res) => {
    Tables.Chat.findAll({
      where: {
        user_one: req.body.user1,
        user_two: req.body.user2
      }
    })
    .then((chat) => {
      res.status(200).send(user);
    })
    .catch(err => res.status(404).send(err))
  },

  postChats: (req, res) => {
    Tables.Chat.create({
      user_one: req.body.user1,
      user_two: req.body.user2,
      chat_entry: req.body.chat
    })
    .then((chat) => {
      res.status(201).send(chat);
    })
    .catch(err => res.status(404).send(err));
  },

  deleteChat: (req, res) => {
    Tables.Chat.findOne({
      where: {
        user_one: req.body.user1,
        user_two: req.body.user2
      }
    })
    .then((chat) => {
      chat.destroy();
    })
      .then((destroyed) => {
        res.status(202).send(destroyed);
      })
      .catch(err => res.status(404).send(err))

    .catch(err => res.status(404).send(err));
  }
}