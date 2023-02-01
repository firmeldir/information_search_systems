import path from 'path';

export const CACHE_DIR = path.join(__dirname, '..', 'cache');
export const FORWARD_INDEX_FILE = path.join(CACHE_DIR, 'forward_index.json');
export const INVERTED_INDEX_FILE = path.join(CACHE_DIR, 'inverted_index.json');
export const FILES_DIR = path.join(__dirname, '..', 'files');
export const FILES_COUNT = 10000;
export const WORDS_COUNT = 2000;
