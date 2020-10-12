const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

//const { getAddProduct } = require('../controllers/admin');

const p = path.join(path.dirname(process.mainModule.filename),
   'shop',
   'data',
   'products.json'
  );
  
const getFileProds = (cb) => {
   
  fs.readFile(p, (err,fileContent) => {
     if(err) {
        return cb([]);
     }
     cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
   constructor(id, title, imgurl, descr, price) {
      this.id = id;
      this.title = title;
      this.imgurl = imgurl;
      this.descr = descr;
      this.price = price;
   }

   save() {
      getFileProds(products => {
         if (this.id) {
         const existingProdIndex = products.findIndex(products => products.id === this.id);
         const updatedProds = [...products];
         updatedProds[existingProdIndex] = this;
         fs.writeFile(p, JSON.stringify(updatedProds),err => {
            console.log(err);
            });
      } else {
         this.id = Math.random().toString();
         products.push(this);
         fs.writeFile(p, JSON.stringify(products),err => {
         console.log(err);
         });
      }  
      });
   }

   deleteById(id) {
      getFileProds(products => {
         const product = products.find(prod => prod.id === id);
         const updatedProducts = products.filter(prod => prod.id !== id);
         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
               Cart.deleteProd(id, product.price);
            }
         });
         cb(product);
      });
   }

   

   static fetchAll(cb) {
     getFileProds(cb);
   }

   static findById(id, cb) {
      getFileProds(products => {
         const product = products.find(p => p.id === id);
         cb(product);
      });
   }
};