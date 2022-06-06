const express = require('express');
const joi = require('joi');

const { User } = require('../models/User.js');
const userRouter = express.Router();

const userGameSchema = joi.object({
    isWinner: joi.boolean()
        .required()
})

userRouter.post('/save-game-result', async (req, res) => {
    const gameInfo = req.body;
    console.log(userGameSchema.validate(gameInfo));
});

module.exports = userRouter;