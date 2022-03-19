require('dotenv').config(); 

const cors = require('cors');
const express = require('express'); 
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const words = require('./utils/words.js');

const authRouter = require('./routes/auth.js');
const wordRouter = require('./routes/words.js')
const appStartTime = Date.now();

const appCore = async () => {
  console.log('Connecting to mongo instance...');
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to mongo instance.');
  }catch (error) {
    console.log('Failed to connect to mongo instance.');
    process.exit(1);
  }
};

const startApp = async () => {
  await appCore();

  const port = 3000;
  const app = express();

  app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true 
  }));
  app.use(cookieParser());
  app.use(express.urlencoded({
      extended: true
  }));
  app.use(express.json()); 

  app.use('/auth', authRouter);
  app.use('/words', wordRouter);

  app.get('/', (req, res) => {
    const status = {
      uptime: Date.now() - appStartTime
    }
    res.send(status);
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}

startApp();

