var express = require('express');
var router = express.Router();
const Participants = require('../modeles/participants.js')
router.get('/justSee', (req, res, next) => {
    //Project model to fetch all data
    Participants.find((err,participants) => {
      if(err){
        console.log(err)
      }
      else{
        res.render('Participants/justSee', {
          Title:'Members of the project',
          participants:participants})
        }
    })
  });

  module.exports = router;