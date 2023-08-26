const express = require('express');
const Question = require('../models/Question');
const Game = require('../models/Game');
const router = express.Router();

router.get('/getLeaderboard', async (req, res) => {
    try
    {
        let game = (await Game.find().sort({teamPoints:-1})).slice(0,7);
        res.json(game);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;