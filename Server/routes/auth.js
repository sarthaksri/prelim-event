const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Game = require("../models/Game") 
const JWT_SECRET = 'xpedition';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', async (req, res) => {
    // If there are errors, return Bad request and the errors
    try {
      const {email1} = req.body;
      console.log(email1);
      // Check whether the user with this email exists already
      const existinguser = await User.findOne({email:email1});
      console.log(existinguser)
      if (existinguser!=null) {
        return res.status(400).json({ message: "Sorry a user with this email already exists" })
      }
      // Create a new user
      const game = await Game.create({
        questionNo:"1",
        question:"What would happen next?",
        email1:req.body.email1,
        teamPoints:"5000",
        betAmount:"0"
      })
      const user = await User.create({
        teamName: req.body.teamName,
        email1: req.body.email1,
        password: req.body.password,
        game:game._id,
      });
      // const data = {
      //   user: {
      //     id: user.id
      //   }
      // }
      // const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json({ authtoken })

      return res.status(200).json({
        success:true,
        message:"SIGN UP SUCCESSFULLY",
        user,
      })
  
    } catch (error) {
      // console.log(error)
      // console.error(error.message);
      return res.status(500).json(
        {
          success:false,
          message:"Internal server error",
          error:error
        }
      )
    }
  })






// ROUTE 1: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email1', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email1, password } = req.body;
  try {
    const user = await User.findOne({ email1 }).populate("Game").exec();
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    if (password != user.password) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const payload = {
      email:user.email1,
      id:user._id,
      user
    }
    const authtoken = jwt.sign(payload, JWT_SECRET,{
      expiresIn:"1h"
    });
    const  options = {
      expires: new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true
  }
  res.cookie("token",authtoken,options).status(200).json({
    success:true,
    message:"LOGGED IN SUCCESFULLY",
    user,
    payload,
    authtoken
})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 2: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;