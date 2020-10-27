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
   
   const product = new Product({
      title: title,
      imgurl: imgurl,
      descr: descr,
      price: price});
   product
   .save()
   .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
   })
   .catch(err => {
      console.log(err);
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
            isAuth: req.isLoggedIn
         });
      })
      .catch(err => console.log(err));
};

exports.postEditProduct = (req,res,next) => {
   const prodId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedImgUrl = req.body.imgurl;
   const updatedDescr = req.body.descr;
   const updatedPrice = req.body.price;

   Product.findById(prodId)
     .then(product => {
         product.title = updatedTitle;
         product.imgurl = updatedImgUrl; 
         product.descr = updatedDescr;
         product.price = updatedPrice;
         return product.save();
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
   Product.find
   .then(products => {
      console.log(products);
      res.render('admin/products', {
         prods: products, 
         pageTitle: 'Admin Products', 
         path:'/admin/products', 
         isAuth: req.isLoggedIn
      });
   })
   .catch(err => console.log(err));
};

exports.postDelProd = (req, res, next) => {
   const prodId = req.body.prodId;
   Product.findByIdAndRemove(prodId)
   .then(() => {
      console.log('Destroyed Proodit');
      res.redirect('/admin/products');
   })
   .catch(err => console.log(err));
};