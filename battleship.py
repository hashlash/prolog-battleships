from pyswip.prolog import Prolog
from pprint import pprint


prolog = Prolog()
prolog.consult("battleship.pl")

def solve(Ships, Nrow, Ncol, Rows):
    return list(prolog.query(
            "problem(1, {}, {}, {}, {}), setof(Rows, battleship({}, {}, {}, {}), List)".format(
                Ships, Nrow, Ncol, Rows,
                Ships, Nrow, Ncol, Rows
            )
    ))
    return result[0]


if __name__ == "__main__":
    result = list(prolog.query(
        "problem(1, Ships, Nrow, Ncol, Rows), \
        setof(Rows, battleship(Ships, Nrow, Ncol, Rows), List)"
    ))
    if result:    
        result = result[0]
        for answer in result["List"]:
            pprint(answer)
    else:
        print("No solution")