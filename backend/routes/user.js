const express = require('express');

const userRouter = express.Router();

userRouter.post('/save-game-result', async (req, res) => {
    console.log(req.body);
});

module.exports = userRouter;