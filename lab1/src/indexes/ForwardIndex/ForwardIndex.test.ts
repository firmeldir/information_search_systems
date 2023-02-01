import fs from 'fs';
import { FORWARD_INDEX_FILE } from './../../config';
import { File } from '../../models/File';
import { ForwardIndex } from './ForwardIndex';

const files = [
  new File('file1.txt', 'lorem 1'),
  new File('file2.txt', 'ipsum 2'),
  new File('file3.txt', 'World qwe'),
  new File('file4.txt', 'Hello linux'),
  new File('file5.txt', 'Putin huilo'),
];

const indexFileContent = JSON.stringify({
  'file1.txt': ['lorem', '1'],
  'file2.txt': ['ipsum', '2'],
  'file3.txt': ['world', 'qwe'],
  'file4.txt': ['hello', 'linux'],
  'file5.txt': ['putin', 'huilo'],
});

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
    mkdir: () => {},
  },
}));

(fs.promises.readFile as jest.Mock).mockResolvedValue(indexFileContent);

describe('ForwardIndex', () => {
  it('should generate index and write it to file', async () => {
    const index = new ForwardIndex();
    await index.update(files);
    expect(index.isUpdated).toBe(true);
    expect(fs.promises.writeFile).toBeCalledWith(
      FORWARD_INDEX_FILE,
      indexFileContent,
    );
    expect(index.search('file1.txt')).toEqual(['lorem', '1']);
  });

  it('should read index from file if no files supplied', async () => {
    const index = new ForwardIndex();
    await index.update();
    expect(index.isUpdated).toBe(true);
  });

  it('should throw an error if no index is updated', () => {
    const index = new ForwardIndex();
    expect(() => index.search('file1.txt')).toThrowError();
  });

  it('should be not updated it no update() method called', async () => {
    const index = new ForwardIndex();
    expect(index.isUpdated).toBe(false);
    await index.update();
    expect(index.isUpdated).toBe(true);
  });

  describe('search', () => {
    const index = new ForwardIndex();

    it('should return words found by filename and ignore case', async () => {
      await index.update(files);
      expect(index.search('File2.txt')).toEqual(['ipsum', '2']);
      expect(index.search('file3.txt')).toEqual(['world', 'qwe']);
    });

    it('should return null if no file found', async () => {
      await index.update(files);
      expect(index.search('no-such-file.txt')).toBeNull();
    });
  });
});
