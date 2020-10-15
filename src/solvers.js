/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*
Purpose: find one solution for nRooks. Return solution
input: number
output: matrix
strategy: put rook on a diagonal (nn)
*/

window.findNRooksSolution = function(n) {
  var matrix = new Array(n).fill(0).map(num => new Array(n).fill(0));
  matrix = matrix.map((num, index) => {
    num = num.map((elem, i) => {
      if (index === i) {
        elem = 1;
      }
      return elem;
    });
    return num;
  });
  var solution = new Board(matrix);
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board(new Array(n).fill(0).map(square => new Array(n).fill(0)));
  var countRooks = function(n, row) {
    for (var columns = 0; columns < n; columns++) {
      board.togglePiece(row, columns);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(columns)) {
        board.togglePiece(row, columns);
      } else {
        if (row + 1 === n) {
          board.togglePiece(row, columns);
          solutionCount++;
          return;
        }
        countRooks(n, row + 1);
        board.togglePiece(row, columns);
      }
    }
  };
  countRooks(n, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
