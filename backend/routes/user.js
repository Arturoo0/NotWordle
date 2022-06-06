const express = require('express');
const joi = require('joi');

const { User } = require('../models/User.js');
const { Session } = require('../models/Session.js');
const userRouter = express.Router();

const userGameSchema = joi.object({
    isWinner: joi.boolean()
        .required(), 
    sessionTokenId: joi.string()
        .required()
})

userRouter.post('/save-game-result', async (req, res) => {
    const gameInfo = req.body;
    console.log(gameInfo);
    const { value, error } = userGameSchema.validate(gameInfo);
    if (!error){
        const session = await Session.findOne({
            sessionIdentifier: gameInfo.sessionTokenId
        });
        if (session){
            const user = await User.findOne({email: session.associatedSessionEmail});
            user.games.push(gameInfo);
            user.save();
        }        
    }
});

module.exports = userRouter;