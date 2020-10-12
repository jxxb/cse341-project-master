const routes = require('express').Router();

const clas = require('./class');
const team = require('./team');
const prove = require('./prove');

routes
      .use('./class', clas)
      .use('./team', team)
      .use('./prove',prove)

      .get('/',(req,res,next) => {
         res.render('pages/index',{title: 'Welcome to my CSE341 repo',path:'/'});
      })
      .use((req,res,next) => {
         res.render('pages/404', {title: '404 = Page Not Found', path:req.url})
      })
module.exports = routes;
