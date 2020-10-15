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
/*
input: number
output: number
base case : if n = 0 return 1, if open spaces (not on the same row or column) are equal to 0 return 0
base case: use helperfunction(count) where base case if (n === count) return solutioncount++
*/
// clone current board =
window.countNRooksSolutions = function(n) {
  var board = new Board(new Array(n).fill(0).map(square => new Array(n).fill(0)));
  board.turns = n;
  var solutionCount = countRooksHelper(board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



var countRooksHelper = function(board, startRow = 0, startColumn = 0) {

  // var count = 0;
  var count = 0;
  var length = board.get(0).length;
  if (board.attributes.n === 3) {
    debugger;
  }
  //  for(var i = startRow; i < length; i++) {
  for (var i = startRow; i < length; i++) {
  //       for(var j = startColumn; j < length; j++) {
    for (var j = startColumn; j < length; j++) {
      // check to see if rows and columns are free, if so,  // using hasRowConflictAt[i] && hasColumnConflict[j]:
      board.togglePiece(i, j);
      if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
        //            {
        //              if(n is 1) {
        if (board.turns === 1) {
        //             count++;
          //           }
          count++;
          //           else {
        } else {
          //toggle board[i][j], n--,
          board.turns--;
          var tempCount = 0;
          // check to see if j is length-1, if it is, then i+1,0. otherwise, i, j+1.
          if (j === length - 1 && i === length - 1) {
            board.turns++;
            board.togglePiece(i, j);
            return count;
          } else if (j === length - 1) {
            tempCount = countRooksHelper(board, i + 1, 0);
          } else {
            tempCount = countRooksHelper(board, i, j + 1);
          }
          // if this is the end of the board, return count.
          // count += recursive call.
          // untoggle, n++,
          count += tempCount;
          board.turns++;
        }
      }
      board.togglePiece(i, j);
    }
  }
  // return count;
  return count;
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
