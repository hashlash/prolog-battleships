# prolog-battleships
Battleships Puzzle Implementation using Prolog

Example query:

```prolog
?- problem(1, Ships, Nrow, Ncol, Rows), battleship(Ships, Nrow, Ncol, Rows), maplist(portray_clause, Rows).
```

## How to Run in Localhost

- Clone this repository

`git clone https://github.com/hashlash/prolog-battleships.git`

- Go inside the directory

`cd prolog-battleships`

- Run the command below to start localhost server

`python server.py`

- Open `localhost:8000` with your browser
