:- use_module(library(clpfd)).

battleship(Ships, RowCl, ColCl, Rows) :-
	same_length(RowCl, Rows), maplist(same_length(ColCl), Rows),
	append(Rows, Vs), Vs ins 0..1,
	transpose(Rows, Cols),
	% row and col ship segment
	maplist(sum_eq, Rows, RowCl),
	maplist(sum_eq, Cols, ColCl),
	% number of ships constraint
	sum_eq(Ships, SegC),
		length(Ones, SegC), maplist(=(1), Ones),
		append(Ones, Ships, ShipsAug),
	lines(Rows, RowC), lines(Cols, ColC), append(RowC, ColC, Cs),
	msort(Cs, SortedC), msort(ShipsAug, SortedC),
	% no adjacent ship
	same_length(ZeroR, Cols), maplist(=(0), ZeroR),
		append([[ZeroR], Rows, [ZeroR]], TempR),
		transpose(TempR, TempC),
	same_length(ZeroC, TempR), maplist(=(0), ZeroC),
		append([[ZeroC], TempC, [ZeroC]], ColZ),
		transpose(ColZ, RowZ),
	adjacency(RowZ), adjacency(ColZ).

sum_eq(L, S) :- sum(L, #=, S).

lines([], []).
lines([H|T], C) :- lines(T, Ct), line(H, Ch), append(Ct, Ch, C).

line([], []).
line([1], [1]).
line([0|T], A) :- line(T, A).
line([1,0|T], [1|B]) :- line(T, B).
line([1,1|T], [A|B]) :- line([1|T], [At|B]), A #= At+1.

surrounds([_,_],
          [_,_],
          [_,_]).
surrounds([_,H11,H12|T1],
          [_,  0,H22|T2],
          [_,H31,H32|T3]) :- surrounds([H11,H12|T1],
                                       [  0,H22|T2],
                                       [H31,H32|T3]).
surrounds([0,H1,0|T1],
          [0, 1,0|T2],
          [0,H3,0|T3]) :- surrounds([H1,0|T1],
                                    [ 1,0|T2],
                                    [H3,0|T3]).
surrounds([0,0,0|T1],
          [0,1,1|T2],
          [0,0,0|T3]) :- surrounds([0,0|T1],
                                   [1,1|T2],
                                   [0,0|T3]).
surrounds([0,0,0|T1],
          [1,1,0|T2],
          [0,0,0|T3]) :- surrounds([0,0|T1],
                                   [1,0|T2],
                                   [0,0|T3]).
surrounds([0,0,0|T1],
          [1,1,1|T2],
          [0,0,0|T3]) :- surrounds([0,0|T1],
                                   [1,1|T2],
                                   [0,0|T3]).

adjacency([_,_]).
adjacency([As,Bs,Cs|T]) :-
	surrounds(As, Bs, Cs),
	adjacency([Bs,Cs|T]).
