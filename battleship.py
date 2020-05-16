from pyswip.prolog import Prolog
from pprint import pprint


prolog = Prolog()
prolog.consult("battleship.pl")

def solve(Ships, Nrow, Ncol, Rows):
    return prolog.query(
            "problem(1, {}, {}, {}, {}), setof(Rows, battleship({}, {}, {}, {}), List)".format(
                Ships, Nrow, Ncol, Rows,
                Ships, Nrow, Ncol, Rows
            ))


if __name__ == "__main__":
    result = prolog.query(
        "problem(2, Ships, Nrow, Ncol, Rows), \
        setof(Rows, battleship(Ships, Nrow, Ncol, Rows), List)"
    )
    if result:    
        result = next(result)
        for answer in result["List"]:
            pprint(answer)
    else:
        print("No solution")
