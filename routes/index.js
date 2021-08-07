var express = require('express');
var router = express.Router();
//authentication
const User = require('../modeles/user');
const passport = require('passport');

// get home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Plan App' });
});

//get register page.
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create an account' });
});

// get login page. 
router.get('/login', function(req, res, next) {
  let message = req.session.messages || []
  req.session.messages = []
  res.render('login', { title: 'Login in your account', messages:message });
});

//post for the register
router.post('/register', (req, res, next) => {
  User.register(new User({
    username:req.body.username
  }),req.body.password,(error,newUser) =>{
    if(error){
      return res.redirect('/register')
    }
    else{
        req.login(newUser,(error) => {
          res.redirect('/login')
        })
    }
  }
  )
})

//post for the login
router.post('/login', passport.authenticate('local', {
  successRedirect:'/Tasks/index',
  failureRedirect:'/login',
  failureMessage: 'Invalid inputs'
}))

//logout
router.get('/logout',(req,res,next) => {
  req.logout();
  res.redirect('/login')
})

//get github
router.get('/github', passport.authenticate('github',{scope:['user:email']}));

//get after login
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
 function(req,res){
    res.redirect('/Tasks/index');
  });

  //get google
  router.get('/google', passport.authenticate('google',{scope:['profile']}));

//get after login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
 function(req,res){
    res.redirect('/Tasks/index');
  });

module.exports = router;
