import { readFiles } from './../src/readFiles';
import { InvertedIndex } from './../src/indexes/InvertedIndex/InvertedIndex';
import { ForwardIndex } from './../src/indexes/ForwardIndex/ForwardIndex';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import minimist from 'minimist';
import { CACHE_DIR, FILES_COUNT, WORDS_COUNT } from './../src/config';
import { FILES_DIR } from '../src/config';

const args = minimist(process.argv.slice(2));
const onlyIndex = args.onlyIndex;

(async () => {
  if (!onlyIndex) {
    fs.rmSync(FILES_DIR, { recursive: true, force: true });
    fs.mkdirSync(FILES_DIR);
    console.log('Generating files...');
    const filePromises = Array.from({ length: FILES_COUNT }).map(() => {
      const fileName = `FILE-${faker.random.word()}`;
      if (fileName.includes('/')) {
        return Promise.resolve();
      }
      const filePath = `${FILES_DIR}/${fileName}`;
      const fileContent = faker.random.words(WORDS_COUNT);
      return fs.promises.writeFile(filePath, fileContent);
    });
    await Promise.all(filePromises);
    console.log('Files generated...');
  }
  console.log('Generating index...');
  await fs.promises.rm(CACHE_DIR, { recursive: true, force: true });
  await fs.promises.mkdir(CACHE_DIR);
  const files = await readFiles();
  const fi = new ForwardIndex();
  const ii = new InvertedIndex();
  console.log('Generating forward index...');
  await fi.update(files);
  console.log('Generating inverted index...');
  await ii.update(files);
  console.log('Indexes generated...');
})();
