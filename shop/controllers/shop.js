const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/prodlist', {
         prods: products, 
         pageTitle: 'All Products', 
         path:'/products', 
         isAuth: req.isLoggedIn
      });
   });
};

exports.getProduct = (req, res, next) => {
   const prodId = req.params.productId;
   Product.findById(prodId, product => {
      res.render('shop/prodetail', {
         product: product,
          pageTitle: product.title,
          path: '/products',
          isAuth: req.isLoggedIn
         });
   });

};

exports.getIndex = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/index', {
         prods: products, 
         pageTitle: 'Shop', 
         path:'/', 
         isAuth: req.isLoggedIn
      });
   });
};

exports.getCart = (req,res,next) => {
   Cart.getCart(cart => {
      Product.fetchAll(products => {
         const cartProducts = [];
         for (product of products) {
            const cartProdData = cart.products.find(prod => prod.id === product.id);
            if (cartProdData) {
               cartProducts.push({productData: product, qty: cartProdData.qty});
            }
         }
         res.render('shop/cart', { 
            pageTitle: 'Your Cart', 
            path:'/cart', 
            products: cartProducts,
            isAuth: req.isLoggedIn
         });
      });
   });
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
   Cart.addProduct(prodId, product.price);
  });
  res.redirect('/shop/cart');
};

exports.getOrders = (req,res,next) => {
   res.render('shop/orders', { 
      pageTitle: 'Your Orders', 
      path:'/orders', 
      isAuth: req.isLoggedIn
   });
};

exports.postCartDelProd = (req,res,next) => {
   const prodId = req.body.productId;
   Product.findById(prodId, (product) => {
      Cart.deleteProd(prodId, product.price);
      res.redirect('/shop/cart');
   });
};

exports.getCheckout = (req, res, next) => {
   res.render('shop/cart', {
      pageTitle: 'Checkout', 
      path:'/checkout'
   });
};