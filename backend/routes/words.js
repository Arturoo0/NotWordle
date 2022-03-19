const express = require('express');
const authetication = require('../middleware/authentication.js');
const { User } = require('../models/User.js');
const wordsRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

const words = require('../utils/words.js');

wordsRouter.use(authetication);

wordsRouter.get('/word', async (req, res) => {
    const arrayOfWords = words.arrayOfWords;
    const word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];

    const query = { email: req.emailIdentifier };
    const gameInfo = {
        gameId: uuidv4(),
        targetWord: word
    }
    await User.findOneAndUpdate(
        query,
        { $push: {games: gameInfo} }
    );
    return res.send(word);
});

wordsRouter.get('/is-valid-word/:word', (req, res) => {
    const { word } = req.params;
    return res.send(words.setOfWords.has(word));
})

module.exports = wordsRouter;
