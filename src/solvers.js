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


    // togglePiece: function(rowIndex, colIndex) {
    //   this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
    //   this.trigger('change');
    // },

window.findNRooksSolution = function(n) {

  var nBoard = new Board({n: n});
  for (var i = 0; i < n; i++) {
    addRooktoRow(nBoard, i);
  }
  
  var solution = nBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var nBoard = new Board({n: n});
  var solutionCount = recursiveAddPiece(nBoard, 0, function(someBoard, row, column) {
    return someBoard.hasColConflictAt(column);
  });


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.addRooktoRow = function(board, rowIndex) {
  // get a particular row from the board
  var row = board.rows()[rowIndex];
  //for each square in row
  for (var col = 0; col < row.length; col++) {
    //if no column conflicts with rest of board
    board.togglePiece(rowIndex, col);
    if (board.hasColConflictAt(col)) {
      //add a rook at that square
      board.togglePiece(rowIndex, col);
      //break out of the loop and end everything
    } else {
      break;
    }
  }
};

window.recursiveAddPiece = function(board, rowIndex, findConflict) {
  var row = board.rows()[rowIndex];
  var count = 0;

  if (row === undefined) {
    return 1;
  }

  for (var col = 0; col < row.length; col++) {
    board.togglePiece(rowIndex, col);
    if (!findConflict(board, rowIndex, col)) {
      if (rowIndex === (board.get('n') - 1)) {
        count += 1;
        //board.togglePiece(rowIndex, col);
      } else {
        count += recursiveAddPiece(board, rowIndex + 1, findConflict);
      }
    }
    board.togglePiece(rowIndex, col);
  }
  //debugger;
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var nBoard = new Board({n: n});
  var solution = recursiveAddFind(nBoard, 0, function(board, row, col) {
    return board.hasAnyQueenConflictsOn(row, col);
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.recursiveAddFind = function(board, rowIndex, findConflict) {
  var row = board.rows()[rowIndex];

  if (row === undefined) {
    return board.rows();
  }

  for (var col = 0; col < row.length; col++) {
    board.togglePiece(rowIndex, col);
    if (!findConflict(board, rowIndex, col)) {
      if (rowIndex === (board.get('n') - 1)) {
        return board.rows();
        //board.togglePiece(rowIndex, col);
      } else {
        var nextRowResult = recursiveAddFind(board, rowIndex + 1, findConflict);
        if (Array.isArray(nextRowResult)) {
          return nextRowResult;
        }
      }
    }
    board.togglePiece(rowIndex, col);
  }
  return {n: board.get('n')};
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var nBoard = new Board({n: n});
  var solutionCount = recursiveAddPiece(nBoard, 0, function(board, row, col) {
    return board.hasAnyQueenConflictsOn(row, col);
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
