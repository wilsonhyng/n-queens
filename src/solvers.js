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
  var solutionCount = recursiveAddRook(nBoard, 0);


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

window.recursiveAddRook = function(board, rowIndex) {
  var row = board.rows()[rowIndex];
  var count = 0;

  for (var col = 0; col < row.length; col++) {
    board.togglePiece(rowIndex, col);
    if (!board.hasColConflictAt(col)) {
      if (rowIndex === (board.get('n') - 1)) {
        count += 1;
        //board.togglePiece(rowIndex, col);
      } else {
        count += recursiveAddRook(board, rowIndex + 1);
      //board.togglePiece(rowIndex, col);
      }
      board.togglePiece(rowIndex, col);
    }

  }
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
