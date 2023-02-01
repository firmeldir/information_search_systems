import fs from 'fs';
import { FILES_DIR } from './config';
import { File } from './models/File';

export const readFiles = async (): Promise<File[]> => {
  const fileNames = await fs.promises.readdir(FILES_DIR);
  const files = await Promise.all(
    fileNames.map(fileName => {
      const filePath = `${FILES_DIR}/${fileName}`;
      return fs.promises
        .readFile(filePath, 'utf-8')
        .then(content => new File(fileName, content));
    }),
  );

  return files;
};
