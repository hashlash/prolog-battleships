function Battleships(nrOfColumns, nrOfRows, initial, horizontalClues, verticalClues, shipCounts) {
    this.SHIP_PIECE_UNKNOWN = 0,  // TODO: PIECE -> SEGMENT
    this.SHIP_PIECE_EMPTY = 1,
    this.SHIP_PIECE_IMPLIED = 2,
    this.SHIP_PIECE_SUBMARINE = 3,
    this.SHIP_PIECE_END_UP = 4,
    this.SHIP_PIECE_END_RIGHT = 5,
    this.SHIP_PIECE_END_DOWN = 6,
    this.SHIP_PIECE_END_LEFT = 7,
    this.SHIP_PIECE_MIDSECTION_HORIZONTAL = 8,
    this.SHIP_PIECE_MIDSECTION_VERTICAL = 9,
    this.nrOfColumns = nrOfColumns,
    this.nrOfRows = nrOfRows,
    this.horizontalClues = horizontalClues.slice(0),
    this.verticalClues = verticalClues.slice(0),
    this.shipCounts = shipCounts.slice(0),
    this.puzzleGrid = Array(nrOfRows).fill(0).map((_, i) => initial.slice(i * nrOfColumns, (i + 1) * nrOfColumns));
}

Battleships.prototype.getNrOfColumns = function() {
    return this.nrOfColumns
}

Battleships.prototype.getNrOfRows = function() {
    return this.nrOfRows
}

Battleships.prototype.getPuzzleGrid = function() {
    return this.puzzleGrid
}

Battleships.prototype.getHorizontalClues = function() {
    return this.horizontalClues
}

Battleships.prototype.getVerticalClues = function() {
    return this.verticalClues
}

function BattleshipsManager(battleships) {
    this.battleships = battleships,
    this.cellWidth = 50,
    this.cellHeight = 50,
    this.horizontalClueDOM = document.getElementById('horizontal-clues'),
    this.verticalClueDOM = document.getElementById('vertical-clues'),
    this.boardDOM = document.getElementById('puzzle-board')
}

BattleshipsManager.prototype.initialize = function() {
    this.battleships.getHorizontalClues().forEach(clue => {
        var li = document.createElement('li');
        li.innerHTML = clue,
        this.horizontalClueDOM.appendChild(li)
    }),
    this.battleships.getVerticalClues().forEach(clue => {
        var li = document.createElement('li');
        li.innerHTML = clue,
        this.verticalClueDOM.appendChild(li)
    }),
    this.battleships.getPuzzleGrid().forEach((row, i) => row.forEach((segment, j) => {
        var e = document.createElement('div');
        e.classList.add('puzzle-cell'),
        e.classList.add(`segment-${segment}`),
        e.classList.add(`cell-${i}-${j}`),
        this.boardDOM.appendChild(e)
    })),
    this.boardDOM.style.gridTemplateColumns = `repeat(${this.battleships.getNrOfColumns()}, ${this.cellWidth}px)`,
    this.boardDOM.style.gridTemplateRows = `repeat(${this.battleships.getNrOfRows()}, ${this.cellHeight}px)`
}
