const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/getUsers', usersController.getUsers);
router.get('/userExist', usersController.userExist);
router.get('/mailExist', usersController.mailExist);
router.get('/idNumExist', usersController.idNumExist);
router.post('/insertUser', usersController.insertUser);

module.exports = router;

