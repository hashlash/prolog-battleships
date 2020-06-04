from pyswip.prolog import Prolog

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
    query = 'Rows={grid}, battleship({ships}, {row_clues}, {col_clues}, Rows)'.format(
        ships=ships,
        row_clues=row_clues,
        col_clues=col_clues,
        grid=grid,
    )
    return prolog.query(query)
