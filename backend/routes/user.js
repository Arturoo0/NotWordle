const express = require('express');

const userRouter = express.Router();

userRouter.saveGame('/save-game-result', (req, res) => {
    console.log('hit');
});