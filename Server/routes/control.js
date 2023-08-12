const express = require('express');
const Question = require('../models/Question');
const Game = require('../models/Game');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get the answer and bet by the user using: POST "/api/control/control".
router.post('/control', fetchuser, async (req, res) => {
    try {
       const {questionNo, optionSelected, bet, teamName} = req.body;
       let question = await Question.findOne({questionNo: questionNo});
       let game = await Game.findOne({teamName: teamName});
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
         res.json(game);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;