const express = require('express');
const router = express.Router();
const cart_productsController = require('../controllers/cart_productsController')

router.get('/getCartProducts', cart_productsController.getCartProducts);
router.post('/insertProductToCart', cart_productsController.insertProductToCart);
router.get('/removeFromCart', cart_productsController.removeFromCart);

module.exports = router;
