const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/pr1/form', { 
        title: 'Prove Assignment 01', 
        path: '/pr1', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/submit',(req, res, next) => {
   console.log(req.body);
   res.render('pages/pr1/display', { 
       title: 'Prove Assignment 01', 
       path: '/pr1', // For pug, EJS 
       activeTA03: true, // For HBS
       contentCSS: true, // For HBS
       fn: req.body.fn,
       ln: req.body.ln

   });
});

module.exports = router;