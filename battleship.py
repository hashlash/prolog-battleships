from pyswip.prolog import Prolog
from pprint import pprint

prolog = Prolog()
prolog.consult('battleship.pl')


def solve(ships, row_clues, col_clues, grid):
    query = f'setof(Rows, battleship({ships}, {row_clues}, {col_clues}, {grid}), List)'
    return prolog.query(query)


if __name__ == '__main__':
    result = prolog.query(
        'problem(2, Ships, Nrow, Ncol, Rows), '
        'setof(Rows, battleship(Ships, Nrow, Ncol, Rows), List)'
    )
    if result:
        result = next(result)
        for answer in result['List']:
            pprint(answer)
    else:
        print('No solution')
