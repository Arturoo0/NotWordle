const express = require('express');
const wordsRouter = express.Router();

const words = require('../utils/words.js');

wordsRouter.get('/word', (req, res) => {
    const arrayOfWords = words.arrayOfWords;
    const word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
    return res.send(word);
});

wordsRouter.get('/is-valid-word/:word', (req, res) => {
    const { word } = req.params;
    return res.send(words.setOfWords.has(word));
})

module.exports = wordsRouter;
