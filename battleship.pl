:- use_module(library(clpfd)).

battleship(Ships, Nrow, Ncol, Rows) :-
	same_length(Nrow, Rows), maplist(same_length(Ncol), Rows),
	append(Rows, Vs), Vs ins 0..1,
	transpose(Rows, Cols),
	% row and col ship segment
	maplist(sum_cons, Rows, Nrow),
	maplist(sum_cons, Cols, Ncol),
	% number of ships constraint
	sum(Ships, #=, Nmul),
		length(Omul, Nmul), maplist(=(1), Omul),
		append(Omul, Ships, Sadv),
	lines(Rows, Crow), lines(Cols, Ccol),
	append(Crow, Ccol, C), permutation(Sadv, C),
	% no adjacent ship
	same_length(ZeroRow, Cols), maplist(=(0), ZeroRow),
		append([[ZeroRow], Rows, [ZeroRow]], TempRow),
		transpose(TempRow, TempCol),
	same_length(ZeroCol, TempRow), maplist(=(0), ZeroCol),
		append([[ZeroCol], TempCol, [ZeroCol]], ColZ),
		transpose(ColZ, RowZ),
	adjacency(RowZ), adjacency(ColZ).

sum_cons(L, S) :- sum(L, #=, S).

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
                                   [1,1|T2],
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

problem(1,
        [1,2,3],
        [1,1,2,2],
        [3,0,1,2],
        [[_,_,_,_],
         [_,_,_,_],
         [_,_,_,_],
         [_,_,_,_]]).

% more than one solution
problem(2,
        [1,1,1,1],
        [1,1,1,1],
        [1,1,1,1],
        [[_,_,_,_],
         [_,_,_,_],
         [_,_,_,_],
         [_,_,_,_]]).

% no solution
problem(3,
        [1,2,3],
        [1,1,2,2],
        [3,0,1,2],
        [[_,_,0,_],
         [1,_,_,_],
         [_,_,_,_],
         [_,_,_,_]]).

% https://puzzlemadness.co.uk/battleships/small/2020/5/19
problem(4,
        [1, 1, 1, 2, 2, 3],
        [1, 2, 2, 2, 2, 1],
        [0, 4, 0, 4, 0, 2],
        [[_, _, _, _, _, _],
         [_, _, _, 0, _, _],
         [_, _, _, 1, _, 0],
         [_, _, _, 1, 0, 1],
         [_, _, _, _, _, 0],
         [_, _, _, _, _, _]]).
