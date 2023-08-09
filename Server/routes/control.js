const express = require('express');
const Question = require('../models/Game');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');

module.exports = router;