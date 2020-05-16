from pyswip.prolog import Prolog
from pprint import pprint

prolog = Prolog()
prolog.consult('battleship.pl')


class PrologAny:
    def __repr__(self):
        return '_'

    def __str__(self):
        return '_'


def grid_none_to_prologany(grid):
    return [[PrologAny() if x is None else x for x in l] for l in grid]


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
