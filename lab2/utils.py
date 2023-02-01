import string
from nltk.stem import PorterStemmer

ps = PorterStemmer()


def read_file(filename):
    with open(filename, encoding='utf-8') as file:
        return file.read()


def normalize(term):
    return ps.stem(term.strip(string.punctuation).lower())
