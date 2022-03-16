const fileReader = require('fs');

const wordStore = () => {
    console.log('Digesting word store...');
    try {
      const readFile = fileReader.readFileSync('sgb-words.txt', 'utf-8');
      const words = readFile.split('\n');
      const setOfWords = new Set();
      words.forEach((word) => setOfWords.add(word));
      console.log('Finished digesting word store.');
      return words;
    }catch (error) {
      console.log('Failed to digest words .txt in ./backend');
      process.exit(1);
    }
};
  
const arrayOfWords = wordStore();
const setOfWords = new Set();
arrayOfWords.forEach((word) => setOfWords.add(word));

module.exports = {
  arrayOfWords,
  setOfWords
};