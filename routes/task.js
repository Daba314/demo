var express = require('express');
var router = express.Router();
const Task = require('../modeles/task');
const passport = require('passport');

//prevent unauthenticate user go to this page and redirect to the login page
function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

router.get('/index', (req, res, next) => {
  //Task model to fetch all data
  Task.find((err,tasks) => {
    if(err){
      console.log(err)
    }
    else{
      res.render('Tasks/index', {
        Title:'My Tasks',
        tasks:tasks,
        //we need to end user otherwise layout wont see any user
        user:req.user
      })
    }
  })
});

router.get('/add',isLoggedin,(req, res, next) => {
    res.render('Tasks/add', { title: 'Task Details',user:req.user});
  });

  //post
router.post('/add', (req, res, next) => {
    //use the task model to save the data to MongoDB
    //Task reprsent our model
    //our model is mongoose schema
    Task.create({
      task:req.body.task,
      startDate:req.body.startDate,
      endDate:req.body.endDate
    },(err,newTask) =>{
      //check if we get the error
      if(err){
        console.log(err)
      }
      else {
        //we shoud redirect to index view
        res.redirect('/Tasks/index')
      }
    })
  }); 

  //delete
  router.get('/delete/:_id',(req, res, next) => {
    Task.remove({_id:req.params._id}, error =>{
      if(error){
        console.log(error)
      }
      else{
        res.redirect('/Tasks/index')
      }
    })
  });

//edit
router.get('/edit/:_id',isLoggedin,(req, res, next) => {
  Task.findById(req.params._id, (error,tasks) =>{
    if(error){
      console.log(error)
    }
    else{
      res.render('Tasks/edit',{tasks:tasks, user:req.user})
    }
  })
});

//send changes to mongo
router.post('/edit/:_id', (req, res, next) => {
  Task.findOneAndUpdate({_id:req.params._id},{
    task:req.body.task,
    startDate:req.body.startDate,
    endDate:req.body.endDate
  },(err,newTask) =>{
    if(err){
      console.log(err)
    }
    else {
      res.redirect('/Tasks/index')
    }
  })
}); 

module.exports = router;