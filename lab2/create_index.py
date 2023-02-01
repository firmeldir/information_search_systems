from utils import read_file, normalize


def create_index(filenames, index, filename_to_title):
    for filename in filenames:
        content = read_file(filename)
        filename_to_title[filename] = content.split('\n')[0]
        terms = content.split()
        for term in terms:
            norm_term = normalize(term)
            if norm_term not in index:
                index[norm_term] = []
            if filename not in index[norm_term]:
                index[norm_term].append(filename)

    return 0
