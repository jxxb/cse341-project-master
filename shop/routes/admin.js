const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');
const adminController = require('../controllers/admin');

const isAuth = require('./middleware/isauth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/product => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
   '/add-product', 
   [
   body('title')
      .isString()
      .isLength({min: 3})
      .trim(),
   body('imgurl').isURL(), 
   body('price').isFloat(),
   body('descr')  
      .isLength({ min: 5, max:400 })
      .trim(),        
   ],
   isAuth,
   adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
   '/edit-product',
   [
      body('title')
         .isString()
         .isLength({min: 3})
         .trim(),
      body('imgurl').isURL(), 
      body('price').isFloat(),
      body('descr')  
         .isLength({ min: 5, max:400 })
         .trim(),        
   ], 
   isAuth, 
   adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDelProd);

module.exports = router;