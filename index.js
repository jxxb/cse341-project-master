/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
//const mongoConnect = require('./shop/util/database');

const MongoDBStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const corsOptions = {
  origin: "https://pr0ve.herokuapp.com/",
  optionsSuccessStatus: 200
};

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://jxxb:C5i2ekhQPdXOWIbA@cluster0.jhggg.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions', 
});
// Route setup. You can implement more in the future!
//prove activities
const prove1Routes = require('./routes/prove/prove1.js');
const prove2Routes = require('./routes/prove/prove2.js');
/*const prove3Routes = require('./routes/prove/prove3.js');
const prove4Routes = require('./routes/prove/prove4.js');*/
//team activities
const ta01Routes = require('./routes/team/ta01');
const ta02Routes = require('./routes/team/ta02');
/*const ta03Routes = require('./routes/team/ta03'); 
const ta04Routes = require('./routes/team/ta04'); */
const shopRoutes = require('./shop/routes/shop');
const adminRoutes = require('./shop/routes/admin');
const authRoutes = require('./shop/routes/auth');

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'shop','public')))
app.use(
    session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
  )
   .set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'shop','views')])
   .set('view engine', 'ejs')
   .use((req,res,next) => {
     
   })
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/prove1', prove1Routes)
   .use('/prove2', prove2Routes)
   /*.use('/prove3', prove3Routes)
   .use('/prove4', prove4Routes)*/
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   /*.use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)*/
    .use('/shop',shopRoutes)
    .use('/admin',adminRoutes)
   .use('/auth',authRoutes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })
   
   mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
 // This should be your user handling code implement following the course videos
    app.listen(PORT,()=>{
      console.log("Connected to dB!")
    });
  })
  .catch(err => {
    console.log(err);
  });

  // mongoConnect((client) => {
  //   console.log(client);
  //   app.listen(5000);
  // });