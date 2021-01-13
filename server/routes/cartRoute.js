const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

router.get('/getAllCarts', cartController.getAllCarts);
router.post('/insertCart', cartController.insertCart);
router.get('/getCartByUserId', cartController.getCartByUserId);
// router.get('/getCartByUserIdStatus', cartController.getCartByUserIdStatus);
router.get('/updateCartStatus', cartController.updateCartStatus);

module.exports = router;

// http://localhost:5000/portfolio/getAllProjects