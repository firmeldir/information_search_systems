import minimist from 'minimist';
import { ForwardIndex } from './indexes/ForwardIndex';
import { InvertedIndex } from './indexes/InvertedIndex';

const args = minimist(process.argv.slice(2));

const forwardIndex = new ForwardIndex();
const invertedIndex = new InvertedIndex();

const fileToSearch = args.file;
const wordToSearch = args.word;

(async () => {
  await forwardIndex.update();
  console.log('forward index loaded');
  await invertedIndex.update();
  console.log('inverted index loaded');

  if (fileToSearch) {
    const words = forwardIndex.search(fileToSearch);
    console.log(`words in file ${fileToSearch}: ${words}`);
  }
  if (wordToSearch) {
    const files = invertedIndex.search(wordToSearch);
    console.log(`files with word ${wordToSearch}: ${files?.join(', ')}`);
  }
})();
