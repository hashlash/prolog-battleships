:- use_module(library(clpfd)).

battleship(Nrow, Ncol, Rows) :-
	same_length(Nrow, Rows), maplist(same_length(Ncol), Rows),
	append(Rows, Vs), Vs ins 0..1,
	transpose(Rows, Cols),
	maplist(sum_list, Rows, Nrow),
	maplist(sum_list, Cols, Ncol).

problem(1, [1,1,2,2], [3,0,1,2], [[0,0,1,0],
                                  [1,0,0,0],
                                  [1,0,0,1],
                                  [1,0,0,1]]).
