const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// ROUTE 1: Add the questions using: POST "/api/game/addquestions".
router.post('/addquestions', async (req, res) => {
  try {

   let question = await Question.create({
        questionNo: req.body.questionNo,
        question: req.body.question,
        optionOne: req.body.optionOne,
        optionTwo: req.body.optionTwo,
        optionThree: req.body.optionThree,
        optionFour: req.body.optionFour,
        optionAnswer: req.body.optionAnswer,
      });
      return res.status(200).json({
        success:true,
        message:"QUESTION CREATED",
        question,
      })
      res.json(question);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Get the questions using: POST "/api/game/getquestions".
router.post('/getquestions', async (req, res) => {
  try {
    const questionNo = await req.body.questionNo;
    const questions = await Question.findOne({questionNo});
    return res.status(200).json({
      success:true,
      message:"sending questions",
      questions,
    })
    // res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;