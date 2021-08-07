var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var taskRouter = require('./routes/task');
var participantRouter = require('./routes/participants');


const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;


const User = require('./modeles/user');
const config = require('./config/global');

var app = express();



//create seession midleware
app.use(session({
  secret:'asdfg1@!2',
  resave: false,
  saveUninitialized: false
}));

//passport midleware
app.use(passport.initialize());
app.use(passport.session());



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//hbs helper
const hbs = require('hbs');
hbs.registerHelper('usDate', (dateVal)=>{
  return new hbs.SafeString(dateVal.toLocaleDateString('en-US'))
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Tasks', taskRouter);
app.use('/participants',participantRouter);

const mongoose = require('mongoose');
mongoose.connect(config.db)
.then(
  res =>
  {
    console.log('Connected to Database');
  }
).catch(() => {
  console.log('Connection failed')
})

//configure passport-github2 auth
passport.use(new githubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
},
//after successful login
async(accessToken, refreshToken, profile, done) =>{
  //check if user exist 
  const user = await User.findOne({ authId: profile.id })
  if(user) {return done(null,user)}
  else{
    const newUser = new User({
      username: profile.username,
      authID: profile.id,
      authProv: 'GitHub',
      created: Date.now()
    })
    const savedUser = await newUser.save();
    done(null,savedUser)
  }
  
 }
));

//configure passport-google-oauth20
passport.use(new googleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
},
//after successful login
async(accessToken, refreshToken, profile, done) =>{
  //check if user exist 
  const user = await User.findOne({ authId: profile.id })
  if(user) {return done(null,user)}
  else{
    const newUser = new User({
      username: profile.username,
      authID: profile.id,
      authProv: 'Google',
      created: Date.now()
    })
    const savedUser = await newUser.save();
    done(null,savedUser)
  }
  
 }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app;
