const mongoose = require('mongoose');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product',{
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: false,
      errorMessage: null,
      validationErrors: []
   });
};

exports.postAddProduct = (req,res,next) => {
   const title = req.body.title;
   const imgurl = req.body.imgurl;
   const descr = req.body.descr;
   const price = req.body.price;
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
      console.log(errs.array());
      return res.status(422).render('admin/edit-product', {
         pageTitle: 'Add Product',
         path: '/admin/add-product',
         editing: editMode,
         hasError: true,
         product: {
            title: title,
            imgurl: imgurl,
            price: price,
            descr: descr
         },
         errorMessage: errors.array()[0].msg,
         validationErrors: errors.array()
      });
   }
   
   const product = new Product({
      //_id: new mongoose.Types.ObjectId('5f9db2a7a18a204dd0662aa2'),
      title: title,
      imgurl: imgurl,
      descr: descr,
      price: price,
      userId: req.user
   });
   product
   .save()
   .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
   })
   .catch(err => {
   //    return res.status(500).render('admin/edit-product', {
   //       pageTitle: 'Add Product',
   //       path: '/admin/aa-product',
   //       editing: editMode,
   //       hasError: true,
   //       product: {
   //          title: title,
   //          imgurl: imgurl,
   //          price: price,
   //          descr: descr
   //       },
   //       errorMessage: 'Data Base Op Failure: errors.array()_2_()[0].msg',
   //       validationErrors: []
   //    });
   //res.redirect('/500');
   const error = new Error(err);
   error.httpStatusCode = 500;
   return next(error);
   });
};

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   if (!editMode) {
      return res.redirect('/');
   }
   const prodId = req.params.productId;
   Product.findById(prodId)
      .then(product => {
         if (!product) {
            return res.redirect('/');
         }
         res.render('admin/edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
         });
      })
      .catch(err => {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
         }
      );
};

exports.postEditProduct = (req,res,next) => {
   const prodId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedImgUrl = req.body.imgurl;
   const updatedDescr = req.body.descr;
   const updatedPrice = req.body.price;
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
      console.log(errs.array());
      return res.status(422).render('admin/edit-product', {
         pageTitle: 'Edit Product',
         path: '/admin/edit-product',
         editing: true,
         hasError: true,
         product: {
            title: updatedTitle,
            imgurl: updatedImgUrl,
            price: updatedPrice,
            descr: updatedDescr,
            _id: prodId 
         },
         errorMessage: errors.array()[0].msg,
         validationErrors: error.array()
      });
   }
   

   Product.findById(prodId)
     .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
           return res.redirect('/shop');
        }
         product.title = updatedTitle;
         product.imgurl = updatedImgUrl; 
         product.descr = updatedDescr;
         product.price = updatedPrice;
         return product.save().then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
         });
     }) 
      .then(result => {
         console.log('UPDATED PRODUCT!');
         res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
   updatedProduct.save();
   res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
   Product.find({userId: req.user._id})
   .then(products => {
      console.log(products);
      res.render('admin/products', {
         prods: products, 
         pageTitle: 'Admin Products', 
         path:'/admin/products', 
      });
   })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
      });
};

exports.postDelProd = (req, res, next) => {
   const prodId = req.body.prodId;
   Product.deleteOne({_id: prodId, userId: req.user._id})
   .then(() => {
      console.log('Destroyed Proodit');
      res.redirect('/admin/products');
   })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
      });
};