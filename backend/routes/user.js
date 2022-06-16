const express = require('express');
const joi = require('joi');

const { User } = require('../models/User.js');
const { Session } = require('../models/Session.js');
const authentication = require('../middleware/authentication.js');
const userRouter = express.Router();

userRouter.use(authentication);

const userGameSchema = joi.object({
    isWinner: joi.boolean()
        .required(), 
    sessionTokenId: joi.string()
        .required(),
    word: joi.string()
        .required(),
    timeTaken: joi.number()
        .required()
})

const pullSessionEmail = async (req) => {
    const session = await Session.findOne({
        sessionIdentifier: req.headers.sessiontokenid
    });
    return session;
}
 
userRouter.post('/save-game-result', async (req, res) => {
    const gameInfo = req.body;
    const { error } = userGameSchema.validate(gameInfo);
    if (!error){
        const session = await pullSessionEmail(req);
        const user = await User.findOne({email: session.associatedSessionEmail});
        user.games.push(gameInfo);
        user.save();
           
    }
});

userRouter.get('/fetch-history', async (req, res) => {
    const session = await pullSessionEmail(req);
    const user = await User.findOne({email: session.associatedSessionEmail});
    return res.send({
        history: user.games
    });
}); 

module.exports = userRouter;