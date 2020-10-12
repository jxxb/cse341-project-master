//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const nameArray = ["Bill", "Bob", "Joe"];

router.post('/addUser',(req, res, next) => {
    const newUser = req.body.newUser;
    nameArray.push(newUser);
    res.redirect('/ta02/');
});

router.post('/remUser',(req, res, next) => {
    const delUser = req.body.delUser;

    const del = nameArray.indexOf(delUser);
    if (del != -1) {
        nameArray.splice(del,1);
    }

    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/team/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        users: nameArray,
    });
});



module.exports = router;