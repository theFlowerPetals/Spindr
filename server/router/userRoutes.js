//User table routes
const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.route('/addUser')
  .post(userCtrl.createUser);

router.route('/addUser/:email')
  .get(userCtrl.getUserByEmail);

router.route('/addUser/:id')
  .get(userCtrl.getUserById);

