const express = require('express');
const wordsRouter = express.Router();

const words = require('../utils/words.js');

wordsRouter.get('/word', (req, res) => {
    const word = words[Math.floor(Math.random() * words.length)];
    return res.send(word);
});

module.exports = wordsRouter;
