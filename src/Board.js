// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // input: number representing row index
    hasRowConflictAt: function (rowIndex) {
      // Get all rows in the board
      var allBoardRows = this.rows();
      //
      var rowCheck = allBoardRows[rowIndex];
      // count the queens
      var count = 0;
      for (var i = 0; i < rowCheck.length; i++) {
        count += rowCheck[i];
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // Get number of rows in the board
      var totalRows = this.rows().length;
      // iterate over totalRows
      for (var i = 0; i < totalRows; i++) {
        // if hasRowConflictAt is true for any row
        if (this.hasRowConflictAt(i) === true) {
          // return true
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // input: number representing column index
    hasColConflictAt: function (colIndex) {
      // Get all board rows using row method
      var allBoardRows = this.rows();
      // Iterate through row and pull values from colIndex in each row
      // output an array of single column values
      var arrayOfColValues = _.pluck(allBoardRows, colIndex);
      //console.log(arrayOfColValues);
      // count the queens
      var count = 0;
      // iterate through array of single column values
      for (var i = 0; i < arrayOfColValues.length; i++) {
        // if element is equal to 1
        count += arrayOfColValues[i];
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      // find board length
      var totalColumns = this.rows().length;
      // iterate over length of board
      for (var i = 0; i < totalColumns; i++) {
        // if any columns hasColConflictAt is equal to true
        if (this.hasColConflictAt(i) === true) {
          // return true
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major

    /*
    Prompt: count number of queens in major diagonal
    IOCE: Input: number Output: boolean CE: n/a
    Strategy:
    count how many queens in that major diagonal.

    get the length of the rows using row method on the board class.

    determine if inputted column index is a negative number. Then we will need to start at the row index associated to the negative column input.
    keep column index at 0.

    if column number is positive, start row at 0 index. With column index as inputted column.

    iterate over start row, whether it is at the 0 index, or starting at a lower row.

     If there is a queen, add to count.

    at row 0 at column 0, is there a queen? if yes, add to count. Otherwise, adjust our indexes so that now we're at row 1 and column 1. check if there's a queen. If there is one, add to count.
    if count is more than 1, return true, otherwise false.

    Visualize:
    Pseudocode:
    verify:
    Code
    */
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {

      // // Count number of rows in current instance of board. Using board row method.
      var rowCount = this.rows().length;
      // create variable row start index with value 0
      var rowStartIndex = 0;
      // create variable column start index and equal to input.
      var columnStartIndex = majorDiagonalColumnIndexAtFirstRow;
      // //if input is negative
      if (columnStartIndex < 0) {
        //   start row index + input * -1
        rowStartIndex += columnStartIndex * -1;
        //   set start column index to 0.
        columnStartIndex = 0;
      }

      // // create count variable
      var count = 0;
      //the while loop for number of rows available.
      //  while(startColumn < row.length )
      while (columnStartIndex < rowCount && rowStartIndex < rowCount) {
        // Check at startRow, startColumn if there is a queen. If there is a queen, add to count. Then change startRow and startColumn by adding +1.
        var startRow = this.rows()[rowStartIndex];
        console.log(startRow);
        if (startRow[columnStartIndex] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
        rowStartIndex++;
        columnStartIndex++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {

      // determine the number of rows.
      var totalRows = this.rows().length;
      // lowest column input is (number of rows - 1) * -1
      var lowestColumn = (totalRows - 1) * -1;
      // highest column input is number of rows.
      var highestColumn = totalRows;
      console.log(highestColumn);
      // then, we can do a forloop where var i is equal to lowest column input while i is less than or equal to highest column input. Increment i by 1.
      for (var i = lowestColumn; i < highestColumn; i++ ) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // For each iteration if hasMajorDiagonalConflictAt(i) , return true.

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    // input: number
    // output: boolean
    // edge: none
    // Strategy:
    /* Check if the input is greater than length of the rows - 1
      if input is greater, adjust the row index  by the input - (row lengths - 1)
        starting column index will be the row length - 1
      Otherwise the starting row index will be 0 be equal to the input
      create count variable
      while indexes we have are in bounds
        if the current element is 1, count++
        increment the row index up and the column index down
      return if count > 1
    */

    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var lastIndex = this.rows().length - 1;
      var row = 0;
      var column = 0;
      // Check if the input is greater than length of the rows - 1
      if (minorDiagonalColumnIndexAtFirstRow > lastIndex) {
        // if input is greater, adjust the row index  by the input - (row length - 1)
        row = minorDiagonalColumnIndexAtFirstRow - lastIndex;
        // starting column index will be the row length - 1
        column = lastIndex;
        // Otherwise the starting row index will be 0, column will be equal to the input
      } else {
        column = minorDiagonalColumnIndexAtFirstRow;
      }
      // create count variable
      var count = 0;
      //while indexs we have are in bounds
      while (this._isInBounds(row, column)) {
      //   if the current element is 1, count++
        if (this.get(row)[column] === 1) {
          count++;
        }
        // increment the row index up and the column index down
        row++;
        column--;

      }
      // return if count > 1
      return count > 1;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var length = this.rows().length;
      var max = length + length - 1;
      for (var i = 0; i < max; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
