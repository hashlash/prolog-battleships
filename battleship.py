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
