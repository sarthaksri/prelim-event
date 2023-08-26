const express = require('express');
const Question = require('../models/Question');
const Game = require('../models/Game');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');


// ROUTE 1: Get the answer and bet by the user using: POST "/api/control/control".
router.post('/control', async (req, res) => {
    try {
       const {questionNo, optionSelected, bet,email1} = req.body;
       let question = await Question.findOne({questionNo: questionNo});
       let game = await Game.findOne({email1: email1});
       if(optionSelected == question.optionAnswer)
       {
            game.teamPoints = parseInt(game.teamPoints) + 1.5*bet;
            game.questionNo = parseInt(game.questionNo) + 1;
       }
       else{
            game.teamPoints = parseInt(game.teamPoints) - bet;
            game.questionNo = parseInt(game.questionNo) + 1;
       }
         game.save();
         const questionno = parseInt(questionNo)+1;
         return res.status(200).json({
            message:"UPDATED POINTS SENDING GAME",
            success:true,
            game,
            questionno
         })
         
    } catch (error) {
        return res.status(400).json({
            message:error,
            success:false,
         })       
    }
});


router.post('/controllast', async (req, res) => {
     try {
        const {questionNo, optionSelected, bet,email1} = req.body;
        let question = await Question.findOne({questionNo: questionNo});
        let game = await Game.findOne({email1: email1});
        let correct =false;
        if(optionSelected == question.optionAnswer)
        {
             game.teamPoints = parseInt(game.teamPoints) + 1.5*bet;
             game.questionNo = parseInt(game.questionNo) + 1;
             correct=true;
        }
        else{
             game.teamPoints = parseInt(game.teamPoints) - bet;
             game.questionNo = parseInt(game.questionNo) + 1;
        }
          game.save();
          return res.status(200).json({
             message:"UPDATED POINTS SENDING GAME",
             success:true,
             game,
             questionNo,
             correct,
          })
     } catch (error) {
         return res.status(400).json({
             message:error,
             success:false,
          })       
     }
 });

module.exports = router;