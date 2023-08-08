const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  teamName:{
    type : String,
    required : true
  },
  name1:{
    type : String,
    required : true
  },
  email1: {
    type: String,
    required : true,
    unique : true
  },
  rollNo1:{
    type : String,
    required : true
  },
  name2:{
    type : String,
    required : true
  },
  email2: {
    type: String,
    required : true,
    unique : true
  },
  rollNo2:{
    type : String,
    required : true
  },
  name3:{
    type : String,
    required : true
  },
  email3: {
    type: String,
    required : true,
    unique : true
  },
  rollNo3:{
    type : String,
    required : true
  },
  name4:{
    type : String,
    required : true
  },
  email4: {
    type: String,
    required : true,
    unique : true
  },
  rollNo4:{
    type : String,
    required : true
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;