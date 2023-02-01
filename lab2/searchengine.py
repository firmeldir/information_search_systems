import os
import sys
from create_index import create_index
from search import search


def search_menu(index, content_to_title):
    while True:
        query = input("Search: ")
        if len(query) == 0:
            break

        results = search(index, query)

        print(f"Results for \"{query}\" :\n")

        if not len(results):
            print("Not found")

        for i in range(len(results)):
            title = content_to_title[results[i]]
            filename = results[i]
            print(f"{filename}: {title}\n")


def main():
    args = sys.argv[1:]

    num_args = len(args)

    directory = args[0]

    if not os.path.exists(directory):
        return

    files = []

    for filename in os.listdir(directory):
        files.append(os.path.join(directory, filename))

    index = {}
    filename_to_title = {}
    create_index(files, index, filename_to_title)

    if num_args == 2 and args[1] == '-s':
        search_menu(index, filename_to_title)
    else:
        print('index: ', index)
        print('\ntitles: ', filename_to_title)


if __name__ == '__main__':
    main()
