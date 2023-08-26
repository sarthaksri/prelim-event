const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  questionNo:{
    type : String,
    required : true
  },
  question:{
    type : String,
    required : true
  },
  email1: {
    type: String,
    required : true,
    unique : true
  },
  teamPoints:{
    type : String,
    required : true
  },
  betAmount:{
    type : String,
    required : true
  }
});
module.exports = mongoose.model('Game', GameSchema);