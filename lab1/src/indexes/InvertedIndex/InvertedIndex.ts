import { INVERTED_INDEX_FILE } from '../../config';
import { File } from '../../models/File';
import { Index } from '../Index';

export class InvertedIndex extends Index {
  protected indexFilePath: string;

  protected filesToIndex(files: File[]): Record<string, string[]> {
    const indexWithSet = files.reduce((acc, file) => {
      const { name: fileName, content } = file;
      const words = content.split(' ').map(word => word.toLowerCase());
      words.forEach(word => {
        if (acc[word]) {
          acc[word].add(fileName);
        } else {
          acc[word] = new Set([fileName]);
        }
      });
      return acc;
    }, {} as Record<string, Set<string>>);

    return Object.entries(indexWithSet).reduce((acc, [word, fileNames]) => {
      acc[word] = [...fileNames];
      return acc;
    }, {} as Record<string, string[]>);
  }

  constructor() {
    super();
    this.indexFilePath = INVERTED_INDEX_FILE;
  }
}
