const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', isAuth, productsController.postAddProduct);

module.exports = router;
