const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
  email1:{
    type : String,
    required : true
  },
  questionNo:{
    type : String,
    required : true
  },
  teamPoints:{
    type : String,
    required : true,
  }
});

const Game = mongoose.model('game', GameSchema);
module.exports = Game;