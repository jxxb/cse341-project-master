const express = require('express');
const router = express.Router();

const bookArray = 
[{title:"The Hobbit", 
author:"J. R. R. Tolkien", 
summary:"Bilbo is the hero of everyone's childhood. Why?  It's because he is a hobbit."}];

router.post('/add',(req, res, next) => {
const nBook = req.body.nBook;
const nAuth = req.body.nAuth;
const nSum = req.body.nSum;

  bookArray.push({title:nBook, author:nAuth, summary:nSum});

  res.redirect('/');
});

router.get('/',(req, res, next) => {
   res.render('routes/prove/prove2', {
      mTitle: 'American Book Club',
      path: '/prove2',
      books: bookArray,
    });
   });

module.exports = router;