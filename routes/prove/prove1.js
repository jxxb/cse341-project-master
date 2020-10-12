const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/prove/form1', { 
        title: 'Prove Assignment 01', 
        path: '/pr1', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/submit',(req, res, next) => {
   console.log(req.body);
   res.render('pages/prove/display1', { 
       title: 'Prove Assignment 01', 
       path: '/pr1', // For pug, EJS 
       activeTA03: true, // For HBS
       contentCSS: true, // For HBS
   });
});

module.exports = router;