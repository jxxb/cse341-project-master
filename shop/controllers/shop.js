const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
   Product.find()
   .then(products => {
      console.log(products);
      res.render('shop/prodlist', {
         prods: products, 
         pageTitle: 'All Products', 
         path:'/products', 
         isAuth: req.isLoggedIn
      });
   })
   .catch(err => {
      console.log(err);
   }); 
};

exports.getProduct = (req, res, next) => {
   const prodId = req.params.productId;
   Product.findById(prodId)
   .then(product => {
      res.render('shop/prodetail', {
         product: product,
         pageTitle: product.title,
         path: '/products',
         isAuth: req.isLoggedIn
         });
      })
      .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
   Product.find()
      .then(products => {
         res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path:'/', 
            isAuth: req.isLoggedIn
         });
      })
      .catch(err => {
         console.log(err)
      });
};

exports.getCart = (req,res,next) => {
   req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
         const products = user.cart.items;
         res.render('shop/cart', { 
            pageTitle: 'Your Cart', 
            path:'/cart', 
            products: cartProducts,
            isAuth: req.isLoggedIn
         });
      })
      .catch(err => console.log(err));
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
   .then(product => {
      return req.user.addToCart(product);
   })
   .then(result => {
      console.log(result);
      res.redirect('/shop/cart');
   })
};

exports.postCartDelProd = (req,res,next) => {
   const prodId = req.body.productId;
   req.user
      .removeFromCart(prodId)
      .then(result => {
         res.redirect('/shop/cart');
      })
      .catch(err => console.log(err));
};

exports.postOrder = (req,res,next) => {
   req.user
   .populate('cart.items/productId')
   .execPopulate()
   .then(user => {
      const order = new Order({
         user: {
            name: req.user.name,
            userId: req.user
         },
         products: products
      });
      return order.save();
   })
   .then(result => {
      return req.user.clearCart();
   })
   .then(() => {
      res.redirect('/orders');
   })
   .catch(err => console.log(err));
};

exports.getOrders = (req,res,next) => {
   Order.find({ 'user.userId': req.user._id})
   .then(orders => {
      res.render('shop/orders', { 
         pageTitle: 'Your Orders', 
         path:'/orders', 
         orders: orders,
         isAuth: req.isLoggedIn
      });
   })
   .catch(err => console.log(err));
};