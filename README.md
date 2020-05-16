# prolog-battleships
Battleships Puzzle Implementation using Prolog

Example query:

```prolog
?- problem(1, Ships, Nrow, Ncol, Rows), battleship(Ships, Nrow, Ncol, Rows), maplist(portray_clause, Rows).
```
