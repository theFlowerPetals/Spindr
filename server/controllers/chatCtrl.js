const Tables = require('../../db/models/dataModels');

module.exports = {
  getChats: (req, res) => {
    Tables.Chat.findAll()
    .then((chat) => {
      res.status(200).send(chat);
    })
    .catch(err => res.status(404).send(err))
  },

  postChats: (req, res) => {
    Tables.Chat.create({
      room_num: req.body.room_num,
      chat_entry: req.body.chat_entry
    })
    .then((chat) => {
      console.log('Req room_num:', req.body.room_num);
      console.log('Req chat_entry:', req.body.chat_entry);
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