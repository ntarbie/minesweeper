/*
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);
flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board:');
printBoard(playerBoard);
*/
class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    var numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborColumnIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++
        }
      }
    });
    return numberOfBombs
  }

  hasSafeTiles() {
    return this._numberOfBombs !== this._numberOfTiles;
  }
  print() {
    console.log(this._playerBoard.map(row => row.join(" | ")).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];

    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rows = 0; rows < numberOfRows; rows++) {
      let row = [];
      for (let columns = 0; columns < numberOfColumns; columns++) {
        row.push(null);
      };
      board.push(row);
    };

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  };

}

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('GAME OVER : YOU LOST!');
      this._board.print();
    } else if (!this._board.hasSafeTiles) {
      conole.log('Game OVER : YOU WON!');
      this._board.print();
    } else {
      console.log('Current Board:')
      this._board.print();
    }
  }
}
