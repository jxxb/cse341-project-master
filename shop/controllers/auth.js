const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

// transporter.sendMail({
//    to:email,
//    from: 'Ecomroject.com',
//    subject: 'Signup succeeded!',
//    html: '<h1>You successfully signed up!</h1>'
// });

exports.getLogin = (req,res,next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
   res.render('auth/login', { 
      pageTitle: 'Login', 
      path:'/login', 
      error: message,
      oldInput: {
         email: '',
         password: ''
      },
      validationErrors: []
   });
};

exports.getSignup = (req,res,next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
   res.render('auth/signup', { 
      pageTitle: 'Signup', 
      path:'/signup', 
      error: message,
      oldInput: {
         email:'',
         password:'',
         confirmPassword: ''
      },
      validationErrors: []
   });
};

exports.postLogin = (req,res,next) => {
   const email = req.body.email;
   const password = req.body.password;

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render('/login', { 
         pageTitle: 'Login', 
         path:'/login', 
         error: errors.array()[0].msg,
         oldInput:{
            email: email,
            password: password
         },
         validationErrors: errors.array()
      });
   }

   User.findOne({email:email})
   .then(user => {
      if (!user) {
         return res.status(422).render('/login', { 
            pageTitle: 'Login', 
            path:'/login', 
            error: 'Invalid email or password.',
            oldInput:{
               email: email,
               password: password
            },
            validationErrors: []
         });
      }
      bcrypt
      .compare(password, user.password)
      .then(doMatch => {
         if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
               console.log(err);
               res.redirect('/shop');
            });
         }
         return res.status(422).render('/login', { 
            pageTitle: 'Login', 
            path:'/login', 
            error: 'Invalid email or password.',
            oldInput:{
               email: email,
               password: password
            },
            validationErrors: []
         });
      })
      .catch(err => {
         console.log(err);
         res.redirect('/login');
      });
   })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
      });
};

exports.postSignup = (req,res,next) => {
   const email = req.body.email;
   const password = req.body.password;
   //const conf = req.body.confpassword;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render('auth/signup', { 
         pageTitle: 'Signup', 
         path:'/signup', 
         error: errors.array()[0].msg,
         oldInput: {
            email:email,
            password:password,
            conf: req.body.confpassword
         },
         validationErrors: errors.array()
      });
   }
   
         bcrypt
         .hash(password, 12)
         .then(hashedPassword => {
         const user = new User ({
            email: email,
            password: hashedPassword,
            cart: {items: []}
            });
         return user.save();
         })
         .then(result => {
            res.redirect('/auth/login');
         })
         .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
            }); 
};

exports.postLogout = (req,res,next) => {
   req.session.destroy((err) => {
      console.log(err);
      res.redirect('/shop');
   });
};

exports.getReset = (req,res,next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
   res.render('auth/reset', { 
      pageTitle: 'Reset Password', 
      path:'/reset', 
      error: message
   });
};

exports.postReset = (req,res,next) => {
   crypto.randomBytes(32, (err,buffer) => {
      if (err) {
         console.log(err);
         return res.direct('/reset');
      }
      const token = buffer.toString('hex');
      User.findOne({email: req.body.email})
      .then(user=>{
         if(!user){
            req.flash('error','No account with that email.');
            return res.redirect('auth/reset');
         }
         user.resetToken = token;
         user.resetTokenExp = Date.now() + 3600000;
         return user.save();
      })
      .then(result => {
         res.redirect('/shop');
         transporter.sendMail({
            to:req.body.email,
            from: 'Ecomroject.com',
            subject: 'Password Reset',
            html: `
               <h3>Password Reset Request</h3>
               <p><a href="http://localhost:5000/reset${token}">Click here></a> to reset password</p>
            `
         });
      })
      .catch(err => {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
      });
   });
};

exports.getNewPassword = (req,res,next) => {
   const token = req.params.token;
   User.findOne({resetToken: token, resetTokenExp: {$gt: Date.now()}})
   .then(user=> {
      let message = req.flash('error');
      if (message.length > 0) {
         message = message[0];
      } else {
         message = null;
      }
      res.render('/auth/new-password', { 
         pageTitle: 'New Password', 
         path:'/new-password', 
         error: message,
         userId: user._id.toString(),
         passwordToken: token
      });
   })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
   });
};

exports.postNewPassword = (req,res,next) => {
   const newPass = req.body.password;
   const userId = req.body.userId;
   const passToken = req.body.passwordToken;


   User.findOne(
      {resetToken: passToken,
      resetTokenExp: {$gt: Date.now()},
      _id: userId
   })
   .then(user=> {
      resetUser = user;
      return bcrypt.hash(newPassword,12);
   })
   .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExp = undefined;
      return resetUser.save();
   })
   .then(result => {
      res.redirect('/login');
   })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
   });
};