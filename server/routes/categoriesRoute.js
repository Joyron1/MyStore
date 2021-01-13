const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController')

router.get('/getAllCategories', categoriesController.getAllCategories);
router.post('/insertCategory', categoriesController.insertCategory);

module.exports = router;

// http://localhost:5000/portfolio/getAllProjects