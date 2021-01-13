const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

var multer = require('multer');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        let dt = new Date().getTime();
        //  console.log("DTT : ", dt, file)
        cb(null, String(dt) + file.originalname);
    }
});

var upload = multer({ storage: storage });

router.get('/getAllProducts', productsController.getAllProducts);
router.get('/getProductById', productsController.getProductById);
router.get('/deleteProduct', productsController.deleteProduct);
router.post('/updateProduct', upload.array('uploads[]', 12), productsController.updateProduct);
router.post('/addNewProduct', upload.array('uploads[]', 12), productsController.addNewProduct);

module.exports = router;

// http://localhost:5000/portfolio/getAllProjects