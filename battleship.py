from pyswip.prolog import Prolog
from pprint import pprint


prolog = Prolog()
prolog.consult("battleship.pl")
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