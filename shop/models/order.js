const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
   products: [
      {
         product: {type: Object, require: true},
         quantity: {type: Number, require: true }
      }
   ],
   user: {
      name: {
         type: String,
         required: true
      },
      userId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      }
   }
});

module.exports = mongoose.model('Order', orderSchema);


//                          CART.JS
// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename), 
//    'shop',
//    'data',
//    'cart.json'
//   );

// module.exports = class Cart {
//    static addProduct(id, prodPrice) {
//       //Fetch prev, cart
//       fs.readFile(p,(err,fileContent) => {
//          let cart = {products: [], totalPrice: 0};
//          if (!err) {
//             cart = JSON.parse(fileContent);
//          }
//       //Analyse cart
//          const existingProdIndex = cart.products.findIndex(
//             prod => prod.id === id
//             );
//          const existingProd = cart.products[existingProdIndex];
//          let updatedProd;
//       //add new product
//          if (existingProd) {
//             updatedProd = { ...existingProd};
//             updatedProd.qty = updatedProd.qty + 1;
//             cart.products = [...cart.products];
//             cart.products[existingProdIndex] = updatedProd;
//          } else {
//             updatedProd = {id: id, qty: 1 };
//             cart.products = [...cart.products, updatedProd];
            
//          }
//          cart.totalPrice = cart.totalPrice + +prodPrice;
//          fs.writeFile(p, JSON.stringify(cart), err => {
//                console.log(err);
//             });
//       });     
//    }
//    static deleteProd(id, prodPrice) {
//       fs.readFile(p,(err,fileContent) => {
//          if (err) {
//             return;
//          }
//          const updatedCart = {...JSON.parse(fileContent)};
//          const product = updatedCart.products.find(prod => prod.id === id);
//          if(!product) {
//             return;
//          }
//          const prodQty = product.qty;
//          updatedCart.products = updatedCart.products.filter(
//             prod => prod.id !== id
//             );
//          updatedCart.totalPrice =
//           updatedCart.totalPrice - prodPrice * prodQty;

//          fs.writeFile(p, JSON.stringify(updatedCart), err => {
//             console.log(err);
//          });
//       });
//    }

//    static getCart(cb) {
//       fs.readFile(p,(err,fileContent) => {
//          const cart = JSON.parse(fileContent);
//          if (err) {
//             cb(null);
//          } else {
//             cb(cart);
//          }
//       });
//    }
// };