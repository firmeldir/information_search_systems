import fs from 'fs';
import { INVERTED_INDEX_FILE } from './../../config';
import { File } from '../../models/File';
import { InvertedIndex } from './InvertedIndex';

const files = [
  new File('file1.txt', 'lorem 1'),
  new File('file2.txt', 'ipsum 2 hello'),
  new File('file3.txt', 'World qwe qwe ipsum'),
  new File('file4.txt', 'Hello linux 2 3'),
  new File('file5.txt', 'Putin huilo lorem'),
];

const indexFileContent = JSON.stringify({
  lorem: ['file1.txt', 'file5.txt'],
  '1': ['file1.txt'],
  ipsum: ['file2.txt', 'file3.txt'],
  '2': ['file2.txt', 'file4.txt'],
  hello: ['file2.txt', 'file4.txt'],
  world: ['file3.txt'],
  qwe: ['file3.txt'],
  linux: ['file4.txt'],
  '3': ['file4.txt'],
  putin: ['file5.txt'],
  huilo: ['file5.txt'],
});

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
    mkdir: () => {},
  },
}));

(fs.promises.readFile as jest.Mock).mockResolvedValue(indexFileContent);

describe('InvertedIndex', () => {
  it('should generate index and write it to file', async () => {
    const index = new InvertedIndex();
    await index.update(files);
    expect(index.isUpdated).toBe(true);
    expect(fs.promises.writeFile).toBeCalledWith(
      INVERTED_INDEX_FILE,
      indexFileContent,
    );
  });

  it('should read index from file if no files supplied', async () => {
    const index = new InvertedIndex();
    await index.update();
    expect(index.isUpdated).toBe(true);
  });

  it('should throw an error if no index is updated', () => {
    const index = new InvertedIndex();
    expect(() => index.search('word')).toThrowError();
  });

  it('should be not updated it no update() method called', async () => {
    const index = new InvertedIndex();
    expect(index.isUpdated).toBe(false);
    await index.update();
    expect(index.isUpdated).toBe(true);
  });

  describe('search', () => {
    const index = new InvertedIndex();

    it('should return files found by word and ignore case', async () => {
      await index.update(files);
      expect(index.search('Lorem')).toEqual(['file1.txt', 'file5.txt']);
      expect(index.search('WorlD')).toEqual(['file3.txt']);
    });

    it('should return null if no word found', async () => {
      await index.update(files);
      expect(index.search('no-such-word')).toBeNull();
    });
  });
});
