const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController')

router.get('/getAllOrders', ordersController.getAllOrders);
router.post('/insertOrder', ordersController.insertOrder);

module.exports = router;
