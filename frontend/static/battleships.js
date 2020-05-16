function Battleships(nrOfColumns, nrOfRows, initial, horizontalClues, verticalClues, shipCounts) {
    this.SHIP_PIECE_UNKNOWN = 0,  // TODO: PIECE -> SEGMENT
    this.SHIP_PIECE_EMPTY = 1,
    this.SHIP_PIECE_IMPLIED = 2,
    this.SHIP_PIECE_SUBMARINE = 3,
    this.SHIP_PIECE_END_DOWN = 4,
    this.SHIP_PIECE_END_LEFT = 5,
    this.SHIP_PIECE_END_UP = 6,
    this.SHIP_PIECE_END_RIGHT = 7,
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

Battleships.prototype.getShipCounts = function() {
    return this.shipCounts
}

Battleships.prototype.setShipCounts = function(shipCounts) {
    this.shipCounts = shipCounts
}

Battleships.prototype.getBoolPuzzle = function() {
    var boolPuzzle = this.puzzleGrid.map(row => row.map(x => {
            switch (x) {
                case this.SHIP_PIECE_UNKNOWN: return null;
                case this.SHIP_PIECE_EMPTY: return false;
                case this.SHIP_PIECE_IMPLIED: return true;
                default: return x;
            }
        })),
        force = (i, j, val) => {
            switch (boolPuzzle[i][j]) {
                case null:
                    boolPuzzle[i][j] = val;
                    break;
                case false:
                    if (val !== false)
                        throw `Conflicted boolean value on row: ${i} and col: ${j}`;
                    boolPuzzle[i][j] = val;
                    break;
                case true:
                    if (val !== true)
                        throw `Conflicted boolean value on row: ${i} and col: ${j}`;
                    boolPuzzle[i][j] = val;
                    break;
                default:
                    if (val === false)
                        throw `Conflicted boolean value on row: ${i} and col: ${j}`;
            }
        },
        isInside = (i, j) => (0 <= i && i < this.nrOfRows && 0 <= j && j < this.nrOfColumns);

    boolPuzzle.forEach((row, i) => row.forEach((x, j) => {
        switch (x) {
            case this.SHIP_PIECE_SUBMARINE:
                boolPuzzle[i][j] = true;
                if (isInside(i-1, j)) force(i-1, j, false);
                if (isInside(i+1, j)) force(i+1, j, false);
                if (isInside(i, j-1)) force(i, j-1, false);
                if (isInside(i, j+1)) force(i, j+1, false);
                break;
            case this.SHIP_PIECE_END_DOWN:
                boolPuzzle[i][j] = true;
                if (isInside(i-1, j)) force(i-1, j, true);
                if (isInside(i+1, j)) force(i+1, j, false);
                break;
            case this.SHIP_PIECE_END_LEFT:
                boolPuzzle[i][j] = true;
                if (isInside(i, j-1)) force(i, j-1, false);
                if (isInside(i, j+1)) force(i, j+1, true);
                break;
            case this.SHIP_PIECE_END_UP:
                boolPuzzle[i][j] = true;
                if (isInside(i-1, j)) force(i-1, j, false);
                if (isInside(i+1, j)) force(i+1, j, true);
                break;
            case this.SHIP_PIECE_END_RIGHT:
                boolPuzzle[i][j] = true;
                if (isInside(i, j-1)) force(i, j-1, true);
                if (isInside(i, j+1)) force(i, j+1, false);
                break;
            case this.SHIP_PIECE_MIDSECTION_HORIZONTAL:
                boolPuzzle[i][j] = true;
                if (isInside(i, j-1)) force(i, j-1, true);
                if (isInside(i, j+1)) force(i, j+1, true);
                break;
            case this.SHIP_PIECE_MIDSECTION_VERTICAL:
                boolPuzzle[i][j] = true;
                if (isInside(i-1, j)) force(i-1, j, true);
                if (isInside(i+1, j)) force(i+1, j, true);
                break;
        }
    }));

    return boolPuzzle;
}

function BattleshipsManager(battleships) {
    this.battleships = battleships,
    this.cellWidth = 50,
    this.cellHeight = 50,
    this.horizontalClueDOM = document.getElementById('horizontal-clues'),
    this.verticalClueDOM = document.getElementById('vertical-clues'),
    this.shipsDOM = document.getElementById('ships-list'),
    this.boardDOM = document.getElementById('puzzle-board'),
    this.solveButtonDOM = document.getElementById('solve-button')
}

BattleshipsManager.prototype.initialize = function() {
    this.horizontalClueDOM.innerHTML = '',
    this.battleships.getHorizontalClues().forEach((clue, i, horizontalClues) => {
        var e = document.createElement('input');
        e.id = `row-${i}-clue`,
        e.value = clue,
        e.addEventListener('change', e => horizontalClues[i] = parseInt(e.target.value)),
        this.horizontalClueDOM.appendChild(e)
    }),
    this.verticalClueDOM.innerHTML = '',
    this.battleships.getVerticalClues().forEach((clue, i, verticalClues) => {
        var e = document.createElement('input');
        e.id = `col-${i}-clue`,
        e.value = clue,
        e.addEventListener('change', e => verticalClues[i] = parseInt(e.target.value)),
        this.verticalClueDOM.appendChild(e)
    }),
    this.boardDOM.innerHTML = '',
    this.battleships.getPuzzleGrid().forEach((row, i, puzzleGrid) => row.forEach((segment, j) => {
        var e = document.createElement('div');
        e.id = `cell-${i}-${j}`,
        e.classList.add('puzzle-cell'),
        e.classList.add(`segment-${segment}`),
        e.addEventListener('click', e => {
            var currentSegment = puzzleGrid[i][j],
                nextSegment = (currentSegment + 1) % 10;
            e.target.classList.remove(`segment-${currentSegment}`),
            e.target.classList.add(`segment-${nextSegment}`),
            puzzleGrid[i][j] = nextSegment
        }),
        this.boardDOM.appendChild(e)
    })),
    this.boardDOM.style.gridTemplateColumns = `repeat(${this.battleships.getNrOfColumns()}, ${this.cellWidth}px)`,
    this.boardDOM.style.gridTemplateRows = `repeat(${this.battleships.getNrOfRows()}, ${this.cellHeight}px)`,
    this.shipsDOM.value = this.battleships.getShipCounts().join(' '),
    this.shipsDOM.addEventListener('change', e => this.battleships.setShipCounts(e.target.value.split(' ').map(Number))),
    this.solveButtonDOM.addEventListener('click', () => this.getSolution())
}

BattleshipsManager.prototype.getSolution = function() {
    var puzzleJSON = {
        rows: this.battleships.getNrOfRows(),
        cols: this.battleships.getNrOfColumns(),
        ships: this.battleships.getShipCounts(),
        colClues: this.battleships.getVerticalClues(),
        rowClues: this.battleships.getHorizontalClues(),
        grid: this.battleships.getBoolPuzzle(),
    };
    fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(puzzleJSON),
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        })
}
