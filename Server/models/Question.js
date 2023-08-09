const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  questionNo:{
    type : String,
    required : true
  },
  question:{
    type : String,
    required : true
  },
  optionOne:{
    type : String,
    required : true
  },
  optionTwo:{
    type : String,
    required : true
  },
  optionThree:{
    type : String,
    required : true
  },
  optionFour:{
    type : String,
    required : true
  },
  optionAnswer:{
    type : String,
    required : true
  }
});

const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;