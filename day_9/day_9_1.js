const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n').map(line => line.split('').map(num => parseInt(num)))

let valids = []

data.forEach((row, y) => {
  row.forEach((col, x) => {
    const current = data[y][x]
    const [top, right, bottom, left] = getSurroundings({ x, y })

    const lowerThanCurrent = [top, right, bottom, left].filter(el => el <= current)
    if (lowerThanCurrent.length === 0) valids.push(current)
  })
})

// .map with el + 1 because the risk level is height + 1. Then add all together.
const riskLevelsSum = valids.map(el => el + 1).reduce((prev, next) => next + prev)

console.log(`The risk level sum of all low points is \x1b[33m${riskLevelsSum}\x1b[0m.`)

function getSurroundings(current) {
  const top = { x: current.x + 0, y: current.y + -1 }
  const right = { x: current.x + 1, y: current.y }
  const bottom = { x: current.x, y: current.y + 1 }
  const left = { x: current.x + -1, y: current.y }

  let arr = Array(4)

  if (top.y >= 0)               arr[0] = data[top.y][top.x]
  if (right.x < data[0].length) arr[1] = data[right.y][right.x]
  if (bottom.y < data.length)   arr[2] = data[bottom.y][bottom.x]
  if (left.x >= 0)              arr[3] = data[left.y][left.x]

  return arr
}