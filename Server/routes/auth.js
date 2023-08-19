const express = require('express');
const User = require('../models/User');
const Game = require('../models/Game');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'xpedition';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('teamName', 'Enter a valid name').isLength({ min: 2 }),
    body('name1', 'Enter a valid name').isLength({ min: 3 }),
    body('email1', 'Enter a valid email').isEmail(),
    body('name2', 'Enter a valid name').isLength({ min: 3 }),
    body('email2', 'Enter a valid email').isEmail(),
    body('name3', 'Enter a valid name').isLength({ min: 3 }),
    body('email3', 'Enter a valid email').isEmail(),
    body('name4', 'Enter a valid name').isLength({ min: 3 }),
    body('email4', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email1 });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
  
      // Create a new user
      user = await User.create({
        teamName: req.body.teamName,
        name1: req.body.name1,
        email1: req.body.email1,
        rollNo1: req.body.rollNo1,
        name2: req.body.name2,
        email2: req.body.email2,
        rollNo2: req.body.rollNo2,
        name3: req.body.name3,
        email3: req.body.email3,
        rollNo3: req.body.rollNo3,
        name4: req.body.name4,
        email4: req.body.email4,
        rollNo4: req.body.rollNo4,
        password: req.body.password,
      });
      await Game.create({
        email1: req.body.email1,
        questionNo: "1",
        teamPoints:"5000",
      });
        
  
     res.send("Hello");
  
    } catch (error) {
      console.log("printinh",error)
      res.status(500).send("Internal Server Error");
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
    let user = await User.findOne({ email1 });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    if (password != user.password) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

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