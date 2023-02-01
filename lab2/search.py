from utils import normalize
from common import common


def search(index, query):
    terms_raw = query.split()

    if len(terms_raw) == 0:
        return []

    res = None
    for term_raw in terms_raw:
        term = normalize(term_raw)

        term_files = index[term] if term in index.keys() else []

        if res is None:
            res = term_files
            continue

        res = common(res, term_files)
        if len(res) == 0:
            break

    return res
