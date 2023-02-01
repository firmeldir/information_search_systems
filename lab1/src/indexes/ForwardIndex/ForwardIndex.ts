import { FORWARD_INDEX_FILE, CACHE_DIR } from './../../config';
import fs from 'fs';
import { File } from '../../models/File';
import { Index } from '../Index';

export class ForwardIndex extends Index {
  protected indexFilePath: string;

  protected filesToIndex(files: File[]): Record<string, string[]> {
    return files.reduce((acc, file) => {
      const { name, content } = file;
      const words = content.split(' ').map(word => word.toLowerCase());
      acc[name.toLowerCase()] = words;
      return acc;
    }, {} as Record<string, string[]>);
  }

  constructor() {
    super();
    this.indexFilePath = FORWARD_INDEX_FILE;
  }
}
