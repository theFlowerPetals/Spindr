const Tables = require('../../db/models/dataModels');

module.exports = {
  getUserImages: (req, res) => {
    Tables.Image.findAll({})
    .then((images) => {
      console.log('found images ', images)
      res.status(200).send(images)
    })
    .catch(err => res.status(404).send(err));
  },

  addImage: (req, res) => {
    console.log('THIS IS REQ: ', req.body)
    Tables.Image.create({
      user_id: req.body.user_id,
      img_urls: req.body.img_urls
    })
    .then((image) => {
      console.log('THIS IS THE IMAGE ROW: ', image)
      res.status(200).send(image)
    })
    .catch(err => res.status(404).send(err.message));
  },
  // addUserImages: (req, res) => {
  //   Tables.Image.findOrCreate({
  //     where: {
  //       user_id: req.params.user_id
  //     }, 
  //     defaults: {
  //       user_id: req.params.user_id,
  //       img_urls: req.body.imgUrls,
  //     }
  //   })
  //     .spread(function(userResult, created){
  //       // this userId was either created or found depending upon whether the argment 'created' is true or false
  //       // do something with this user now
  //       console.log('this is userResult', userResult);
  //       console.log('this is create', created);
  //       if (created){
  //         // some logic
  //         res.status(201).send(data)
  //       }
  //       else {
  //         // some other logic
  //         Tables.Image.update({
  //           user_id: req.params.user_id,
  //           img_urls: req.body.imgUrls,
  //         },
  //         {where: {
  //             player: req.params.player
  //           }
  //         })
  //           .then((data) => {
  //             console.log('updated player info', data);
  //             res.status(201).send(data);
  //           })
  //           .catch(err => res.status(404).send(err));
  //       }     
  //     });
  // }
}