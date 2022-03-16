const express = require('express');
const wordsRouter = express.Router();

const words = require('../app.js');

wordsRouter.get('/word', async (req, res) => {
    return {};
});

module.exports = wordsRouter;
