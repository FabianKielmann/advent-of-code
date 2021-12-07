const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n\n')

const numberOrder = data[0].split(',').map(num => parseInt(num))
const bingoFields = data.slice(1).map(field => field.replace('  ', ' ').split('\n').map(row => row.trim().replace('  ', ' ').split(' ').filter(el => el !== '').map(num => parseInt(num))))

let winnerBoards = []

// Go through random order numbers
numberOrder.forEach(num => {

  // Go through all boards
  bingoFields.forEach((board, boardIdx) => {

    // Go through all rows of the current board
    board.forEach((row, rowIdx, boardArray) => {

      // Go through all numbers of the current row
      row.forEach((bingoNum, bingoNumIdx, rowArray) => {

        if (winnerBoards.includes(boardIdx)) return

        // If the current number is the same as the number in the current position, mark it X ...
        if (num === bingoNum) {
          rowArray[bingoNumIdx] = 'X'

          // ... and check if we now have a horizontal or vertical bingo.
          if (isVerticalBingo(board) || isHorizontalBingo(rowArray)) {
            winnerBoards.push(boardIdx)

            let boardSum = getBoardSum(boardArray)

            // When executing this nodejs file, the console will show only the bingo board that won last
            console.clear()
            console.log(`Bingo found at board with index ${boardIdx}.`)
            console.log(`Sum is ${boardSum}.`)
            console.log(`Last bingo number was ${bingoNum}.`)
            console.log('=====')
            console.log(`Part 2: The result is \x1b[33m${boardSum * bingoNum}\x1b[0m (${boardSum} * ${bingoNum}).`)
            return
          }
        }
        
      })

    })

  })

})

function isHorizontalBingo(row) {
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 'X') return false
  }

  return true
}

function isVerticalBingo(board) {
  for (let i = 0; i < 5; i++) {
    if (board[0][i] === 'X' &&
        board[1][i] === 'X' &&
        board[2][i] === 'X' &&
        board[3][i] === 'X' &&
        board[4][i] === 'X') {
          return true
    }
  }

  return false
}

function getBoardSum(board) {
  let sum = 0

  board.forEach(row => {
    row.forEach(bingoNum => {
      if (bingoNum !== 'X') sum += bingoNum
    })
  })

  return sum
}