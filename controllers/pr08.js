const fs = require('fs');
const path = require('path');

const p = path.join(
   path.dirname(require.main.filename),
   'data',
   'prove08.json'
);

let products = [];
const PAGE_ITEMS = 10;

exports.getPR08 = (req, res, next) => {
   const page = +req.query.page || 1;
   let totalItems;

   fs.readFile(p, (err, fileContent) => {
      if (err) {
         console.log('cannot read the JSON file');
         return [];
      } else {
         products = JSON.parse(fileContent);
      }
   });


totalItems = products.length;
console.log(page);

res.render('pages/prove/prove08', {
   mTitle: 'Prove08',
   path: '/prove08',
   products: products,
   currentPage: page,
   hasNextPage: PAGE_ITEMS * page < totalItems,
   hasPreviousPage: page > 1,
   nextPage: page + 1,
   previousPage: page - 1,
   lastPage: Math.ceil(totalItems / PAGE_ITEMS)
 });
};
