const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')
const inputData = input.split(/\r?\n/).map(el => el.split('').map(el => parseInt(el)))

let data = JSON.parse(JSON.stringify(inputData))

let flashCount = 0

function step() {
  flashCount = 0

  data.forEach((row, rowIdx) => {
    row.forEach((octo, octoIdx) => {
      increase(octoIdx, rowIdx)
    })
  })

  // Genius. Thanks to https://github.com/Fritz179/aoc-2021/blob/master/11/js/main.js#L38.
  for (let x = 0; x < data[0].length; x++) {
    for (let y = 0; y < data.length; y++) {
      if (data[x][y] < 0) {
        data[x][y] = 0
      }
    }
  }

  return flashCount
}

function increase(x, y) {
  if (x < 0 || y < 0 || x > 9 || y > 9) return
  // Increase every octo energy level by 1
  data[y][x] = data[y][x] + 1

  // If it exceeded 9, flash.
  if (data[y][x] > 9) {
    flashCount++
    data[y][x] = -20 // Genius. Thanks to https://github.com/Fritz179/aoc-2021/blob/master/11/js/main.js#L19.

    // Also increase all surroundings
    let surroundings = getSurroundings({ x, y })
    surroundings.forEach(surrounding => {
      increase(surrounding.x, surrounding.y)
    })
  }
}

function getSurroundings(current) {
  const top = { x: current.x, y: current.y + -1 }
  const topLeft = { x: current.x + -1, y: current.y + -1 }
  const topRight = { x: current.x + 1, y: current.y +  -1 }
  const right = { x: current.x + 1, y: current.y }
  const middle = { x: current.x, y: current.y }
  const bottom = { x: current.x, y: current.y + 1 }
  const bottomLeft = { x: current.x + -1, y: current.y + 1 }
  const bottomRight = { x: current.x + 1, y: current.y + 1 }
  const left = { x: current.x + -1, y: current.y }

  let arr = Array(4)

                                                                     arr[0] = { ...middle, value: data[middle.y][middle.x] }
  if (top.y >= 0)                                                    arr[1] = { ...top, value: data[top.y][top.x] }
  if (topLeft.y >= 0 && topLeft.x >= 0)                              arr[2] = { ...topLeft, value: data[topLeft.y][topLeft.x] }
  if (topRight.y >= 0 && topRight.x < data[0].length)                arr[3] = { ...topRight, value: data[topRight.y][topRight.x] }
  if (right.x < data[0].length)                                      arr[4] = { ...right, value: data[right.y][right.x] }
  if (bottom.y < data.length)                                        arr[5] = { ...bottom, value: data[bottom.y][bottom.x] }
  if (bottomLeft.y < data.length && bottomLeft.x >= 0)               arr[6] = { ...bottomLeft, value: data[bottomLeft.y][bottomLeft.x] }
  if (bottomRight.y < data.length && bottomRight.x < data[0].length) arr[7] = { ...bottomRight, value: data[bottomRight.y][bottomRight.x] }
  if (left.x >= 0)                                                   arr[8] = { ...left, value: data[left.y][left.x] }

  return arr
}

// Part 1
let result = 0
for (let i = 0; i < 100; i++) result += step()
console.log(`Part 1: After 100 steps, the flashCount is \x1b[33m${result}\x1b[0m.`)

// Part 2
data = JSON.parse(JSON.stringify(inputData))
let flashingOctoCount = 0
let i = 0

while(flashingOctoCount !== 100) {
  flashingOctoCount = step()
  i++
}

console.log(`Part 2: All octopussies flash after \x1b[33m${i}\x1b[0m steps.`)
