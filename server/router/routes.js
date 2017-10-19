const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const icebreakerCtrl = require('../controllers/icebreakerCtrl');
const imgCtrl = require('../controllers/imgCtrl');
const matchCtrl = require('../controllers/matchCtrl');
const chatCtrl = require('../controllers/chatCtrl');


//User table routes
router.route('/addUser')
  .post(userCtrl.createUser);

router.route('/getUsers')
  .get(userCtrl.getAllUsers);

router.route('/userEmail/:email')
  .get(userCtrl.getUserByEmail);

router.route('/userId/:id')
  .get(userCtrl.getUserById);

router.route('/userId/:id')
  .put(userCtrl.addInterests);


//Image table routes
router.route('/images')
  .get(imgCtrl.getUserImages)
  .post(imgCtrl.addImage);


//Match table routes
router.route('/matches/:id')
  .get(matchCtrl.getUserMatches)
  .post(matchCtrl.addMatchesRow);

router.route('/addMatch/:id')
  .put(matchCtrl.addUserMatch);

router.route('/addLike/:id')
  .put(matchCtrl.addUserLike);

router.route('/addBlock/:id')
  .put(matchCtrl.addUserBlock);


//Chat table routes
router.route('/chats')
  .get(chatCtrl.getChats)
  .post(chatCtrl.postChats)
  .delete(chatCtrl.deleteChat);
  

//Icebreaker table routes
router.route('/getQuestion')
  .get(icebreakerCtrl.addQuestion);

router.route('/addQuestion')
  .post(icebreakerCtrl.addQuestion);

module.exports = router;