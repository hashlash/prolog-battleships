:- use_module(library(clpfd)).

battleship(Ships, Nrow, Ncol, Rows) :-
	same_length(Nrow, Rows), maplist(same_length(Ncol), Rows),
	append(Rows, Vs), Vs ins 0..1,
	transpose(Rows, Cols),
	% row and col ship segment
	maplist(sum_cons, Rows, Nrow),
	maplist(sum_cons, Cols, Ncol),
	% number of ships constraint
	sum(Ships, #=, Nmul), length(Omul, Nmul),
		maplist(=(1), Omul), append(Omul, Ships, Sadv),
	lines(Rows, Crow), lines(Cols, Ccol),
	append(Crow, Ccol, C), permutation(Sadv, C).

sum_cons(L, S) :- sum(L, #=, S).

lines([], []).
lines([H|T], C) :- lines(T, Ct), line(H, Ch), append(Ct, Ch, C).

line([], []).
line([1], [1]).
line([0|T], A) :- line(T, A).
line([1,0|T], [1|B]) :- line(T, B).
line([1,1|T], [A|B]) :- line([1|T], [At|B]), A #= At+1.

problem(1,
        [1,2,3],
        [1,1,2,2],
        [3,0,1,2],
        [[_,_,_,_],
         [_,_,_,_],
         [_,_,_,_],
         [_,_,_,_]]).
