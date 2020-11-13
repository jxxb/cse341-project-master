const { urlencoded } = require('express');
const fetch = require('node-fetch');

let pokemon = [];
const PAGE_ITEMS = 10;

exports.getPR09 = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  let url ='https://pokeapi.co/api/v2/pokemon?offset=' + (page * 10 - 10) + '&limit=10';
  
  fetch(url)
      .then(response => {
         if (response.status != 200) {
            console.log('There was a problem. Status code: ' + response.status);
            return;
         }
            
         
         response.json().then(data => {
            for (i=0; i<10; i++) {
               pokemon.push(data.results[i].name);
            }
            totalItems = +data.count;
         })
      });

res.render('pages/prove/prove09', {
   mTitle: 'Prove09',
   path: '/prove09',
   pokemon: pokemon,
   currentPage: page,
   hasNextPage: PAGE_ITEMS * page < totalItems,
   hasPreviousPage: page > 1,
   nextPage: page + 1,
   previousPage: page - 1,
   lastPage: Math.ceil(totalItems / PAGE_ITEMS)
 });

 //Page reset
 pokemon.length = 0;
};
