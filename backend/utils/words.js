const fileReader = require('fs');

const wordStore = () => {
    console.log('Digesting word store...');
    try {
      const readFile = fileReader.readFileSync('sgb-words.txt', 'utf-8');
      const words = readFile.split('\n');
      console.log('Finished digesting word store.');
      return words;
    }catch (error) {
      console.log('Failed to digest words .txt in ./backend');
      process.exit(1);
    }
};
  
const words = wordStore();
module.exports = words;