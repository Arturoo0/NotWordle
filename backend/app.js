require('dotenv').config(); 

const cors = require('cors');
const express = require('express'); 
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileReader = require('fs');

const authRouter = require('./routes/auth.js');
const appStartTime = Date.now();

let words = null;

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

const wordStore = async () => {
  console.log('Digesting word store...');
  try {
    const readFile = await fileReader.readFileSync('sgb-words.txt', 'utf-8');
    const words = await readFile.split('\n');
    console.log('Finished digesting word store.');
  }catch (error) {
    console.log('Failed to digest words .txt in ./backend');
    process.exit(1);
  }
};

const startApp = async (words) => {
  await appCore();
  await wordStore();

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
