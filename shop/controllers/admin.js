const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product',{
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      isAuth: req.isLoggedIn
   });
};

exports.postAddProduct = (req,res,next) => {
      const title = req.body.title;
      const imgurl = req.body.imgurl;
      const descr = req.body.descr;
      const price = req.body.price;
      
      const product = new Product(null,title,imgurl,descr,price);
      product.save();
   res.redirect('/shop');
};

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   if (!editMode) {
      return res.redirect('/');
   }
   const prodId = req.params.productId;
   Product.findById(prodId, product => {
      if (!product) {
         return res.redirect('/');
      }
      res.render('admin/edit-product',{
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      isAuth: req.isLoggedIn
      });
   });
};

exports.postEditProduct = (req,res,next) => {
   const prodId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedImgUrl = req.body.imgurl;
   const updatedDescr = req.body.descr;
   const updatedPrice = req.body.price;
   const updatedProduct = new Product(
      prodId, 
      updatedTitle, 
      updatedImgUrl, 
      updatedDescr,
       updatedPrice,
      );
   updatedProduct.save();
   res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('admin/products', {
         prods: products, 
         pageTitle: 'Admin Products', 
         path:'/admin/products', 
         isAuth: req.isLoggedIn
      });
   });
};

exports.postDelProd = (req, res, next) => {
   const prodId = req.body.prodId;
   Product.deleteById(prodId);
   res.redirect('/admin/products');
};