//Icebreaker routes
const router = require('express').Router();
const icebreakerCtrl = require('../controllers/icebreakerCtrl');

router.route('/getQuestion')
  .get(icebreakerCtrl.addQuestion);

router.route('/addQuestion')
  .post(icebreakerCtrl.addQuestion);
